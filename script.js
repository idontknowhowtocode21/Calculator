const display = document.getElementById('display');
const preview = document.getElementById('preview');
let currentInput = '0';

// Indian Formatting Logic
function formatIn(numStr) {
    if (isNaN(numStr.replace(/,/g, ''))) return numStr;
    let [int, dec] = numStr.split('.');
    let lastThree = int.slice(-3);
    let other = int.slice(0, -3);
    if (other !== '') lastThree = ',' + lastThree;
    let res = other.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return dec !== undefined ? res + "." + dec : res;
}

function updateUI() {
    display.innerText = currentInput;
    
    // Smooth Auto-Scaling
    let fontSize = 5; // rem
    display.style.fontSize = fontSize + 'rem';
    
    // Step down font size if it overflows
    const maxWidth = display.parentElement.clientWidth * 0.9;
    while (display.offsetWidth > maxWidth && fontSize > 2.2) {
        fontSize -= 0.3;
        display.style.fontSize = fontSize + 'rem';
    }

    // Live Preview
    if (/[+×÷\-]/.test(currentInput)) {
        try {
            let mathStr = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            let res = eval(mathStr);
            preview.innerText = formatIn(res.toString());
        } catch (e) { preview.innerText = ''; }
    } else {
        preview.innerText = '';
    }
}

function appendToDisplay(val) {
    if (currentInput === '0' && val !== '.') currentInput = val;
    else currentInput += val;
    updateUI();
}

function clearDisplay() {
    currentInput = '0';
    updateUI();
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateUI();
}

function calculate() {
    try {
        let mathStr = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        currentInput = eval(mathStr).toString();
        preview.innerText = '';
        display.style.fontSize = '5rem';
        updateUI();
    } catch (e) { display.innerText = "Error"; }
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateUI();
    }
}
