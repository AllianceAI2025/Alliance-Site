"""Build the demo's client-facing Word export from the same content as its preview."""
import json
from datetime import datetime, timezone
from pathlib import Path

from docx import Document
from docx.enum.table import WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / "src/demo/assessment.json").read_text(encoding="utf-8"))
OUTPUT = ROOT / "public" / DATA["downloadPath"].lstrip("/")


def paragraph(doc, text, style=None):
    return doc.add_paragraph(text, style)


def shade(cell, fill):
    node = OxmlElement("w:shd")
    node.set(qn("w:fill"), fill)
    cell._tc.get_or_add_tcPr().append(node)


def build():
    doc = Document()
    section = doc.sections[0]
    section.page_width, section.page_height = Inches(8.5), Inches(11)
    section.top_margin, section.bottom_margin = Inches(.85), Inches(.7)
    section.left_margin = section.right_margin = Inches(.75)
    section.header_distance = Inches(.3)
    section.footer_distance = Inches(.3)
    for name in ["Normal", "Title", "Subtitle", "Heading 1", "Heading 2"]:
        style = doc.styles[name]
        style.font.name = "Calibri"
        style.font.color.rgb = RGBColor(0, 0, 0)
    normal = doc.styles["Normal"]
    normal.font.size = Pt(11)
    normal.paragraph_format.line_spacing = 1.14
    normal.paragraph_format.space_after = Pt(8)
    doc.styles["Title"].font.size = Pt(30)
    doc.styles["Title"].paragraph_format.space_after = Pt(9)
    for name in ["Heading 1", "Heading 2"]:
        doc.styles[name].font.size = Pt(15 if name == "Heading 1" else 12)
        doc.styles[name].paragraph_format.space_before = Pt(16)
        doc.styles[name].paragraph_format.space_after = Pt(7)
    header = section.header.paragraphs[0]
    header.paragraph_format.space_after = Pt(0)
    run = header.add_run()
    run.add_picture(str(ROOT / "public/brand/asg/alliance-systems-group-mark-refined.png"), width=Inches(.3))
    header.add_run("  ALLIANCE SYSTEMS GROUP").font.size = Pt(9)
    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    footer.add_run("Northstar Foods  |  Assessment  |  ").font.size = Pt(8)
    field = OxmlElement("w:fldSimple")
    field.set(qn("w:instr"), "PAGE")
    footer._p.append(field)

    paragraph(doc, DATA["title"], "Title")
    paragraph(doc, DATA["client"], "Subtitle")
    p = paragraph(doc, f"{DATA['author']}  |  Reviewed by {DATA['reviewer']}\n{DATA['date']}  |  Approved revision {DATA['revision']}  |  Template {DATA['template']} v{DATA['templateVersion']}")
    for run in p.runs:
        run.font.size = Pt(9)
        run.font.color.rgb = RGBColor.from_string("53616A")
    paragraph(doc, DATA["conclusion"])
    doc.add_heading("Purpose and assessment basis", 1)
    paragraph(doc, DATA["purpose"])
    doc.add_heading("Evidence and decision implications", 1)
    table = doc.add_table(rows=1, cols=3)
    table.autofit = False
    widths = [1.0, 2.0, 4.0]
    for cell, width, label in zip(table.rows[0].cells, widths, ["Area", "Evidence", "Decision implication"]):
        cell.width = Inches(width)
        cell.text = label
        shade(cell, "334952")
        for run in cell.paragraphs[0].runs:
            run.font.color.rgb = RGBColor(255, 255, 255)
            run.font.size = Pt(10)
            run.bold = True
    table.rows[0]._tr.get_or_add_trPr().append(OxmlElement("w:tblHeader"))
    for index, row in enumerate(DATA["evidence"]):
        cells = table.add_row().cells
        for cell, width, text in zip(cells, widths, [row["label"], row["finding"] + ". " + row["gap"] + ".", row["implication"]]):
            cell.width = Inches(width)
            cell.text = text
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            shade(cell, "F0F3F5" if index % 2 == 0 else "FFFFFF")
            props = cell._tc.get_or_add_tcPr()
            margins = OxmlElement("w:tcMar")
            for edge in ["top", "bottom", "start", "end"]:
                item = OxmlElement("w:" + edge)
                item.set(qn("w:w"), "110")
                item.set(qn("w:type"), "dxa")
                margins.append(item)
            props.append(margins)
            for p in cell.paragraphs:
                p.paragraph_format.space_after = Pt(2)
                p.paragraph_format.line_spacing = 1.12
                for run in p.runs:
                    run.font.size = Pt(10)
        table.rows[-1]._tr.get_or_add_trPr().append(OxmlElement("w:cantSplit"))

    doc.add_page_break()
    doc.add_heading("Actions before the design baseline", 1)
    paragraph(doc, "Resolve the following evidence gaps before confirming design decisions that depend on them. Initial diagnostic work can proceed for the six supplied regions.")
    for action in DATA["actions"]:
        paragraph(doc, action, "List Number")
    doc.add_heading("Scope and decision boundary", 1)
    paragraph(doc, "This assessment supports the agreed operating-model diagnostic. Receipt of a regional extract does not establish its suitability for design decisions. Proposed ownership must remain separate from observed ownership, and unresolved questions must remain visible until validated.")
    paragraph(doc, "Implementation remains outside the accepted engagement scope. The diagnostic baseline should reflect the evidence validated by the regional leads and reviewed by the design lead.")
    doc.add_heading("Supporting records", 1)
    for source in DATA["sources"]:
        paragraph(doc, source, "List Bullet")
    doc.add_heading("Reviewed revision", 1)
    paragraph(doc, "Revision 2 clarifies what the coverage, ownership and currency gaps prevent the team from concluding about design readiness. Sofia Patel approved the revised assessment for export after reviewing that clarification.")

    props = doc.core_properties
    props.title, props.subject = DATA["title"], "Northstar Foods operating-model diagnostic"
    props.author, props.last_modified_by = DATA["author"], DATA["reviewer"]
    props.identifier = "NS-DR01-R2"
    props.revision = DATA["revision"]
    props.created = props.modified = datetime(2026, 9, 7, tzinfo=timezone.utc)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build()
