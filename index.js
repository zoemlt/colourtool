const hexInput = document.getElementById("hexInput")
const inputColour = document.getElementById("inputColour")

hexInput.addEventListener("keyup", () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace("#", "")
    inputColour.style.backgroundColor = "#" + strippedHex;
})

const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
}

console.log(isValidHex(hexInput.value));