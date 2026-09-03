import startLivePrices from "../utils/liveprices.js";
import sendFormData from "../utils/sendFormData.js";
import showModal from "../utils/showModal.js";

startLivePrices();

const investmentForm = document.querySelector("form");
const investButton = document.getElementById("invest-btn");

investmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  investButton.disabled = true;
  investButton.textContent = "Submitting...";

  try {
    const investmentData = await sendFormData(investmentForm);
    showModal(investmentData);
  } catch (error) {
    alert(error.message);
  } finally {
    investButton.disabled = false;
    investButton.textContent = "Invest Now!";
  }
});