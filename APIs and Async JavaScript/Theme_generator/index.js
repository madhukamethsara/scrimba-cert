const button = document.getElementById("get-colors");

button.addEventListener("click", getColorScheme);

async function getColorScheme() {
  const color = document.getElementById("colorPicker").value.substring(1);

  const mode = document.getElementById("scheme-mode").value;

  try {
    const response = await fetch(
      `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=5`,
    );

    if (!response.ok) {
      throw new Error("Failed to get color scheme");
    }

    const data = await response.json();

    const palette = document.getElementById("palette");

    palette.innerHTML = "";

    data.colors.forEach((color) => {
      const box = document.createElement("div");

      box.classList.add("color-box");

      box.style.backgroundColor = color.hex.value;

      box.innerHTML = `
                <div class="color-info">
                    ${color.hex.value}
                </div>
            `;

      palette.appendChild(box);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

getColorScheme();
