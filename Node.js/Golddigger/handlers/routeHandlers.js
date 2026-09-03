import sendResponse from "../utils/sendResponse.js";
import getGoldPrices from "../utils/getGoldPrices.js";
import { investmentEvents } from "../event/investmentEvents.js";
import createInvoice from "../utils/createInvoice.js";

export default async function routeHandler(req, res) {
  if (req.url === "/api" && req.method === "GET") {
    const goldPriceData = getGoldPrices();

    sendResponse(
      res,
      200,
      "application/json; charset=utf-8",
      JSON.stringify(goldPriceData)
    );

    return;
  }

  if (req.url === "/api" && req.method === "POST") {
    await handleInvestment(req, res);
    return;
  }

  if (req.url === "/api/liveprices" && req.method === "GET") {
    startLivePriceStream(req, res);
    return;
  }

  sendResponse(
    res,
    404,
    "application/json; charset=utf-8",
    JSON.stringify({ error: "API route not found" })
  );
}

async function handleInvestment(req, res) {
  try {
    let requestBody = "";

    for await (const chunk of req) {
      requestBody += chunk;
    }

    const investment = JSON.parse(requestBody);

    const amount = Number(investment["investment-amount"]);
    const email = investment["customer-email"];
    const livePrice = Number(investment.livePrice);

    if (!Number.isFinite(amount) || amount <= 0) {
      sendResponse(
        res,
        400,
        "application/json; charset=utf-8",
        JSON.stringify({
          error: "Investment amount must be greater than 0."
        })
      );
      return;
    }

    if (!email || !email.includes("@")) {
      sendResponse(
        res,
        400,
        "application/json; charset=utf-8",
        JSON.stringify({
          error: "Please enter a valid email address."
        })
      );
      return;
    }

    if (!Number.isFinite(livePrice) || livePrice <= 0) {
      sendResponse(
        res,
        400,
        "application/json; charset=utf-8",
        JSON.stringify({
          error: "A valid live gold price is required."
        })
      );
      return;
    }

    const goldAmount = (amount / livePrice).toFixed(2);

    const completedInvestment = {
      investmentAmount: amount.toFixed(2),
      goldAmount,
      email,
      livePrice: livePrice.toFixed(2)
    };

    completedInvestment.invoicePath = await createInvoice(completedInvestment);
    
    investmentEvents.emit("new-investment", completedInvestment);

    sendResponse(
      res,
      201,
      "application/json; charset=utf-8",
      JSON.stringify({
        message: "Investment received",
        ...completedInvestment
      })
    );
  } catch {
    sendResponse(
      res,
      400,
      "application/json; charset=utf-8",
      JSON.stringify({
        error: "Request body must be valid JSON."
      })
    );
  }
}

function startLivePriceStream(req, res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive"
  });

  const sendPrice = () => {
    const goldPriceData = getGoldPrices();

    res.write(`data: ${JSON.stringify(goldPriceData)}\n\n`);
  };

  sendPrice();

  const priceInterval = setInterval(sendPrice, 3000);

  req.on("close", () => {
    clearInterval(priceInterval);
    res.end();
  });
}