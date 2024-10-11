import actions from './actions.js';
class Calculator {
  constructor() {
    this.display = document.querySelector('.display');
    this.displayValue = '';
    this.currentOperation = null;
    this.operandA = null;
    this.operandB = null;
    this.initializeKeyListeners();
  }

  updateDisplay() {
    this.display.textContent = this.displayValue.substring(0, 7);
  }

  appendDigit(digit) {
    this.displayValue += digit;
    this.updateDisplay();
  }

  setOperation(operation) {
    this.currentOperation = operation;
    this.performOperation();
  }

  performOperation() {
    if (!this.operandA) {
      this.operandA = Number(this.displayValue);
      this.displayValue = '';
    } else if (!this.operandB) {
      this.operandB = Number(this.displayValue);
      this.operandA = this.operate(
        this.currentOperation,
        this.operandA,
        this.operandB
      );
      this.displayValue = String(this.operandA);
      this.updateDisplay();
      this.displayValue = '';
      this.operandB = null;
    }
  }

  operate(operation, a, b) {
    const operations = {
      add: (a, b) => a + b,
      subtract: (a, b) => a - b,
      multiply: (a, b) => a * b,
      divide: (a, b) => (b === 0 ? 'Error' : a / b),
    };
    return operations[operation](a, b);
  }

  clear() {
    this.displayValue = '';
    this.currentOperation = null;
    this.operandA = null;
    this.operandB = null;
    this.updateDisplay();
  }

  changeSign() {
    const currentValue = this.operandA || Number(this.displayValue);
    this.displayValue = String(-currentValue);
    this.operandA = null;
    this.updateDisplay();
  }

  convertToPercentage() {
    const currentValue = this.operandA || Number(this.displayValue);
    this.displayValue = String(currentValue * 0.01);
    this.operandA = null;
    this.updateDisplay();
  }

  addDecimalPoint() {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
      this.updateDisplay();
    }
  }

  calculateResult() {
    this.operandB = Number(this.displayValue);
    this.operandA = this.operate(
      this.currentOperation,
      this.operandA,
      this.operandB
    );
    this.displayValue = String(this.operandA);
    this.updateDisplay();
    this.displayValue = '';
    this.operandB = null;
    this.operandA = null;
  }

  handleKeyPress(id) {
    if (actions[id]) {
      actions[id](this);
    }
  }

  initializeKeyListeners() {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) =>
      key.addEventListener('click', () => this.handleKeyPress(key.id))
    );
  }
}
export default Calculator;
