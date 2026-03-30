import { subtraction } from "../utils/math";

describe("subtraction()", () => {

  test("subtracts two positive numbers", () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test("handles string numbers", () => {
    expect(subtraction("7", "2")).toBe(5);
  });

  test("negative result", () => {
    expect(subtraction(3, 8)).toBe(-5);
  });

  test("zero result", () => {
    expect(subtraction(5, 5)).toBe(0);
  });

});
