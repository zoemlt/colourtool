let hexInput = document.querySelector("hexInput");

const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace("#", "");
    return strippedHex.length === 3 || strippedHex.length === 6;
}

isValidHex(hexInput.value);