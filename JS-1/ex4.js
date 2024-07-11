let data = [
  ["The", "little", "horse"],
  ["Plane", "over", "the", "ocean"],
  ["Chocolate", "ice", "cream", "is", "awesome"],
  ["this", "is", "a", "long", "sentence"],
];

const concatArrays = (arr) => {
  const concatenatedStrings = arr.map((innerArr) => innerArr.join(" "));
  return concatenatedStrings.reduce((acc, val) => acc + " " + val, "");
};

console.log(concatArrays(data));
