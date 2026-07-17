import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";

export async function exportDOCX(activeTemplate, data, styles) {
  const fileName = `${activeTemplate || "document"}-${Date.now()}.docx`;
  const children = [];

  // Theme fonts and settings
  const fontName = styles.fontFamily === "serif" ? "Georgia" : styles.fontFamily === "mono" ? "Courier New" : "Arial";
  
  // Custom font size mapper
  const baseSize = styles.fontSize === "sm" ? 20 : styles.fontSize === "lg" ? 24 : 22; // half-points: 22 = 11pt

  // Helper to create styled horizontal separator
  const addSeparator = () => {
    children.push(
      new Paragraph({
        border: {
          bottom: {
            color: styles.accentColor || "4F46E5",
            space: 1,
            value: "single",
            size: 6,
          },
        },
        spacing: { after: 200, before: 100 },
      })
    );
  };

  // ================= 1. RESUME EXPORT =================
  if (activeTemplate === "resume") {
    // Header Name
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: (data.name || "YOUR NAME").toUpperCase(),
            bold: true,
            size: baseSize + 12, // 16pt-18pt
            font: fontName,
            color: (styles.accentColor || "#4f46e5").replace("#", ""),
          }),
        ],
      })
    );

    // Job Title
    if (data.title) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: data.title.toUpperCase(),
              bold: true,
              size: baseSize + 2,
              font: fontName,
              color: "666666",
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }

    // Contact Details block
    const contactParts = [
      data.email,
      data.phone,
      data.location,
      data.website
    ].filter(Boolean);

    if (contactParts.length > 0) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: contactParts.join("  |  "),
              size: baseSize - 2, // 10pt
              font: fontName,
              color: "777777",
            }),
          ],
          spacing: { after: 200 },
        })
      );
    }

    addSeparator();

    // Summary Section
    if (data.summary) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "PROFESSIONAL PROFILE",
              bold: true,
              size: baseSize + 4,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 180, after: 100 },
        })
      );

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.summary,
              font: fontName,
              size: baseSize,
            }),
          ],
          spacing: { after: 200 },
        })
      );
    }

    // Work Experience
    if (data.experience && data.experience.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "EMPLOYMENT HISTORY",
              bold: true,
              size: baseSize + 4,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 240, after: 120 },
        })
      );

      data.experience.forEach((exp) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${exp.role || "Role"} - ${exp.company || "Company"}`,
                bold: true,
                font: fontName,
                size: baseSize + 2,
              }),
              new TextRun({
                text: exp.dates ? `   (${exp.dates})` : "",
                italic: true,
                font: fontName,
                size: baseSize,
                color: "555555",
              }),
            ],
            spacing: { before: 80, after: 60 },
          })
        );

        if (exp.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: exp.description,
                  font: fontName,
                  size: baseSize,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      });
    }

    // Education
    if (data.education && data.education.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "EDUCATION & TRAINING",
              bold: true,
              size: baseSize + 4,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 240, after: 120 },
        })
      );

      data.education.forEach((edu) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree || "Degree"} - ${edu.school || "School"}`,
                bold: true,
                font: fontName,
                size: baseSize + 2,
              }),
              new TextRun({
                text: edu.dates ? `   (${edu.dates})` : "",
                italic: true,
                font: fontName,
                size: baseSize,
                color: "555555",
              }),
            ],
            spacing: { before: 80, after: 60 },
          })
        );

        if (edu.description) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: edu.description,
                  font: fontName,
                  size: baseSize,
                }),
              ],
              spacing: { after: 120 },
            })
          );
        }
      });
    }

    // Skills
    if (data.skills && data.skills.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "KEY SKILLS",
              bold: true,
              size: baseSize + 4,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 240, after: 120 },
        })
      );

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.skills.join("  •  "),
              bold: true,
              font: fontName,
              size: baseSize,
              color: "333333",
            }),
          ],
          spacing: { after: 120 },
        })
      );
    }
  }

  // ================= 2. BUSINESS LETTER EXPORT =================
  else if (activeTemplate === "letter") {
    // Sender Information (Top Right alignment)
    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({
            text: (data.senderName || "Sender Name").toUpperCase(),
            bold: true,
            size: baseSize + 2,
            font: fontName,
            color: (styles.accentColor || "#4f46e5").replace("#", ""),
          }),
        ],
      })
    );

    if (data.senderAddress) {
      data.senderAddress.split("\n").forEach((addrLine) => {
        children.push(
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: addrLine,
                size: baseSize - 2,
                font: fontName,
                color: "555555",
              }),
            ],
          })
        );
      });
    }

    if (data.senderPhone || data.senderEmail) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: [data.senderPhone, data.senderEmail].filter(Boolean).join("  |  "),
              size: baseSize - 2,
              font: fontName,
              color: "777777",
            }),
          ],
          spacing: { after: 240 },
        })
      );
    }

    // Date (Left alignment)
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.date || new Date().toLocaleDateString(),
            bold: true,
            font: fontName,
            size: baseSize,
          }),
        ],
        spacing: { before: 180, after: 180 },
      })
    );

    // Recipient Information (Left alignment)
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: data.recipientName || "Recipient Name",
            bold: true,
            font: fontName,
            size: baseSize + 2,
          }),
        ],
      })
    );

    if (data.recipientTitle || data.recipientCompany) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: [data.recipientTitle, data.recipientCompany].filter(Boolean).join(", "),
              font: fontName,
              size: baseSize,
              color: "555555",
            }),
          ],
        })
      );
    }

    if (data.recipientAddress) {
      data.recipientAddress.split("\n").forEach((addrLine) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: addrLine,
                size: baseSize,
                font: fontName,
                color: "555555",
              }),
            ],
          })
        );
      });
    }

    // Subject
    if (data.subject) {
      children.push(
        new Paragraph({
          spacing: { before: 240, after: 240 },
          children: [
            new TextRun({
              text: `SUBJECT: ${data.subject.toUpperCase()}`,
              bold: true,
              size: baseSize + 2,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
        })
      );
    } else {
      children.push(new Paragraph({ spacing: { after: 120 } }));
    }

    // Body
    if (data.body) {
      const paragraphs = data.body.split("\n\n").map(p => p.trim()).filter(Boolean);
      paragraphs.forEach((pText) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: pText,
                font: fontName,
                size: baseSize,
              }),
            ],
            spacing: { after: 180 },
          })
        );
      });
    }

    // Signature
    if (data.signature) {
      children.push(new Paragraph({ spacing: { before: 180 } }));
      data.signature.split("\n").forEach((sigLine) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: sigLine,
                font: fontName,
                size: baseSize,
                bold: true,
              }),
            ],
          })
        );
      });
    }
  }

  // ================= 3. PROJECT REPORT EXPORT =================
  else if (activeTemplate === "report") {
    // Title
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: (data.title || "PROJECT REPORT").toUpperCase(),
            bold: true,
            size: baseSize + 16, // Title
            font: fontName,
            color: (styles.accentColor || "#4f46e5").replace("#", ""),
          }),
        ],
        spacing: { before: 200, after: 80 },
      })
    );

    // Subtitle
    if (data.subtitle) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.subtitle,
              size: baseSize + 4,
              font: fontName,
              color: "555555",
            }),
          ],
          spacing: { after: 240 },
        })
      );
    }

    // Author, Org, Date Metadata
    const metaParts = [];
    if (data.author) metaParts.push(`Author: ${data.author}`);
    if (data.org) metaParts.push(`Org: ${data.org}`);
    if (data.date) metaParts.push(`Date: ${data.date}`);

    if (metaParts.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: metaParts.join("   |   "),
              size: baseSize - 2,
              font: fontName,
              color: "777777",
            }),
          ],
          spacing: { after: 180 },
        })
      );
    }

    addSeparator();

    // Abstract
    if (data.abstract) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "EXECUTIVE ABSTRACT",
              bold: true,
              size: baseSize + 2,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 120, after: 80 },
        })
      );

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: data.abstract,
              font: fontName,
              size: baseSize,
              italic: true,
            }),
          ],
          spacing: { after: 240 },
        })
      );
    }

    // Report Sections
    if (data.sections && data.sections.length > 0) {
      data.sections.forEach((sec, idx) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: (sec.heading || `Section ${idx + 1}`).toUpperCase(),
                bold: true,
                size: baseSize + 4,
                font: fontName,
                color: (styles.accentColor || "#4f46e5").replace("#", ""),
              }),
            ],
            spacing: { before: 240, after: 100 },
          })
        );

        if (sec.content) {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: sec.content,
                  font: fontName,
                  size: baseSize,
                }),
              ],
              spacing: { after: 180 },
            })
          );
        }
      });
    }

    // References
    if (data.references && data.references.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "REFERENCES & BIBLIOGRAPHY",
              bold: true,
              size: baseSize + 4,
              font: fontName,
              color: (styles.accentColor || "#4f46e5").replace("#", ""),
            }),
          ],
          spacing: { before: 240, after: 120 },
        })
      );

      data.references.forEach((ref, idx) => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${idx + 1}.  ${ref}`,
                font: fontName,
                size: baseSize - 2,
                color: "555555",
              }),
            ],
            spacing: { after: 80 },
          })
        );
      });
    }
  }

  // Create Document and trigger download
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
