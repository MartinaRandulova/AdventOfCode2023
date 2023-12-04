const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

let sum = 0;
let sumOfAll = 0;
let grid = Array.from(Array(142).fill('.'), () => new Array(142).fill('.'))

const SuspiciousPartEngine = class {
  constructor(number, lineNumber, positionxstart) {
    this.number = number;
    this.line = lineNumber;
    this.positionxstart = positionxstart;
    this.partNumber = false;
  }
}

const suspiciousPartEngineArr = [];

const linesArr = lines.split('\n');

linesArr.forEach((line, lineNumber) => {
  const regexp = /\d\d?\d?/g;
  let match;
  while ((match = regexp.exec(line)) !== null) {
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

  if ((Number(numberObject.number) <= 9) && numberObject.partNumber === false) {
    checkSymbol(numberObject, 0, 1);
  } else if ((Number(numberObject.number) <= 99) && numberObject.partNumber === false) {
    checkSymbol(numberObject, -1, 2);
    checkSymbol(numberObject, 0, 2);
    checkSymbol(numberObject, 1, 2);
  } else if (Number(numberObject.number) > 99 && numberObject.partNumber === false) {
    checkSymbol(numberObject, -1, 2);
    checkSymbol(numberObject, -1, 3);
    checkSymbol(numberObject, 1, 2);
    checkSymbol(numberObject, 1, 3);
    checkSymbol(numberObject, 0, 3);
  }

  if (numberObject.partNumber) {
    sum += Number(numberObject.number);
  } else {
    sumOfAll -= Number(numberObject.number);
  }
}

console.log(`solution to the first part is ${sum}`)

//2nd part
