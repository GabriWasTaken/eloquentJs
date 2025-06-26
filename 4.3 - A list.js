/*
A list
As generic blobs of values, objects can be used to build all sorts of data struc-
tures. A common data structure is the list (not to be confused with arrays).
A list is a nested set of objects, with the first object holding a reference to the
second, the second to the third, and so on:
let list = {
value: 1,
rest: {
value: 2,
rest: {
value: 3,
rest: null
}
}
};
The resulting objects form a chain, as shown in the following diagram:value: 1
rest: value: 2
rest: value: 3
rest: null
A nice thing about lists is that they can share parts of their structure. For
example, if I create two new values {value: 0, rest: list} and {value: -1,
rest: list} (with list referring to the binding defined earlier), they are both
independent lists, but they share the structure that makes up their last three
elements. The original list is also still a valid three-element list.
Write a function arrayToList that builds up a list structure like the one
shown when given [1, 2, 3] as argument. Also write a listToArray function
that produces an array from a list. Add the helper functions prepend, which
takes an element and a list and creates a new list that adds the element to the
front of the input list, and nth, which takes a list and a number and returns
the element at the given position in the list (with zero referring to the first
element) or undefined when there is no such element.
If you haven’t already, also write a recursive version of nth.
*/

const prepend = (element, list) => {
  return { value: element, rest: list }
}

const nth = (list, position) => {
  if(!list) return undefined;
  if (position === 0) {
    return list.value
  } else {
    return nth(list.rest, position - 1);
  }
  /*
  for (let i = 0; i < position; i++) {
    innerList = {...innerList.rest};
  }
  return innerList?.value || undefined
  */
}

const arrayToList = (array) => {
  let list = {};
  for (let i = array.length-1; i >= 0; i--) {
    list = {value: array[i], rest: {...list}};
    //console.log(list)
  }
  //console.log(nth(list, 1));
  /**
   * //recursive version
   const arrayToFill = []
   listToArray(arrayToFill, list);
   console.log("arrayToFill: ", arrayToFill);
   */
  const arr = listToArray(list);
  console.log("arr", arr)
}

const listToArray = (list) => {
  const array = []
  for(let i = list; i.value ; i = i.rest) {
    array.push(i.value);
  }
  return array;
}

/*
//recursive version 
const listToArray = (array, list) => {
  console.log("list: ", list);
  if (!list.value) {
    return array;
  } else {
    array.push(list.value);
    return listToArray(array, list.rest);
  }
}
*/

arrayToList([1, 2, 3]);