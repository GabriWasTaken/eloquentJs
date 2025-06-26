/*
Write a range function that takes two arguments, start and end, and returns
an array containing all the numbers from start up to and including end.
Next, write a sum function that takes an array of numbers and returns the
sum of these numbers. Run the example program and see whether it does
indeed return 55.
As a bonus assignment, modify your range function to take an optional third
argument that indicates the “step” value used when building the array. If no
step is given, the elements should go up by increments of one, corresponding
to the old behavior. The function call range(1, 10, 2) should return [1,
3, 5, 7, 9]. Make sure this also works with negative step values so that
range(5, 2, -1) produces [5, 4, 3, 2].
*/


const range = ({start, end, step}) => {
  const ranges = [];
  for (let i = start; step < 0 ? i >= end : i <= end; i = i + step) {
    ranges.push(i);
  }
  return ranges;
}

const sumRanges = (ranges) => {
  if (ranges?.length > 0) {
    return ranges?.reduce((prev, current) => prev + current)
  } else return -1
}

const ranges = range({start: 5, end: 2, step: -1});
const sum = sumRanges(ranges);
console.log("ranges: ", ranges, "sum: ", sum);
