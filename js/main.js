'use strict';

const input = document.querySelector('input');
const number = document.querySelectorAll('[data-number]');
const operator = document.querySelectorAll('[data-operator]');
const equals = document.querySelector('[data-action="calculate"]');
const clear = document.querySelector('[data-action="clear"]');
let inputText;
let inputNumber = [];
let content;
let result = {};

const writeToDisplay = text => {
    inputText = (input.value);
    input.value = inputText + text;
}

const handleInput = text => {
    if (inputNumber.length === 0) {
        inputNumber.push(parseFloat(input.value));
        console.log(inputNumber[0]);
    } else {
        calculate();
    }
    input.value = '';
    writeToDisplay(text);
    content = text;
}

const calculate = () => {
    inputNumber.push(parseFloat(input.value.slice(1)));
    result = {
        '+': inputNumber.reduce((prev, current) => (prev + current)),
        '-': inputNumber.reduce((prev, current) => (prev - current)),
        'x': inputNumber.reduce((prev, current) => (prev * current)),
        '÷': inputNumber.reduce((prev, current) => (prev / current))
    };
    inputNumber.splice(0, 2, result[content]);
    
    if (isNaN(result[content]) === true) {
        result[content] = 'ERROR';
    }
    input.value = result[content];
}

const resetCalculator = () => {
    input.value = '';
    result = 0;
    inputNumber = [];
};

number.forEach(item => item.addEventListener('click', () => writeToDisplay(item.textContent)));
operator.forEach(item => item.addEventListener('click', () => handleInput(item.textContent)));
equals.addEventListener('click', calculate);
clear.addEventListener('click', resetCalculator);