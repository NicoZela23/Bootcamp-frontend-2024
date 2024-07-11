let arr1 = [3, "c", "c", "a", 2, 3, "c", 3, "c", 2, 4, 9, 9];

const leastCommon = (arr) => {
  const count = arr.reduce((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(count).sort((a, b) => a[1] - b[1])[0][0];
};

console.log(leastCommon(arr1));
