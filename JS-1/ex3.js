let arr2 = [7, 9, 1, "a", "a", "f", 9, 4, 2, "d", "d"];

const removeDuplicates = (arr) => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

console.log(removeDuplicates(arr2));
