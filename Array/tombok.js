const numbers = [2,13,3,7,17,5,11,19,9];
const names = ['Eva', 'Adel', 'Cedric', 'Dior', 'Frank', 'Bob'];
const fruits = ['pineapple', 'kiwi', 'banana', 'pear', 'cherry'];

const sortByLength = (arr) => arr.sort((a, b) => a.length - b.length);

const sortByLengthAsc = (arr) => arr.sort((a, b) => {
  if (a.length === b.length) {
    return a.localeCompare(b);
  }
  return a.length - b.length;
});

const sortFrom15 = (arr) => arr.sort((a, b) => Math.abs(a - 15) - Math.abs(b - 15));

const addAsterisk = (arr) => arr.map(item => `*${item}*`);

const between5And15 = (arr) => arr.filter(num => num >= 5 && num <= 15);

const isAllOdd = (arr) => arr.every(num => num % 2 !== 0);

const hasEven = (arr) => arr.some(num => num % 2 === 0);

const sigma = (arr) => arr.reduce((product, num) => product * num, 1);

console.log(sortByLength(names));
console.log(sortByLengthAsc(names));
console.log(sortFrom15(numbers));
console.log(addAsterisk(fruits));
console.log(between5And15(numbers));
console.log(isAllOdd(numbers));
console.log(hasEven(numbers));
console.log(sigma(numbers));
