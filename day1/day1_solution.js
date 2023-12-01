const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

const firstpart = false;

if (firstpart) {
  let calibrationValuesSum = 0;
  lines.split('\n').forEach((line) => {
    const numbers = (line.match(/\d/g));
    calibrationValuesSum += Number(numbers[0] + numbers[numbers.length - 1])
  });
  console.log(calibrationValuesSum)
} else {
  let calibrationValuesSum2 = 0;
  const numberMapper = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
  }
  lines.split('\n').forEach((line) => {
    const numbers = Array.from(line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|[1-9]))/g), num => num[1])
    let first = numbers[0];
    let last = numbers[numbers.length - 1]
    if (isNaN(Number(first))) {
      first = numberMapper[first]
    }
    if (isNaN(Number(last))) {
      last = numberMapper[last]
    }
    calibrationValuesSum2 += Number(first + last)
  });
  console.log(calibrationValuesSum2)
}