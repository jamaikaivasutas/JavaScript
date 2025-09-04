//1. feladat
let a = 10.4;
let b = 13.5;
let c = 8.2;

let volume = a * b * c;
let surfaceArea = (a * b + b * c + a * c) * 2;

document.getElementById("volume").innerHTML = "Térfogat: " + volume.toFixed(2);
document.getElementById("surfaceArea").innerHTML = "Felület: " + surfaceArea.toFixed(2);

//2. feladat
let weight = 81.2;
let height = 1.78;

let bmi = weight / (height * height);
document.getElementById("bmi").innerHTML = "BMI: " + bmi.toFixed(2);

//3. feladat
let year = 2024;

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    } else if (year % 100 === 0) {
        return false;
    } else if (year % 4 === 0) {
        return true;
    } else {
        return false;
    }
}

let leapYear = isLeapYear(year) ? year + " szökőév." : year + " nem szökőév.";
document.getElementById("leapYear").innerHTML = leapYear;

//4. feladat
let string = 'apple';

let forLoopString = '';

for (let i = 0; i < string.length; i++) {
    forLoopString += string[i] + '<br>';
}

document.getElementById("forLoopString").innerHTML = forLoopString;

//5. feladat
let number = 268;
let numberString = number.toString();
let sum = 0;
let count = numberString.length;

for (let i = 0; i < count; i++) {
    sum += parseInt(numberString[i]);
}

let average = sum / count;

document.getElementById("digitAverage").innerHTML = "A számjegyek átlaga: " + average;

//6. feladat
let string2 = 'ihatejs123';
let output = '';
let letterRegex = /^[a-zA-Z]$/;

for (let i = 0; i < string2.length; i++) {
    if (!letterRegex.test(string2[i])) {
        break;
    }

    output += string2[i] + '<br>'; 
}

document.getElementById("printLetters").innerHTML = output;

//7. feladat
let number2 = 10;
let output2 = '';

while (number2 <= 30) {
    output2 += number2 + ': ';
    let divisors = [];
    let i = 1;
    while (i <= number2) {
        if (number2 % i === 0) {
            divisors.push(i); 
        }
        i++;
    }
    output2 += divisors.join(', ') + ',<br>';
    number2++;
}

document.getElementById("divisors").innerHTML = output2;

//8. feladat
 let currentHours = 14;
 let currentMinutes = 34;
 let currentSeconds = 42;

 const totalSecondsInDay = 24 * 60 * 60;

 let secondsPassed = (currentHours * 60 * 60) + (currentMinutes * 60) + currentSeconds;

 let remainingSeconds = totalSecondsInDay - secondsPassed;

 document.getElementById("remainingSeconds").innerHTML = "Hátralévő másodpercek a napból: " + remainingSeconds;

 //9. feladat
let score = 80;
score = Number(score);
let letterGrade = '';

if (score >= 90 && score <= 100) {
    letterGrade = 'A';
} else if (score >= 80 && score < 90) {
    letterGrade = 'B';
} else if (score >= 70 && score < 80) {
    letterGrade = 'C';
} else if (score >= 60 && score < 70) {
    letterGrade = 'D';
} else if (score >= 0 && score < 60) {
    letterGrade = 'F';
} else {
    letterGrade = 'Érvénytelen pontszám';
}

document.getElementById("grade").innerHTML = "Az osztályzatod: " + letterGrade;

//10. feladat
let player1Choice = 1;
let player2Choice = 2;

let result = '';

if (player1Choice === player2Choice) {
    result = "A játék döntetlen.";
} else if (
    (player1Choice === 1 && player2Choice === 3) || 
    (player1Choice === 2 && player2Choice === 1) ||
    (player1Choice === 3 && player2Choice === 2)   
) {
    result = "Az első játékos nyert.";
} else {
    result = "A második játékos nyert.";
}

document.getElementById("rockPaperScissors").innerHTML = result;

//11. feladat
let number3 = 3;
let factorial = 1;
for (let i = 1; i <= number3; i++) {
    factorial *= i;
}

document.getElementById("factorial").innerHTML = number3 + " faktoriálisa: " + factorial;

//12. feladat X

//13. feladat
let output3 = '';
let count2 = 0;
let skipCount = 1;

for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0) { 
        count2++;
        if (count2 === skipCount) {
            skipCount++;
            continue;
        }
    }
    output3 += i + ', ';
}
document.getElementById("output").textContent = output3.slice(0, -2);

//14. feladat
let output4 = '';
const limit = 100;

for (let i = 1; i <= limit; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        output4 += 'fizzbuzz, ';
    } else if (i % 3 === 0) {
        output4 += 'fizz, ';
    } else if (i % 5 === 0) {
        output4 += 'buzz, ';
    } else {
        output4 += i + ', ';
    }
}

document.getElementById("output2").textContent = output4.slice(0, -2);
