function convertUnits() {

    let inputValue = parseFloat(
        document.getElementById("inputValue").value
    );

    if (isNaN(inputValue)) {
        alert("Please enter a valid number.");
        return;
    }

    // Length conversion
    let length1 = inputValue * 3.28084;
    let length2 = inputValue * 0.3048;

    // Volume conversion
    let volume1 = inputValue * 0.264172;
    let volume2 = inputValue * 3.78541;

    // Mass conversion
    let mass1 = inputValue * 2.20462;
    let mass2 = inputValue * 0.453592;

    // Display messages
    document.getElementById("length1").textContent =
        `${inputValue} meters = ${length1.toFixed(2)} feet`;

    document.getElementById("length2").textContent =
        `${inputValue} feet = ${length2.toFixed(2)} meters`;

    document.getElementById("volume1").textContent =
        `${inputValue} liters = ${volume1.toFixed(2)} gallons`;

    document.getElementById("volume2").textContent =
        `${inputValue} gallons = ${volume2.toFixed(2)} liters`;

    document.getElementById("mass1").textContent =
        `${inputValue} kilograms = ${mass1.toFixed(2)} pounds`;

    document.getElementById("mass2").textContent =
        `${inputValue} pounds = ${mass2.toFixed(2)} kilograms`;
}