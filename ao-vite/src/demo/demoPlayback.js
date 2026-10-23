export const commonTiming = { promptEnd: 1250, answerAt: 1500, artifactAt: 2700 };
export const planTiming = { reviewed: 10300, approved: 15200, projectCreated: 16400, workspaceCreated: 17600, verified: 19100 };
export const deliveryTiming = { draftReady: 7700, sentForReview: 10800, feedbackReceived: 13200, revising: 16200, revised: 17400, approved: 19000, exportStarted: 22000, exportReady: 23000 };
export const playbackRate = .8;
export const loopHold = 10000;

export function loopFrameAt(clock, duration) {
  const period = duration / playbackRate + loopHold;
  return { elapsed: Math.min((clock % period) * playbackRate, duration), cycle: Math.floor(clock / period) };
}

export function progressAt(elapsed, start, duration = 500) {
  return Math.min(1, Math.max(0, (elapsed - start) / duration));
}

export function textAt(text, elapsed, start, duration = 500) {
  return text.slice(0, Math.floor(progressAt(elapsed, start, duration) * text.length));
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
