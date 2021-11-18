const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");
const error = document.getElementById("error");
const maximumColorMessage = document.getElementById("maximumColorMessage");

toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("toggled");
    lightenText.classList.toggle("unselected");
    darkenText.classList.toggle("unselected");
    reset();
})

hexInput.addEventListener("keyup", () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace("#", "")
    inputColor.style.backgroundColor = "#" + strippedHex;
    reset();
})

const regexTest = (input) => {
    let regex = /^[0-9a-f]{3,6}$/i;
    if (regex.test(input)) return;
    error.innerText = "Please enter a valid hex.";
}

const isValidHex = (hex) => {
    if(!hex) return false;

    error.innerText = "";
    const strippedHex = hex.replace("#", "");
    regexTest(strippedHex);
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

const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);
    
    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    return convertRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    const newHex = hex + amount;
    if (newHex > 255) return 255;
    if (newHex < 0) return 0;
    return newHex;
    // return Math.min(255, Math.max(0, hex + amount));  ->  another way to do it
}

slider.addEventListener("input", () => {
    sliderText.innerText = `${slider.value}%`;

    if(!isValidHex(hexInput.value)) return;

    const valueAddition = 
    toggleBtn.classList.contains("toggled") ?
    -slider.value : slider.value;

    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    maximumColorValue(alteredHex);
    alteredColorText.innerText = `Altered Color ${alteredHex}`;
})

const maximumColorValue = (hex) => {
    if (hex !== "#ffffff" && hex !== "#000000") return;
    maximumColorMessage.innerText = `Maximum color value of ${hex} has been reached.`
}

const reset = () => {
    maximumColorMessage.innerText = "";
    slider.value = 0;
    sliderText.innerText = "0%";
    const strippedHex = hexInput.value.replace("#", "");
    alteredColor.style.backgroundColor = "#" + strippedHex;
    alteredColorText.innerText = `Altered Color #${hexInput.value}`;
}