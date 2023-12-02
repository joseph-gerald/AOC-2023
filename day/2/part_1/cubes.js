const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'cubes.data');

data = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`.split("\n").filter(x => x != "");

class Set {
    constructor(data) {
        this.cubes = data.map(x => new Cube(x));
    }
}

class Cube {
    constructor(data) {
        const split = data.split(" ");

        // 6 red
        this.count = split[0];
        this.colour = split[1];
    }
}

class Game {
    constructor(data) {
        data = data.split(": ");
        data[0] = data[0].split(" ")[1];
        data[1] = data[1].split("; ").map(x => x.split(", "));

        this.id = data[0];
        this.sets = data[1].map(x => new Set(x));
    }

    possible(bag) {
        for (const cubes of this.sets.map(x => x.cubes)) {
            for (const cube of cubes) {
                const max = bag[cube.colour];
                if (cube.count > max) {
                    return false;
                }
            }
        }
        
        return true;
    }
}

const bag = {
    red: 12,
    green: 13,
    blue: 14
};

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    const valid = [];
    
    for (const game of data.split("\n")) {
        const gameObj = new Game(game);
    
        if(gameObj.possible(bag)) {
            valid.push(gameObj);
        }
    }
    
    const idSum = valid.map(x => parseInt(x.id)).reduce((x,y) => x+y);

    console.log("Sum",idSum)
});