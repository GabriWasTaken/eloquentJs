/*
Make the Group class from the previous exercise iterable. Refer to the section
about the iterator interface earlier in the chapter if you aren’t clear on the
exact form of the interface anymore.
If you used an array to represent the group’s members, don’t just return the
iterator created by calling the Symbol.iterator method on the array. That
would work, but it defeats the purpose of this exercise.
It is okay if your iterator behaves strangely when the group is modified during
iteration.
*/

class Group {
  #values = []
  constructor() {
  }
  
  has(value) {
    return this.#values.includes(value)
  }

  add(value) {
    if (!this.has(value)) this.#values.push(value);
  }

  delete(value) {
    this.#values = this.#values.filter((v) => v !== value);
  }

  static from(array) {
    const group = new Group();
    array.forEach((value) => {
      group.add(value);
    })
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this.#values);
  }
}

class GroupIterator {
  #values;
  #position;

  constructor(values) {
    this.#values = values;
    this.#position = 0;
  }

  next() {
    if (this.#position >= this.#values.length) {
      return {done: true};
    } else {
      let result = {
        value: this.#values[this.#position],
        done: false
      };
      this.#position++;
      return result;
    }
  }
}


for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}