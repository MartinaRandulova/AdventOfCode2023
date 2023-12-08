const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

let instructions = [];
const codes = [];
const lefts = [];
const rights = [];

lines.split('\n').forEach((line, lineIndex) => {
  if (lineIndex === 0) {
    instructions = line.split('')
  } else {
    const [code, left, right] = line.match(/\w\w\w/g);
    codes.push(code);
    lefts.push(left);
    rights.push(right);
  }

})

let count = 0;
let currentCode = 'AAA';
let instructionCount = 0;

while (currentCode !== 'ZZZ') {
  let currentIndex = codes.findIndex(el => el === currentCode);
  if (instructions[instructionCount] === undefined) {
    instructionCount = 0;
  }
  if (instructions[instructionCount] === 'L') {
    currentCode = lefts[currentIndex]
  } else {
    currentCode = rights[currentIndex]
  }
  count++
  instructionCount++
}

console.log(`${count} steps are required to reach ZZZ`)
