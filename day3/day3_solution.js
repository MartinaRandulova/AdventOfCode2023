const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

let sum = 0;
let sumGear = 0;
let grid = Array.from(Array(142).fill('.'), () => new Array(142).fill('.'))

const SuspiciousPartEngine = class {
  constructor(number, lineNumber, positionxstart) {
    this.number = number;
    this.line = lineNumber;
    this.positionxstart = positionxstart;
    this.partNumber = false;
  }
}

const SuspiciousStars = class {
  constructor(lineNumber, position, number) {
    this.id = String(lineNumber) + '-' + String(position)
    this.adjacent = [];
    this.addAdjacentNumber(number)
  }

  addAdjacentNumber = (number) => {
    this.adjacent.push(number)
  }
}

const suspiciousPartEngineArr = [];
const suspiciousStarsArr = [];

const linesArr = lines.split('\n');

linesArr.forEach((line, lineNumber) => {
  const regexpNumbers = /\d\d?\d?/g;
  let match;
  while ((match = regexpNumbers.exec(line)) !== null) {
    suspiciousPartEngineArr.push(new SuspiciousPartEngine(match[0], lineNumber + 1, match.index + 1));
  }

  line.split('').forEach((rowEl, rowNumber) => {
    grid[lineNumber + 1][rowNumber + 1] = rowEl;
  })
})

const checkSymbol = (object, y, x) => {
  const symbol = grid[object.line + y][object.positionxstart + x];
  if (symbol !== '.' && isNaN(symbol)) {
    object.partNumber = true;
    if (symbol === '*') {
      const starAlreadySeen = suspiciousStarsArr.filter(star => star.id === String(object.line + y) + '-' + String(object.positionxstart + x))
      if (starAlreadySeen[0]) {
        starAlreadySeen[0].addAdjacentNumber(object.number);
      } else {
        suspiciousStarsArr.push(new SuspiciousStars(object.line + y, object.positionxstart + x, object.number));
      }
    }
  }
}

for (let partNumberIndex = 0; partNumberIndex < suspiciousPartEngineArr.length; partNumberIndex++) {
  const numberObject = suspiciousPartEngineArr[partNumberIndex];
  checkSymbol(numberObject, 0, -1);
  checkSymbol(numberObject, -1, -1);
  checkSymbol(numberObject, -1, 0);
  checkSymbol(numberObject, -1, 1);
  checkSymbol(numberObject, 1, -1);
  checkSymbol(numberObject, 1, 0);
  checkSymbol(numberObject, 1, 1);
  if (Number(numberObject.number) > 9 && numberObject.partNumber === false) {
    checkSymbol(numberObject, -1, 2);
    checkSymbol(numberObject, 1, 2);
  }
  if ((Number(numberObject.number) <= 9) && numberObject.partNumber === false) {
    checkSymbol(numberObject, 0, 1);
  }
  if ((Number(numberObject.number) <= 99) && numberObject.partNumber === false) {
    checkSymbol(numberObject, 0, 2);
  }
  if (Number(numberObject.number) > 99 && numberObject.partNumber === false) {
    checkSymbol(numberObject, -1, 3);
    checkSymbol(numberObject, 1, 3);
    checkSymbol(numberObject, 0, 3);
  }

  if (numberObject.partNumber) {
    sum += Number(numberObject.number);
  }
}

console.log(`solution to the first part is ${sum}`)

//2nd part
console.log(suspiciousStarsArr)
suspiciousStarsArr.forEach(starObj => {
  if (starObj.adjacent.length === 2) {
    sumGear += Number(starObj.adjacent[0]) * Number(starObj.adjacent[1]);
  }
})
console.log(`solution to the first part is ${sumGear}`)
//15627729 is too low
//84579863 is too low
//84584891