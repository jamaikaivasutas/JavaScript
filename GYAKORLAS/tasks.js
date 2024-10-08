import input from './input.js'

let weight = await input("kérem adja meg a testsúlyát! ");
let height = await input("Kérem adja meg a magasságát! ");
let bmi = weight/ (height * height)

console.log(`Az ön BMI-je: ${bmi} `)