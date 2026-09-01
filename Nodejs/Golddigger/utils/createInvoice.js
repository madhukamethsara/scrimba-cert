import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentFolder = path.dirname(currentFile);
const projectRoot = path.join(currentFolder, "..");

export default async function createInvoice(investment) {
  const invoiceFolder = path.join(projectRoot, "public", "invoices");

  await mkdir(invoiceFolder, { recursive: true });

  const fileName = `invoice-${Date.now()}.pdf`;
  const filePath = path.join(invoiceFolder, fileName);

  return new Promise((resolve, reject) => {
    const document = new PDFDocument({ margin: 50 });
    const fileStream = createWriteStream(filePath);

    document.pipe(fileStream);

    document.fontSize(28).text("GoldDigger Invoice", { align: "center" });
    document.moveDown();

    document.fontSize(12).text(`Date: ${new Date().toLocaleString()}`);
    document.text(`Customer email: ${investment.email}`);
    document.moveDown();

    document.fontSize(16).text("Investment Summary");
    document.moveDown(0.5);

    document.fontSize(12).text(
      `Investment amount: £${investment.investmentAmount}`
    );
    document.text(`Gold price per ounce: £${investment.livePrice}`);
    document.text(`Gold purchased: ${investment.goldAmount} oz`);

    document.moveDown(2);
    document
      .fontSize(10)
      .text("Thank you for using GoldDigger.", { align: "center" });

    document.end();

    fileStream.on("finish", () => {
      resolve(`/invoices/${fileName}`);
    });

    fileStream.on("error", reject);
  });
}