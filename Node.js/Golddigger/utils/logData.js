
import { appendFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);
const currentFolder = path.dirname(currentFile);

const logFilePath = path.join(
  currentFolder,
  "..",
  "data",
  "investments.log"
);

export default async function logData(investment) {
  const line = [
    new Date().toISOString(),
    `amount: £${investment.investmentAmount}`,
    `email: ${investment.email}`,
    `price per oz: £${investment.livePrice}`,
    `gold amount: ${investment.goldAmount} oz`
  ].join(" | ");

  await appendFile(logFilePath, `${line}\n`);
}