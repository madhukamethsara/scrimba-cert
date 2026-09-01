export default function startLivePrices() {
  const eventSource = new EventSource("/api/liveprices");

  const priceDisplay = document.getElementById("price-display");
  const statusDisplay = document.getElementById("connection-status");
  const investButton = document.getElementById("invest-btn");

  eventSource.onmessage = (event) => {
    const { price } = JSON.parse(event.data);

    priceDisplay.textContent = price;
    statusDisplay.textContent = "Live price 🟢";
    investButton.disabled = false;
  };

  eventSource.onerror = () => {
    priceDisplay.textContent = "----.--";
    statusDisplay.textContent = "Disconnected 🔴";
    investButton.disabled = true;
  };
}