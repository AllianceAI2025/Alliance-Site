import { currentMatter, legalContexts, matterBriefRevisions } from "./litigation.js";

// Shared content for the in-chat letterhead and internal Word reference.
export const firmTemplate = {
  firm: "Whitfield Hale LLP", practice: "Litigation Practice",
  name: "Litigation Matter Brief", documentTitle: "Initial matter assessment",
  subtitle: "Northstar Foods · Distribution-center water intrusion",
  downloadPath: "/demo/northstar-matter-assessment.docx",
  fileName: "Northstar Foods — Matter Assessment and Evidence Map.docx",
};
export function buildMatterBrief(revised = true) {
  const version = matterBriefRevisions[revised ? 1 : 0];
  return {
    ...firmTemplate, matter: currentMatter.number, client: currentMatter.client,
    author: currentMatter.lead, recipient: currentMatter.recipient, reviewer: currentMatter.lead,
    date: revised ? "October 23, 2026" : "October 21, 2026", revision: version.revision, status: "For lead attorney review",
    introduction: revised
      ? "Verify the earlier repair history before settling the litigation approach. The newly supplied email and log challenge the account that the May 2023 patch resolved the problem. They do not establish whether the later leaks share a cause or resolve a timing defense."
      : "Investigate responsibility for the recurring leakage and preserve the repair chronology. The present account suggests an earlier patch followed by a later recurrence; whether these concern the same defect remains unverified. A focused investigation should precede a motion recommendation.",
    sections: [
      { title: "Client objective", body: "Develop a recovery strategy without disrupting distribution operations. Northstar authorized an assessment of the evidence and options before a broader litigation commitment." },
      { title: "Responsibility and evidence", body: "The agreement and photographs identify the project and reported conditions, not their cause. Compare roof and facade interfaces, contractor scope and operating conditions with the engineer before attributing all moisture to one defect." },
      { title: revised ? "Repair history · revised" : "Repair history · initial view", body: revised ? "The November 2023 email describes renewed leakage after the May patch. Its maintenance attachment supports investigation of the earlier period. Obtain originals and confirm locations, observations and work performed; the client’s initial chronology is incomplete." : "A May 2023 invoice records a patch near loading bay 4. The client chronology reports no further leak there until September 2026. Confirm this against original records and witness evidence before relying on a resolved repair." },
      { title: "Firm experience applied", body: "Harbor’s causation analysis and reviewed closeout caution against equating a completed patch with a resolved defect. Briar Glen shows why an earlier complaint must be investigated before carrying a chronology into the legal assessment. Neither outcome determines Northstar’s position." },
    ],
    evidence: [
      { question: "Repair and recurrence", record: revised ? "New: a November 2023 email reports post-patch leakage; its maintenance attachment records repeat visits." : "The chronology and patch invoice are available. The absence of further leakage has not been verified.", action: revised ? "First: preserve originals, interview the facilities witness and reconcile the 2023 chronology." : "Obtain repair records and confirm the chronology.", sourceIds: revised ? ["NS-CHRONOLOGY", "NS-EMAIL-22", "NS-LOG-22"] : ["NS-CHRONOLOGY", "NS-CONTRACT"] },
      { question: "Cause and responsibility", record: "Photographs show reported water intrusion; they do not allocate cause between trades or operating conditions.", action: "Have the engineer compare locations, mechanisms and repairs before defining the responsibility case.", sourceIds: ["NS-CHRONOLOGY", "HARBOR-SHARED-CLOSE"] },
      { question: "Timing and production", record: revised ? "The newly documented recurrence may affect the timing analysis. Records control is unverified." : "Timing depends on the verified history. The holder and completeness of the reports are unconfirmed.", action: "Review applicable authorities against verified facts. Define a targeted request after identifying its purpose and records holder.", sourceIds: revised ? ["NS-EMAIL-22", "BRIAR-SHARED-CLOSE", "PRACTICE-07"] : ["NS-CHRONOLOGY", "PRACTICE-07"] },
    ],
    review: revised ? {
      title: "Why the recommendation changed",
      body: "Revision 1 retained a provisional resolved-repair account. The forwarded email and log challenge it. Margaret directed chronology and engineering comparison to take priority over a production motion. The earlier view remains in revision 1; the effect on the legal position awaits review.",
      sourceIds: ["NS-EMAIL-22", "NS-LOG-22", "NS-REVISION-2"],
    } : { title: "Questions before proceeding", body: currentMatter.questions.join(" "), sourceIds: ["NS-CHRONOLOGY", "NS-ASSIGNMENT"] },
    decision: currentMatter.pending,
    revisionNote: revised ? "Revision 2 · Earlier assessment retained. New evidence and Margaret’s instruction linked to the changed recommendation." : "Revision 1 · Initial account and open questions retained with the sources available on October 21.",
    sources: version.sourceIds.map(id => ({ id, title: legalContexts[id].title, date: legalContexts[id].date, author: legalContexts[id].author, access: legalContexts[id].access.kind })),
    footer: "Fictional firm and matter · For attorney review",
  };
}
