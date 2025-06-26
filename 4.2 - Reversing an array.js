/*
Arrays have a reverse method that changes the array by inverting the order in
which its elements appear. For this exercise, write two functions, reverseArray
and reverseArrayInPlace. The first, reverseArray, should take an array as its
argument and produce a new array that has the same elements in the inverse
order. The second, reverseArrayInPlace, should do what the reverse method
does: modify the array given as its argument by reversing its elements. Neither
may use the standard reverse method.
Thinking back to the notes about side effects and pure functions in the
previous chapter, which variant do you expect to be useful in more situations?
Which one runs faster?
*/


const reverseArray = (array) => {
  const reversedArray = []
  for (let i = array.length - 1; i >= 0; i--) {
    reversedArray.push(array[i]);
  }
  return reversedArray;
}

const reverseArrayInPlace = (array) => {
  let a;
  for (let i = 0; i < array.length/2; i++) {
    a = array[array.length -1 -i];
    array[array.length -1 -i] = array[i];
    array[i] = a;
  }
  return true;
}

const reversedArray1 = reverseArray([1, 2, 3, 4, 5])
const array= [1, 2, 3, 4, 5]
reverseArrayInPlace(array);
console.log("reversedArray1: ", reversedArray1);
console.log("reversedArray2: ", array)
