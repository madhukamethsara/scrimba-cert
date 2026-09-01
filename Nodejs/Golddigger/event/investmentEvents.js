import { EventEmitter } from "node:events";
import logData from "../utils/logData.js";

const investmentEvents = new EventEmitter();

investmentEvents.on("new-investment", (investment) => {
  logData(investment).catch((error) => {
    console.error("Could not save investment log:", error.message);
  });
});

export { investmentEvents };