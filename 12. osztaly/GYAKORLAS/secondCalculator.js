import input from './input.js'

let currentHours = parseInt(await input("hany ora van "));
let currentMinutes = parseInt(await input("hany perc "));
let currentSeconds = parseInt(await input("hany masodperc "));

let currentAllSeconds = (currentHours * 3600) + (currentMinutes * 60) + currentSeconds;
console.log(currentAllSeconds)
let secondsLeft = 86400 - currentAllSeconds;

console.log(`${secondsLeft} masodperc van hatra a napbol`)




