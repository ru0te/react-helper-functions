import { useState } from 'react';

export function useArray(arr) {
  const [array, setArray] = useState(arr);

  function push(value) {
    setArray((prevArray) => [...prevArray, value]);
  }

  function replace(index, value) {
    setArray((prevArray) => {
      const updatedArray = [...prevArray];
      updatedArray[index] = value;
      return updatedArray;
    });
  }

  function filter(cb) {
    setArray((prevArray) => prevArray.filter(cb));
  }

  function remove(index) {
    setArray((prevArray) => prevArray.filter((_, i) => i !== index));
  }

  function clear() {
    setArray([]);
  }

  function reset() {
    setArray(arr);
  }

  return { array, set: setArray, push, replace, filter, remove, clear, reset };
}
