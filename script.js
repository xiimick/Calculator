const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let previousInput = '';
let operator = '';
let result = null;
let decimalAdded = false;

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const buttonValue = this.textContent;

    if (button.classList.contains('operator')) {
      handleOperator(buttonValue);
    } else if (button.classList.contains('equal')) {
      calculate();
    } else if (button.classList.contains('clear')) {
      clearAll();
    } else if (button.classList.contains('backspace')) {
      backspace();
    } else {
      handleNumber(buttonValue);
    }
  });
});

function handleNumber(num) {
  if (num === '.' && decimalAdded) return;
  if (num === '.') decimalAdded = true;

  currentInput += num;
  display.value = currentInput;
}

function handleOperator(op) {
  if (currentInput === '') return;
  if (previousInput !== '') calculate();

  operator = op;
  previousInput = currentInput;
  currentInput = '';
  decimalAdded = false;
}

function calculate() {
  if (previousInput === '' || currentInput === '') return;
  let computation;
  const prev = parseFloat(previousInput);
  const curr = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(curr)) return;

  switch (operator) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    case '/':
      if (curr === 0) {
        display.value = 'Error';
        return;
      }
      computation = prev / curr;
      break;
    default:
      return;
  }

  result = computation;
  display.value = result;
  previousInput = result;
  currentInput = '';
  operator = '';
  decimalAdded = false;
}

function clearAll() {
  currentInput = '';
  previousInput = '';
  operator = '';
  result = null;
  display.value = '';
  decimalAdded = false;
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
}
