const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'trebuchet.data');

function sum(numbers) {
    return numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
}

function parseValue(text) {
    const numbers = [];

    for (const char of text.split("")) {
        if (isNaN(parseInt(char))) continue;

        numbers.push(char)
    }

    return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

function parseValues(texts) {
    const values = [];

    for (const text of texts) {
        values.push(parseValue(text))
    }

    return values;
}

const test = () => {
    const values = parseValues([
        "1abc2",
        "pqr3stu8vwx",
        "a1b2c3d4e5f",
        "treb7uchet"
    ]);

    console.log(values)
    console.log(sum(values))
}

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    const values = parseValues(data.split("\n"));
    console.log(sum(values)); // answer
});
