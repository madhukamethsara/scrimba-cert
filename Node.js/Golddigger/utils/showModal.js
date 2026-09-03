export default function showModal(investmentData) {
  const dialog = document.querySelector(".outputs");
  const receiptButton = document.getElementById("view-receipt-btn");
  const closeButton = document.getElementById("close-dialog-btn");

  document.getElementById("gold-amount").textContent =
    investmentData.goldAmount;

  document.getElementById("invest-amount").textContent =
    investmentData.investmentAmount;

  receiptButton.onclick = () => {
    window.open(investmentData.invoicePath, "_blank");
  };

  closeButton.onclick = () => {
    dialog.close();
  };

  dialog.showModal();
}