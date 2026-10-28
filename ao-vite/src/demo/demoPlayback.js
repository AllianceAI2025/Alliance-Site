export const commonTiming = { promptEnd: 1250, answerAt: 1500, artifactAt: 2700 };
export const scopeTiming = { precedentAt: 3500, harborAt: 3800, meridianAt: 7100, historyFinished: 10700, commandAt: 11600, applyAt: 13800, responding: 14000, draftAt: 15800, workstreamsAt: 16400, finished: 19000, staffingTyping: 20200, staffingAsked: 22600, staffingAnswer: 22800, staffingAt: 25000, candidatesAt: 25300, availabilityAt: 28500, staffingFinished: 29200 };
// The plan view summarizes workstreams and gates; every deliverable is still
// written to the PSA and verified in the readback.
export const planTiming = { workstreamsAt: 9700, billingTermsAt: 12400, reviewed: 13600, commandAt: 16100, approved: 18600, responding: 18800, submissionAt: 20600, projectCreated: 21600, resourcesWrittenAt: 22400, deliverablesWrittenAt: 23100, milestonesWrittenAt: 25100, billingWrittenAt: 25400, taskDetailsAt: 26500, workspaceCreated: 27700, verified: 29100 };
export const deliveryTiming = {
  assignmentAt: 3650, assignmentReady: 6000, methodTyping: 6500, methodAsked: 8500, methodAnswer: 8700,
  draftTyping: 12500, draftAsked: 14700, draftAnswer: 14900, draftAt: 16300,
  purposeAt: 16700, evidenceAt: 17800, initialConclusionAt: 20200, guidanceAt: 20700, draftReady: 21300,
  sendTyping: 21800, sentForReview: 24400, sendAnswer: 24600, reviewArtifactAt: 26100, feedbackReceived: 26800,
  reviseTyping: 27600, revising: 29800, reviseAnswer: 30000, revisionArtifactAt: 31350, revisionContent: 31400,
  conclusionContent: 31700, revised: 33200, approved: 34700, exportTyping: 35600,
  exportStarted: 37600, exportAnswer: 37800, exportArtifactAt: 39100,
  exportPageOne: 39300, exportFindingsAt: 39900, exportActionsAt: 40800,
  exportReviewAt: 41600, exportSourcesAt: 42100, exportReady: 42500,
};
export const playbackRate = .8;

// Measure against the space available to watch, since a demo can be taller
// than the viewport. Separate entry/exit points avoid restarts at a scroll edge.
export function demoVisibleAt(wasVisible, { visibleHeight, windowHeight, viewportHeight }) {
  const availableHeight = Math.min(windowHeight, viewportHeight);
  if (availableHeight <= 0) return false;
  return visibleHeight / availableHeight >= (wasVisible ? .15 : .55);
}

// A section can be in view while its active writing and composer are still below
// the fold. Pause the clock in that case without ending the viewing session.
export function demoPlaybackReadyAt(wasReady, { top, bottom, viewportTop = 0, viewportHeight }) {
  if (bottom <= top || viewportHeight <= 0) return false;
  const margin = wasReady ? 4 : 12;
  return top >= viewportTop + margin && bottom <= viewportTop + viewportHeight - margin;
}

export function playbackFrameAt(clock, duration) {
  const elapsed = Math.min(Math.max(0, clock * playbackRate), duration);
  return { elapsed, complete: elapsed === duration };
}

export function progressAt(elapsed, start, duration = 500) {
  return Math.min(1, Math.max(0, (elapsed - start) / duration));
}

export function textAt(text, elapsed, start, duration = 500) {
  return text.slice(0, Math.floor(progressAt(elapsed, start, duration) * text.length));
}

export function precedentBuildAt(start) {
  return { source: start, conditions: start + 100, finding: start + 300, outcome: start + 600, people: start + 900, submitted: start + 1400, reviewed: start + 1900, application: start + 2400 };
}

// Append exchanges in time order. Completed artifacts keep the version shown
// with their original response; later instructions add their own result below.
export function conversationAt(story, elapsed) {
  // The opening question is already in the thread when the window enters view.
  // Responses, artifacts and subsequent typed requests still follow their clocks.
  const initialExchange = { key: 0, prompt: story.prompt, answer: story.answer, sentAt: 0, answerAt: commonTiming.answerAt, answerDuration: story.answerDuration || 1100, artifact: story.artifact, artifactAt: story.artifactAt || commonTiming.artifactAt, artifactUntil: story.artifactUntil };
  const exchanges = [initialExchange, ...(story.commands || []).map(command => ({ ...command, key: command.sentAt })), ...(story.events || []).map(event => ({ ...event, key: event.id }))]
    .filter(exchange => elapsed >= exchange.sentAt)
    .sort((a, b) => a.sentAt - b.sentAt)
    .map(exchange => ({ ...exchange, artifactElapsed: Math.min(elapsed, exchange.artifactUntil ?? elapsed) }));
  const current = exchanges.at(-1) || initialExchange;
  const typing = (story.commands || []).find(command => elapsed >= command.typingAt && elapsed < command.sentAt);
  return {
    ...current,
    exchanges,
    typing: Boolean(typing),
    composer: typing ? textAt(typing.prompt, elapsed, typing.typingAt, typing.sentAt - typing.typingAt) : "Ask AllianceOne…",
  };
}

