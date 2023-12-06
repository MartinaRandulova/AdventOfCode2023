const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8');

let seedsArr = [];
const mappingsArr = [[], [], [], [], [], [], []];
const MappingClass = class {
  constructor(destination, source, range) {
    this.destination = destination;
    this.source = source;
    this.range = range;
  }
}

let mappingIndex = -2;

lines.split('\n').forEach((line, lineNumber) => {
  if (lineNumber === 0) {
    seedsArr = line.match(/\d+/g)
  }
  if (line.match(/[a-z]/g)) {
    mappingIndex++
  } else {
    const match = line.match(/\d+/g);
    if (match) {
      const mappingObj = new MappingClass(...line.match(/\d(\d?)*/g))
      mappingsArr[mappingIndex].push(mappingObj)
    }
  }

})
//console.log(mappingsArr)

const mappingFunction = (arrayWithSeeds) => {
  let locationArr = [];
  arrayWithSeeds.forEach(seed => {
    let source = Number(seed);
    let destination;
    for (let mappingSomethingToSomething = 0; mappingSomethingToSomething < mappingsArr.length; mappingSomethingToSomething++) {
      for (let mappingSame = 0; mappingSame < mappingsArr[mappingSomethingToSomething].length; mappingSame++) {
        let currentSource = Number(mappingsArr[mappingSomethingToSomething][mappingSame].source);
        let currentDestination = Number(mappingsArr[mappingSomethingToSomething][mappingSame].destination);
        let currentRange = Number(mappingsArr[mappingSomethingToSomething][mappingSame].range)
        if ((source >= currentSource) && (source < currentSource + currentRange)) {
          destination = source - currentSource + currentDestination;
          break;
        }
      }
      if (destination === undefined) {
        destination = source;
      }
      //console.log('seed' + seed + 'destination' + destination)
      source = destination;
    }
    locationArr.push(destination);
  })
  return locationArr;
}


console.log(`the lowest location is ${Math.min(...mappingFunction(seedsArr))}`)


//second part //
let seedRangesArr = [];
for (let i = 0; i < ((seedsArr.length + 1) / 2); i = i + 2) {
  for (let range = 0; range < Number(seedsArr[i + 1]); range++) {
    console.log('range' + range)
    seedRangesArr.push(Number(seedsArr[i]) + range)
  }
}

//console.log(seedRangesArr)
console.log(`the lowest location is ${Math.min(...mappingFunction(seedRangesArr))}`)