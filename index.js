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

//Create a function to convert Hex to RGB
//this should work with 3 or 6 character hex values
//Hint - useParseInt(16) to convert a hex value to a decimal value
//should return an object with 3 properties - r,g, and b
//Test your function with a few different use cases

const hexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace("#", "");
    if (strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0, 2), 16);
    const g = parseInt(strippedHex.substring(2, 4), 16);
    const b = parseInt(strippedHex.substring(4, 6), 16);
    return {r, g, b}
}

console.log(hexToRGB("123"));