// Coordinates are relative to the feed's scrollable content, never the page.
export function followScrollTop({ scrollTop, viewportHeight, targetTop, targetBottom, maxScrollTop, padding = 32, complete = false, newTarget = false }) {
  if (complete) return Math.max(0, maxScrollTop);
  // Follow the growing end of the active text, including blocks taller than the
  // pane. Reframe upward only when a newly active block is entirely above view
  // (for example the second column of the precedent card), never as text grows.
  const tail = targetBottom - viewportHeight + padding;
  const next = newTarget && targetBottom < scrollTop + padding
    ? Math.max(targetTop - padding, tail)
    : Math.max(scrollTop, tail);
  return Math.max(0, Math.min(maxScrollTop, next));
}

export function advanceScrollTop(current, target, deltaMs) {
  const distance = target - current;
  if (Math.abs(distance) <= 1) return target;
  const fraction = 1 - Math.exp(-Math.min(64, Math.max(1, deltaMs)) / 80);
  // At least one pixel avoids a rounded scrollTop stalling just short of goal.
  const step = Math.min(Math.abs(distance), Math.max(1, Math.abs(distance) * fraction));
  return current + Math.sign(distance) * step;
}

export function planExecutionAt(elapsed) {
  const approved = elapsed >= planTiming.approved;
  return {
    reviewed: elapsed >= planTiming.reviewed,
    approved,
    projectCreated: approved && elapsed >= planTiming.projectCreated,
    workspaceCreated: approved && elapsed >= planTiming.workspaceCreated,
    readbackReady: approved && elapsed >= planTiming.verified,
  };
}

export function compareAssignment(expected, received) {
  return ["owner", "reviewer", "effort", "due", "baseline"].filter(key => expected[key] !== received[key]);
}

// Read back every part of the commitment, rather than checking a sample task.
export function comparePlan(expected, received) {
  const mismatches = [];
  for (const key of Object.keys(expected.project)) {
    if (expected.project[key] !== received.project?.[key]) mismatches.push(`project: ${key}`);
  }
  const collections = {
    resources: { key: "name", fields: ["name", "role", "start", "end", "capacity", "hours"] },
    workstreams: { key: "id", fields: ["id", "name", "weeks"] },
    deliverables: { key: "id", fields: ["id", "stream", "title", "owner", "reviewer", "start", "due", "dependsOn", "acceptance", "effort"] },
    milestones: { key: "id", fields: ["id", "title", "due", "reviewer", "requires"] },
    billingSchedule: { key: "id", fields: ["id", "title", "percent", "date", "gate"] },
  };
  for (const [name, { key, fields }] of Object.entries(collections)) {
    const actual = received[name] || [];
    if (actual.length !== expected[name].length || new Set(actual.map(item => item[key])).size !== actual.length) mismatches.push(`${name}: record count`);
    for (const item of expected[name]) {
      const record = actual.find(candidate => candidate[key] === item[key]);
      if (!record || fields.some(field => JSON.stringify(item[field]) !== JSON.stringify(record[field]))) mismatches.push(`${name}: ${item[key]}`);
    }
  }
  return mismatches;
}

export function deliveryStateAt(elapsed) {
  const sentForReview = elapsed >= deliveryTiming.sentForReview;
  const feedbackReceived = sentForReview && elapsed >= deliveryTiming.feedbackReceived;
  const revising = feedbackReceived && elapsed >= deliveryTiming.revising;
  const revised = revising && elapsed >= deliveryTiming.revised;
  const approved = revised && elapsed >= deliveryTiming.approved;
  const exportReady = approved && elapsed >= deliveryTiming.exportReady;
  return { draftReady: elapsed >= deliveryTiming.draftReady, sentForReview, feedbackReceived, revising, revised, approved, exporting: approved && elapsed >= deliveryTiming.exportStarted && !exportReady, exportReady };
}

export function activityAt(story, elapsed) {
  return [...story.activity].reverse().find(([at]) => elapsed >= at)?.[1] || story.activity[0][1];
}
