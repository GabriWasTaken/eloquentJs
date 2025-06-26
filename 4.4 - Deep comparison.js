/*
The == operator compares objects by identity, but sometimes you’d prefer to
compare the values of their actual properties.
Write a function deepEqual that takes two values and returns true only
if they are the same value or are objects with the same properties, where
the values of the properties are equal when compared with a recursive call to
deepEqual.
To find out whether values should be compared directly (using the === op-
erator for that) or have their properties compared, you can use the typeof
operator. If it produces "object" for both values, you should do a deep com-
parison. But you have to take one silly exception into account: because of a
historical accident, typeof null also produces "object".
The Object.keys function will be useful when you need to go over the prop-
erties of objects to compare them.
*/

const deepEqual = (value1, value2) => {
  if (!value1 || !value2) {
    return false;
  }
  if (typeof value1 === 'object' && typeof value2 === "object") {
    const value1Keys = Object.keys(value1);
    const value2Keys = Object.keys(value2);
    if(value1Keys.length !== value2Keys.length) return false;
    for (key of value1Keys) {
      if (!Object.hasOwn(value2, key)){
        return false
      } else {
        if(!deepEqual(value1[key], value2[key])){
          return false
        } else {
          return true;
        }
      }
    }
  } else {
    return value1 === value2;
  }
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true