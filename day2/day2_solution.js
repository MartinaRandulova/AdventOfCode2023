const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

// 1. part - 12 red cubes, 13 green cubes, and 14 blue cubes
let sum = 0;

lines.split('\n').forEach(line => {
  let [gameId, games] = line.split(':');
  gameId = gameId.slice(5);
  let gamesArr = games.split(';');
  let violation = false;
  gamesArr.forEach(game => {
    let counts = game.split(',');
    counts.forEach(count => {
      const countColor = count.split(' ')[1];
      if ((count.includes('blue') && countColor > 14) | (count.includes('green') && countColor > 13) | (count.includes('red') && countColor > 12)) {
        violation = true
      }
    })
  })
  if (violation === false) {
    sum += Number(gameId);
  }
})

console.log(`solution to the first part is ${sum}`)

//2nd part - minimum necessary color counts
let sum2 = 0;
lines.split('\n').forEach(line => {
  let [gameId, games] = line.split(':');
  gameId = gameId.slice(5);
  let gamesArr = games.split(';');
  let gameObj = {
    blue: 0,
    red: 0,
    green: 0
  }
  gamesArr.forEach(game => {
    let counts = game.split(',');
    counts.forEach(count => {
      const color = count.split(' ')[2];
      const colorCount = Number(count.split(' ')[1]);
      if (colorCount > Number(gameObj[color])) {
        gameObj[color] = colorCount
      }
    })
  })
  sum2 += gameObj.blue * gameObj.red * gameObj.green
})

console.log(`solution to the second part is ${sum2}`)