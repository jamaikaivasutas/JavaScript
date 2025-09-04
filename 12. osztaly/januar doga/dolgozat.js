// Vowel Count

function getCount(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];

    let count = 0

    for (let char of str) {
        if (vowels.includes(char)) {
            count++
        }
    }
    return count;
}

console.log(getCount("hello world"));

//List filtering

function filter_list(l) {
    return l.filter(item => typeof item === 'number');
}

console.log(filter_list([1,2, 'a', 'b']));

//All unique
function hasUniqueCharacters(str) {
    const charSet = new Set();

    for (let char of str) {
        if (charSet.has(char)){
            return false;
        }

        charSet.add(char);
    }

    return true;
}

console.log(hasUniqueCharacters("abccdef"))

//find the divisors


function divisors(n) {
    const result = [];

    for (let i = 2; i <= Math.floor(n/2); i++) {
        if (n % i === 0) {
            result.push(i);
        }
    }

    return result.length > 0 ? result : '${n} is prime';
}

console.log(divisors(12));
console.log(divisors(14));