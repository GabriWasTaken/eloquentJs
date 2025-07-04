/*
Arrays also have an every method analogous to the some method. This method
returns true when the given function returns true for every element in the array.
In a way, some is a version of the || operator that acts on arrays, and every is
like the && operator.
Implement every as a function that takes an array and a predicate function
as parameters. Write two versions, one using a loop and one using the some
method.
*/

const everyWithLoop = (array, predicate) => {
  for (let element of array) {
    if(!predicate(element)) return false;
  }
  return true;
}

const everyWithSome = (array, predicate) => {
  if (array.some((element) => !predicate(element))) return false
  return true;
}

console.log(everyWithLoop([1, 3, 5], n => n < 10));
// → true
console.log(everyWithLoop([2, 4, 16], n => n < 10));
// → false
console.log(everyWithLoop([], n => n < 10));
// → true

console.log(everyWithSome([1, 3, 5], n => n < 10));
// → true
console.log(everyWithSome([2, 4, 16], n => n < 10));
// → false
console.log(everyWithSome([], n => n < 10));
// → true