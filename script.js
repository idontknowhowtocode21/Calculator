let displayElement = document.getElementById('display');
let currentInput = '';

function appendToDisplay(value) {
    if (displayElement.innerText === '0' && value !== '.') {
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
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') currentInput = '0';
    updateDisplay();
}

function calculate() {
    try {
        // Use eval carefully for this project
        // Replacing visual symbols with math symbols
        let expression = currentInput.replace('×', '*').replace('÷', '/');
        currentInput = eval(expression).toString();
        updateDisplay();
    } catch (error) {
        displayElement.innerText = 'Error';
        currentInput = '';
    }
}

function updateDisplay() {
    displayElement.innerText = currentInput;
}

function toggleSign() {
    if (currentInput !== '0') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}
