const { sum, multiply, subtraction } = require("./sum");

test("add 2 and 3 their result 5 ", () => {
  expect(sum(2, 3)).toBe(5);
});

test("multiply 2 or 3 final result 6", () => {
  expect(multiply(2, 3)).toBe(6);
});

test("subtraction 2 or 3 final result -1", () => {
  expect(subtraction(3, 2)).toBe(1);
});
