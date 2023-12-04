const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

let sum = 0;

let winningArr = [];
let deckArr = [];
let scratchNumbersArr = Array(206).fill(1);

const linesArr = lines.split('\n');

linesArr.forEach((line, lineNumber) => {
  const [winning, deck] = line.substring(10).split('|');
  winningArr = winning.match(/\d\d?/g)
  deckArr = deck.match(/\d\d?/g)
  let cardScore = 0;
  let cardScore2 = 0;
  winningArr.forEach(number => {
    if (deckArr.includes(number)) {
      cardScore2++
      scratchNumbersArr[lineNumber + cardScore2] += scratchNumbersArr[lineNumber];
      if (cardScore === 0) {
        cardScore = 1;
      } else {
        cardScore *= 2;
      }
    }
  })
  sum += cardScore;
})
console.log(`solution to the first part is ${sum}`)
//2nd part
let sum2 = scratchNumbersArr.reduce((a, b) => a + b)
console.log(`solution to the second part is ${sum2}`)
