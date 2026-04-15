import { jsPDF } from "jspdf";

/**
 * Generates a professional PDF receipt for a research claim.
 * @param {Object} claim - The claim data
 * @param {Object} userData - The user/faculty data (optional)
 */
export const generateClaimPDF = (claim, userData = {}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Colors
  const primaryBlue = [37, 99, 235];    // #2563EB
  const darkGray = [31, 41, 55];        // #1F2937
  const mediumGray = [107, 114, 128];   // #6B7280
  const lightGray = [229, 231, 235];    // #E5E7EB
  const greenColor = [16, 185, 129];    // #10B981

  // === HEADER ===
  doc.setFillColor(...primaryBlue);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("PANIPAT INSTITUTE OF ENGINEERING", pageWidth / 2, 18, { align: "center" });
  doc.text("AND TECHNOLOGY", pageWidth / 2, 27, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Research Publication Incentive - Claim Receipt", pageWidth / 2, 38, { align: "center" });

  y = 58;

  // === CLAIM REFERENCE ===
  doc.setTextColor(...mediumGray);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Claim ID: ${claim._id || "N/A"}`, 15, y);
  doc.text(`Generated: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`, pageWidth - 15, y, { align: "right" });

  y += 12;

  // === SECTION: Faculty Details (if available) ===
  if (userData.fullName) {
    doc.setFillColor(248, 250, 252);
    doc.rect(15, y - 5, pageWidth - 30, 35, "F");
    doc.setDrawColor(...lightGray);
    doc.rect(15, y - 5, pageWidth - 30, 35, "S");

    doc.setTextColor(...primaryBlue);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Faculty Information", 20, y + 3);

    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    y += 12;
    doc.text(`Name: ${userData.fullName}`, 20, y);
    doc.text(`Department: ${userData.department || "N/A"}`, 110, y);
    y += 8;
    doc.text(`Employee ID: ${userData.employeeId || "N/A"}`, 20, y);
    doc.text(`Designation: ${userData.designation || "N/A"}`, 110, y);

    y += 18;
  }

  // === SECTION: Claim Details ===
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y - 5, pageWidth - 30, 65, "F");
  doc.setDrawColor(...lightGray);
  doc.rect(15, y - 5, pageWidth - 30, 65, "S");

  doc.setTextColor(...primaryBlue);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Claim Details", 20, y + 3);

  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  y += 13;
  doc.setFont("helvetica", "bold");
  doc.text("Title:", 20, y);
  doc.setFont("helvetica", "normal");
  // Handle long titles by wrapping
  const titleLines = doc.splitTextToSize(claim.title || "N/A", pageWidth - 70);
  doc.text(titleLines, 50, y);
  y += titleLines.length * 6 + 2;

  doc.setFont("helvetica", "bold");
  doc.text("Category:", 20, y);
  doc.setFont("helvetica", "normal");
  const categoryText = Array.isArray(claim.category) ? claim.category.join(", ") : (claim.category || "N/A");
  doc.text(categoryText, 50, y);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Venue:", 20, y);
  doc.setFont("helvetica", "normal");
  doc.text(claim.venue || "N/A", 50, y);

  y += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Date:", 20, y);
  doc.setFont("helvetica", "normal");
  const pubDate = claim.publicationDate
    ? new Date(claim.publicationDate).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : "N/A";
  doc.text(pubDate, 50, y);

  if (claim.webLink && claim.webLink !== "NA") {
    doc.setFont("helvetica", "bold");
    doc.text("Web Link:", 110, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...primaryBlue);
    const linkText = claim.webLink.length > 30 ? claim.webLink.substring(0, 30) + "..." : claim.webLink;
    doc.text(linkText, 135, y);
    doc.setTextColor(...darkGray);
  }

  y += 18;

  // === SECTION: Authors ===
  if (claim.authors && claim.authors.length > 0 && claim.authors[0] !== "NA") {
    doc.setFillColor(248, 250, 252);
    const authorsHeight = 15 + claim.authors.length * 7;
    doc.rect(15, y - 5, pageWidth - 30, authorsHeight, "F");
    doc.setDrawColor(...lightGray);
    doc.rect(15, y - 5, pageWidth - 30, authorsHeight, "S");

    doc.setTextColor(...primaryBlue);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Authors", 20, y + 3);

    doc.setTextColor(...darkGray);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    y += 12;
    claim.authors.forEach((author, index) => {
      doc.text(`${index + 1}. ${author}`, 25, y);
      y += 7;
    });

    y += 8;
  }

  // === SECTION: Amount ===
  doc.setFillColor(...greenColor);
  doc.rect(15, y - 2, pageWidth - 30, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Calculated Amount", 20, y + 9);

  doc.setFontSize(16);
  const amount = claim.calculatedAmount || 0;
  doc.text(`Rs. ${amount.toLocaleString("en-IN")}`, pageWidth - 20, y + 10, { align: "right" });

  y += 12;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  if (claim.totalAmount && claim.numberOfAuthors) {
    doc.text(`Total: Rs.${claim.totalAmount.toLocaleString("en-IN")} / ${claim.numberOfAuthors} author(s)`, pageWidth - 20, y + 8, { align: "right" });
  }

  y += 25;

  // === SECTION: Status ===
  doc.setTextColor(...darkGray);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Status: ", 20, y);
  const status = claim.status || "Submitted";
  if (status === "Processed") {
    doc.setTextColor(...greenColor);
  } else {
    doc.setTextColor(234, 179, 8); // yellow
  }
  doc.text(status, 42, y);

  // === FOOTER ===
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(...lightGray);
  doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);

  doc.setTextColor(...mediumGray);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text("This is a system-generated document from the PIET Research Publication Incentive Portal.", pageWidth / 2, footerY, { align: "center" });
  doc.text("For queries, contact the Research & Development Cell.", pageWidth / 2, footerY + 5, { align: "center" });

  // Save
  const fileName = `PIET_Claim_${(claim.title || "receipt").replace(/[^a-zA-Z0-9]/g, "_").substring(0, 30)}.pdf`;
  doc.save(fileName);
};
