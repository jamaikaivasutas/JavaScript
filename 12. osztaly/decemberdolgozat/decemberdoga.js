//triangle

function isValidTriangle(a, b ,c) {
    if (a <= 0 || b <= 0 || c <= 0){
        return false;
    }
    return a + b > c && a + c > b && b + c > a;
}

console.log(isValidTriangle(1,2,2));

//digit tiers

function cutoffNumber(num) {
    const numStr = num.toString();
    const result = [];

    for (let i = 1; i <= numStr.length; i++){
        result.push(numStr.slice(0,i));
    }

    return result;
}

console.log(cutoffNumber(420));

//maskify

function maskify(str) {
    if (str.length <= 4) {
        return str;
    }

    const masked = "#".repeat(str.length - 4) + str.slice(-4)
    return masked
}

console.log(maskify("SIGMABOYSIGMABOOOOY"))