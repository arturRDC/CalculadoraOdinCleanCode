var displayValue = '';
var displayElement = document.querySelector('.display');
var currentOperation;
var operandA;
var operandB;


// Adds two numbers
function add(a, b) {
    return a + b;
}

// Subtracts two numbers
function subtract(a, b) {
    return a - b;
}

// Multiplies two numbers
function multiply(a, b) {
    return a * b;
}

// Divides two numbers
function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function operate(operator, a, b) {
    return operator(a,b);
}


function updateDisplay() {
    this.displayElement.textContent = displayValue.substring(0,7);
}

function performOperation() {
    if (!operandA) {
        operandA = Number(displayValue);
        displayValue = '';
    } else if (!operandB) {
        operandB = Number(displayValue);
        operandA = operate(this.currentOperation, operandA, operandB);
        displayValue = String(operandA);
        updateDisplay();
        displayValue = '';
        operandB = null;
    }
}


function pressKey(id) {
    switch (id) {
        case 'one':
            displayValue += '1';
            updateDisplay();
            break;
        case 'two':
            displayValue += '2';
            updateDisplay();
            break;
        case 'three':
            displayValue += '3';
            updateDisplay();
            break;
        case 'four':
            displayValue += '4';
            updateDisplay();
            break;
        case 'five':
            displayValue += '5';
            updateDisplay();
            break;
        case 'six':
            displayValue += '6';
            updateDisplay();
            break;
        case 'seven':
            displayValue += '7';
            updateDisplay();
            break;
        case 'eight':
            displayValue += '8';
            updateDisplay();
            break;
        case 'nine':
            displayValue += '9';
            updateDisplay();
            break;
        case 'zero':
            displayValue += '0';
            updateDisplay();
            break;
        case 'addition':
            currentOperation = add;
            performOperation();
            break;
        case 'division':
            currentOperation = divide;
            performOperation();
            if (displayValue === 'Error') displayValue = '';
            break;
        case 'subtraction':
            currentOperation = subtract;
            performOperation();
            break;
        case 'multiplication':
            currentOperation = multiply;
            performOperation();
            break;
        case 'ac':
            displayValue = '';
            updateDisplay();     
            currentOperation = null;
            operandA = null;
            operandB = null;
            break;
        case 'sign':
            operandA = operandA || Number(displayValue);
            operandA = -1 * (operandA);
            displayValue = operandA.toString();
            operandA = null;
            updateDisplay();
            break;
        case 'percentage':
            operandA = operandA || Number(displayValue);
            operandA = 0.01 * (operandA);
            displayValue = operandA.toString();
            operandA = null;
            updateDisplay();
            break;
        case 'dot':
            if (displayValue.includes('.')) {
                break;
            }
            displayValue += '.';
            updateDisplay();
            break;
        case 'equals':
            operandB = Number(displayValue);
            operandA = operate(this.currentOperation, operandA, operandB);
            displayValue = String(operandA);
            updateDisplay();
            displayValue = '';
            operandB = null;
            operandA = null;
            break;
        default:
            break;
    }
}


let keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('click',()=> pressKey(key.id)));
