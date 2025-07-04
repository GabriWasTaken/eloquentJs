/*
Use the reduce method in combination with the concat method to “flatten”
an array of arrays into a single array that has all the elements of the original
arrays.
*/

const flatten = (array) => {
  return array.reduce((acc, current, index) => acc.concat(current), []);
}

array = [[1,2,3],[4,5,6]];

console.log(flatten(array));
