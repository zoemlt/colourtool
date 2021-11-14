const hexInput = document.getElementById("hexInput");
const inputColour = document.getElementById("inputColour");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");

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

const convertHexToRGB = (hex) => {
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


const convertRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

//increase each r,g,b value by appropriate amount (percentage of 255)
//use the new r,g,b values to convert to a hex value
//return the hex value

const alterColour = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    console.log({newR, newG, newB});
    return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex;
    // return Math.min(255, Math.max(0, hex + amount));  ->  another way to do it
}

alterColour("fff", 10);

slider.addEventListener("input", () => {
    sliderText.innerText = `${slider.value}%`;
})
