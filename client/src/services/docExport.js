import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export async function exportDOCX(documentObj) {
  const { text, template } = documentObj;
  const fileName = `${template || "document"}-${Date.now()}.docx`;

  // Template-aware style configuration
  const fontName = template === "letter" ? "Georgia" : template === "report" ? "Courier New" : "Arial";
  const baseSize = template === "letter" ? 24 : 22; // 24 = 12pt, 22 = 11pt in half-points

  const lines = text.split("\n");
  const children = [];

  // Add default template-aware header
  const headerMap = {
    resume: "Professional Resume",
    letter: "Business Letter",
    report: "Project Report",
  };

  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: headerMap[template] || "Document Export",
          bold: true,
          size: 32, // 16pt
          font: fontName,
        }),
      ],
      spacing: { after: 300 },
    })
  );

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("# ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(2),
              bold: true,
              size: baseSize + 8,
              font: fontName,
            }),
          ],
          spacing: { before: 240, after: 120 },
        })
      );
    } else if (trimmed.startsWith("## ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(3),
              bold: true,
              size: baseSize + 4,
              font: fontName,
            }),
          ],
          spacing: { before: 180, after: 80 },
        })
      );
    } else if (trimmed.startsWith("### ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(4),
              bold: true,
              size: baseSize + 2,
              font: fontName,
            }),
          ],
          spacing: { before: 120, after: 60 },
        })
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed.slice(2),
              font: fontName,
              size: baseSize,
            }),
          ],
          bullet: {
            level: 0,
          },
          spacing: { after: 80 },
        })
      );
    } else if (trimmed !== "") {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              font: fontName,
              size: baseSize,
            }),
          ],
          spacing: { after: 120 },
        })
      );
    } else {
      children.push(
        new Paragraph({
          spacing: { after: 120 },
        })
      );
    }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, fileName);
}
