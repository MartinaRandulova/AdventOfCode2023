// Example
// Time:      7  15   30
// Distance:  9  40  200

// Input
// Time:        55     82     64     90
// Distance:   246   1441   1012   1111

const calculateMarginError = (time, distance) => {
  let count = 0;
  for (let i = 1; i < time; i++) {
    let movement = i * (time - i);
    if (Number(movement) > Number(distance)) {
      count++
    }
  }
  return count;
}

console.log(`Solution to the first part ${calculateMarginError(55, 246) * calculateMarginError(82, 1441) * calculateMarginError(64, 1012) * calculateMarginError(90, 1111)}`)

console.log(`Solution to the second part ${calculateMarginError(55826490, 246144110121111)}`)