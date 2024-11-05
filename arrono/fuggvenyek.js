var firstNumber = 5;
var secondNumber = 8;


const add = (firstNumber, secondNumber) => firstNumber + secondNumber

const subtract = (firstNumber, secondNumber) => firstNumber - secondNumber

const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber

const divide = (firstNumber, secondNumber) => firstNumber / secondNumber

const muvelet = (firstNumber, secondNumber, fgv) => fgv(firstNumber,secondNumber)

console.log(add(firstNumber, secondNumber))
console.log(subtract(firstNumber, secondNumber))
console.log(multiply(firstNumber, secondNumber))
console.log(divide(firstNumber, secondNumber))
console.log(muvelet(firstNumber, secondNumber, add))