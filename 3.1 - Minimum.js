/*
The previous chapter introduced the standard function Math.min that returns
its smallest argument. We can write a function like that ourselves now. Define
the function min that takes two arguments and returns their minimum.
*/

const minimum = (a, b) => {
  if (a < b) return a;
  else return b;
}

console.log(minimum(3, 3));
