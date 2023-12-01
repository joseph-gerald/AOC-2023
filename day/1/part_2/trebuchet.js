const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'trebuchet.data');

function sum(numbers) {
    return numbers.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
    );
}

function parseInteger(text, list) {
    const names = "one,two,three,four,five,six,seven,eight,nine".split(",");

    let index = 1;
    for (const name of names) {
        if (text.indexOf(name) != -1) {
            // Only first and last items are important

            list[text.indexOf(name)] = String(index);

            list[text.lastIndexOf(name)] = String(index);
        }
        index++;
    }
}

function parseValue(text) {
    let numbers = [];

    let charIndex = -1;

    for (const char of text.split("")) {
        charIndex++;

        if (isNaN(parseInt(char))) continue;

        numbers[charIndex] = char;
    }
    
    parseInteger(text, numbers)

    numbers = numbers.join('').split(''); // remove empty items

    return parseInt(numbers[0] + numbers[numbers.length - 1]);
}

function parseValues(texts) {
    const values = [];

    for (const text of texts) {
        values.push(parseValue(text))
    }

    return values;
}

const test = (data) => {
    const values = parseValues(data);

    console.log(values)
    console.log(sum(values))
}

/*
test([
    "two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen",
]);
*/

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    const values = parseValues(data.split("\n"));
    console.log(sum(values)); // answer
});
