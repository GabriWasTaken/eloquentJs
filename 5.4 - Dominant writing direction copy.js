/*
Write a function that computes the dominant writing direction in a string of
text. Remember that each script object has a direction property that can be
"ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).
The dominant direction is the direction of a majority of the characters that
have a script associated with them. The characterScript and countBy func-
tions defined earlier in the chapter are probably useful here
*/

require('./scripts.js')

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
    return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  // Your code here.
  let ltr = 0;
  let rtl = 0;
  for (char of text) {
    if(characterScript(char.codePointAt(0))?.direction === 'ltr') ltr++;
    if(characterScript(char.codePointAt(0))?.direction === 'rtl') rtl++;
  }
  if (ltr > rtl) return "ltr"
  return "rtl"
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl