import html2pdf from "html2pdf.js";

export function exportPDF(templateName) {
  const element = document.getElementById("document-preview");
  if (!element) return;

  const fileName = `${templateName || "document"}-${Date.now()}.pdf`;

  html2pdf()
    .set({
      margin: 10,
      filename: fileName,
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    })
    .from(element)
    .save();
}
