const array = [
  {
    name: "array",
    tag: "#0",
    admin: [1],
  },
  {
    name: "array",
    tag: "#1",
    admin: [2],
  },
];
const array1 = array.find((arr) => {
  return arr.tag === "#1";
});

console.log(array1);
array1.admin.push(3);
const indexOf = array.indexOf(array1);
console.log(indexOf);
array.splice(indexOf, indexOf, array1);
console.log(array);
