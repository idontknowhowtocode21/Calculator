let displayElement = document.getElementById('display');
let previewElement = document.getElementById('preview');
let currentInput = '0';

function updateDisplay() {
    displayElement.innerText = currentInput;
    
    // Logic for live preview result
    if (currentInput.includes('+') || currentInput.includes('-') || currentInput.includes('*') || currentInput.includes('/')) {
        try {
            let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
            let result = eval(expression);
            if (result !== undefined && result.toString() !== currentInput) {
                previewElement.innerText = result;
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
        let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
        currentInput = eval(expression).toString();
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
