const display = document.querySelector('.display');
display.textContent = '0';
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const allClear = document.querySelector('.all-clear');
const decimal = document.querySelector('.decimal');
const equals = document.querySelector('.operator');
const backspace = document.querySelector('.delete');

// Variables for each part of the calculator operation
let firstInput = '';
let secondInput = '';
let currentOperator = '';

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        setSecondInput(number.textContent);
        setDisplayText(secondInput);
    })
});

function setSecondInput(number) {
    if(secondInput === '') {
        secondInput = number;
    } else {
        secondInput = secondInput.concat(number);
    }
}

decimal.addEventListener('click', () => {
    if(!secondInput.includes('.')) {
        secondInput = secondInput.concat('.');
        setDisplayText(secondInput);
    }
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        setOperator(operator.textContent);
    })
});

function setOperator(operator) {
    if (firstInput !== '' && secondInput !== '') {
        secondInput = operate(firstInput, secondInput, currentOperator);
        setDisplayText(secondInput);
    }
    currentOperator = operator;
    if (secondInput !== '') {
        firstInput = secondInput;
    }
    secondInput = '';
}

function setDisplayText(text) {
    display.textContent = text;
}

backspace.addEventListener('click', () => {
    eraseLastDigit();
})

function eraseLastDigit() {
    secondInput = display.textContent.slice(0, display.textContent.length - 1);
    setDisplayText(secondInput);
}

allClear.addEventListener('click', () => {
    resetCalculator();
});

function resetCalculator() {
    firstInput = '';
    currentOperator ='';
    secondInput = '';
    setDisplayText(firstInput);
    display.textContent = '0';
}

function operate (firstInput, secondInput, operator) {
    firstInput = Number(firstInput);
    secondInput = Number(secondInput);
    let result;

        switch(operator) {
            case '+':
                result = add(firstInput, secondInput);
                break;
            
            case '-':
                result = subtract(firstInput, secondInput);
                break;

            case '*':
                result = multiply(firstInput, secondInput);
                break;

            case '/':
                if (secondInput === 0) {
                    return "INVALID";
                } else {
                    result = divide(firstInput, secondInput);
                };
                break;
            case '=': 
                result = secondInput;  
        };
        result = Math.round(result * 100000) / 100000;
        return result;
}


// Operation functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
    
