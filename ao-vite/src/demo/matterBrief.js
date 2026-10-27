import { currentMatter, legalContexts, matterBriefRevisions } from "./litigation.js";

// Fictional firm identity for illustrating a firm's own work product template.
// No real firm's letterhead or endorsement is represented.
export const firmTemplate = {
  firm: "Whitfield Hale LLP",
  practice: "Litigation Practice",
  name: "Litigation Matter Brief",
  documentTitle: "Northstar Foods Matter Assessment",
  subtitle: "Records and discovery",
  downloadPath: "/demo/northstar-matter-assessment.docx",
  fileName: "Northstar Foods — Matter Assessment and Evidence Map.docx",
};

export function buildMatterBrief(revised = true) {
  const version = matterBriefRevisions[revised ? 1 : 0];
  return {
    ...firmTemplate,
    matter: currentMatter.number,
    client: currentMatter.client,
    author: currentMatter.associate,
    reviewer: currentMatter.reviewer,
    date: revised ? "October 23, 2026" : "October 21, 2026",
    revision: version.revision,
    status: "Draft for partner review",
    introduction: revised
      ? "I recommend checking the former facilities manager’s archive and establishing who controls the missing reports before recommending the scope of a motion to compel production. The client’s new email changes the collection question; it does not resolve records control."
      : "The current record does not establish who controls the missing inspection reports. I will map the missing material to the disputed issues and identify the custodian evidence needed before recommending a motion’s scope.",
    sections: [
      { title: "Client instructions", body: currentMatter.instruction },
      { title: "Current record", body: currentMatter.established },
      { title: revised ? "Earlier assumption retained" : "Working assumption", body: currentMatter.originalAssumption },
      ...(revised ? [{ title: "New client information", body: currentMatter.newInformation }] : []),
      { title: "Relevant firm review", body: "Sofia’s shared excerpt from my Harbor draft asks me to identify the custodian and connect each request to a disputed issue and supporting exhibit. I am using that excerpt and the published practice note for this assignment; the excerpt does not provide access to Harbor’s full file." },
    ],
    evidence: [
      { question: "Who controls the reports?", record: revised ? currentMatter.newInformation : currentMatter.originalAssumption, action: revised ? "Check the former manager’s archive and record the evidence of who controls each missing report." : "Identify the records contact and establish control rather than relying on the contractor’s role.", sourceIds: revised ? ["NS-CHRONOLOGY", "NS-EMAIL-22"] : ["NS-CHRONOLOGY"] },
      { question: "What would each request establish?", record: "The agreement, inspection chronology and photographs are available. They do not by themselves establish responsibility for the alleged defects.", action: "Map each proposed request to a disputed issue and supporting material. Identify gaps for Sofia’s review.", sourceIds: ["NS-CHRONOLOGY", "PRACTICE-07"] },
      { question: "How far should collection extend?", record: "The client requested a targeted records approach that limits disruption to operations.", action: "Keep the proposed collection within that instruction. Refer any proposed expansion to the partner before it proceeds.", sourceIds: ["NS-INSTRUCTIONS", "NS-ASSIGNMENT"] },
    ],
    review: revised ? {
      title: "Response to partner review",
      body: "I have kept the earlier custodian assumption visible, added the October 22 email and separated its contents from the proposed response. The evidence map now identifies the archive check as work for review, rather than treating records control as established.",
      sourceIds: ["NS-REVIEW", "NS-EMAIL-22"],
    } : { title: "Questions for partner review", body: currentMatter.questions.join(" "), sourceIds: ["NS-ASSIGNMENT", "NS-CHRONOLOGY"] },
    decision: currentMatter.pending,
    revisionNote: revised ? "Revision 2 retains the earlier account, adds the client email and records the response to Sofia’s feedback. Prepared for review; no filing approval is recorded." : "Revision 1 records the current understanding and open questions for Sofia’s review.",
    sources: version.sourceIds.map(id => ({ id, title: legalContexts[id].title, date: legalContexts[id].date, author: legalContexts[id].author, access: legalContexts[id].access.kind })),
    footer: "Fictional firm and matter · Internal draft for partner review",
  };
}
