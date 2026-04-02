const displayElement = document.getElementById('display');
const previewElement = document.getElementById('preview');
const inputLine = document.querySelector('.input-line');
let currentInput = '0';

// MAGIC: Indian Number System Formatter (2,2,3 grouping)
function formatIndian(val) {
    if (!val) return '0';
    let x = val.toString();
    let afterPoint = '';
    if (x.indexOf('.') > -1) afterPoint = x.substring(x.indexOf('.'));
    x = Math.floor(x).toString();
    let lastThree = x.substring(x.length - 3);
    let otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '') lastThree = ',' + lastThree;
    let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
    return res;
}

function updateDisplay() {
    // 1. Set the raw text (using × and ÷ symbols)
    displayElement.innerText = currentInput;

    // 2. MAGIC: Auto-Font Scaling
    let fontSize = 5; // Start at 5rem
    inputLine.style.fontSize = fontSize + 'rem';
    
    // Check if text is wider than the screen (minus padding)
    let maxWidth = inputLine.clientWidth - 40;
    while (displayElement.offsetWidth > maxWidth && fontSize > 2.0) {
        fontSize -= 0.2;
        inputLine.style.fontSize = fontSize + 'rem';
    }

    // 3. Live Preview Logic
    if (/[+×÷\-]/.test(currentInput)) {
        try {
            // Swap symbols for math-ready characters
            let mathString = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            let result = eval(mathString);
            if (result !== undefined && result.toString() !== currentInput) {
                previewElement.innerText = formatIndian(result);
            } else {
                previewElement.innerText = '';
            }
        } catch (e) {
            previewElement.innerText = '';
        }
    } else {
        previewElement.innerText = '';
    }
}

function appendToDisplay(value) {
    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function calculate() {
    try {
        let mathString = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        let finalResult = eval(mathString).toString();
        
        // Final result matches the position of the input
        currentInput = finalResult;
        previewElement.innerText = '';
        updateDisplay();
    } catch (e) {
        displayElement.innerText = 'Error';
    }
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}
