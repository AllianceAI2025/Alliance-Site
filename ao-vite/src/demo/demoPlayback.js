export const commonTiming = { promptEnd: 1250, answerAt: 1500, artifactAt: 2700 };
export const scopeTiming = { precedentAt: 3500, harborAt: 3800, meridianAt: 7100, historyFinished: 10700, commandAt: 11600, applyAt: 13800, responding: 14000, draftAt: 15800, workstreamsAt: 16400, finished: 19000, staffingTyping: 20200, staffingAsked: 22600, staffingAnswer: 22800, staffingAt: 25000, candidatesAt: 25300, availabilityAt: 28500, staffingFinished: 29200 };
export const planTiming = { deliverablesAt: 9700, milestonesAt: 14000, reviewed: 15500, commandAt: 18000, approved: 20500, responding: 20700, submissionAt: 22500, projectCreated: 23500, resourcesWrittenAt: 24300, deliverablesWrittenAt: 27500, milestonesWrittenAt: 32000, workspaceCreated: 34300, verified: 36000 };
export const deliveryTiming = { draftReady: 7700, sendTyping: 8200, sentForReview: 10800, sendAnswer: 11000, feedbackReceived: 13200, reviseTyping: 14000, revising: 16200, reviseAnswer: 16400, revisionContent: 17800, conclusionContent: 19300, revised: 20000, approved: 22000, exportTyping: 23000, exportStarted: 25500, exportAnswer: 25700, exportReady: 27500 };
export const playbackRate = .8;

// Measure against the space available to watch, since a demo can be taller
// than the viewport. Separate entry/exit points avoid restarts at a scroll edge.
export function demoVisibleAt(wasVisible, { visibleHeight, windowHeight, viewportHeight }) {
  const availableHeight = Math.min(windowHeight, viewportHeight);
  if (availableHeight <= 0) return false;
  return visibleHeight / availableHeight >= (wasVisible ? .15 : .55);
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
  const initialExchange = { key: 0, prompt: story.prompt, answer: story.answer, sentAt: commonTiming.promptEnd, answerAt: commonTiming.answerAt, answerDuration: story.answerDuration || 1100, artifact: story.artifact, artifactAt: story.artifactAt || commonTiming.artifactAt, artifactUntil: story.artifactUntil };
  const exchanges = [initialExchange, ...(story.commands || []).map(command => ({ ...command, key: command.sentAt }))]
    .filter(exchange => elapsed >= exchange.sentAt)
    .map(exchange => ({ ...exchange, artifactElapsed: Math.min(elapsed, exchange.artifactUntil ?? elapsed) }));
  const current = exchanges.at(-1) || initialExchange;
  const typing = (story.commands || []).find(command => elapsed >= command.typingAt && elapsed < command.sentAt);
  const initial = elapsed < commonTiming.promptEnd;
  return {
    ...current,
    exchanges,
    typing: initial || Boolean(typing),
    composer: initial ? textAt(story.prompt, elapsed, 0, commonTiming.promptEnd)
      : typing ? textAt(typing.prompt, elapsed, typing.typingAt, typing.sentAt - typing.typingAt) : "Ask AllianceOne…",
  };
}

// Coordinates are relative to the feed's scrollable content, never the page.
export function followScrollTop({ scrollTop, viewportHeight, targetTop, targetBottom, maxScrollTop, padding = 20, complete = false }) {
  if (complete) return Math.max(0, maxScrollTop);
  let next = scrollTop;
  if (targetTop < scrollTop + padding || targetBottom - targetTop > viewportHeight - padding * 2) next = targetTop - padding;
  else if (targetBottom > scrollTop + viewportHeight - padding) next = targetBottom - viewportHeight + padding;
  return Math.max(0, Math.min(maxScrollTop, next));
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
