export default async function sendFormData(formElement) {
  const formData = new FormData(formElement);

  const investmentAmount = Number(formData.get("investment-amount"));
  const livePrice = Number(
    document.getElementById("price-display").textContent
  );

  const requestData = {
    "investment-amount": investmentAmount,
    "customer-email": formData.get("customer-email"),
    livePrice
  };

  const response = await fetch("/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestData)
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.error || "Could not submit investment.");
  }

  formElement.reset();

  return responseData;
}