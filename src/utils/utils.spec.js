import {
  rotateLeft,
  rotateRight,
} from "./utils";

const printMatrix = (arr) => {
  let arrText = "";

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      arrText += `${arr[i][j]} `;
    }
    arrText += "\n";
  }
  console.log(arrText);
};

describe("rotate matrix", () => {
  it("rotate matrix to left", () => {
    const matrix = [
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [8, 7, 6, 5],
      [8, 7, 6, 5],
    ];

    const expected = [
      [1, 1, 5, 5],
      [2, 2, 6, 6],
      [3, 3, 7, 7],
      [4, 4, 8, 8],
    ];

    const left = rotateLeft(matrix);
    expect(left).toStrictEqual(expected);
  });

  it("rotate matrix to right", () => {
    const matrix = [
      [4, 3, 2, 1],
      [4, 3, 2, 1],
      [8, 7, 6, 5],
      [8, 7, 6, 5],
    ];

    const expected = [
      [8, 8, 4, 4],
      [7, 7, 3, 3],
      [6, 6, 2, 2],
      [5, 5, 1, 1],
    ];

    const right = rotateRight(matrix);
    expect(right).toStrictEqual(expected);
  });

  it("rotate matrix to right and left", () => {
    const matrix = [
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 5],
      [0, 0, 0, 5],
    ];

    const right = rotateRight(matrix);
    const left = rotateLeft(right);

    expect(left).toStrictEqual(matrix);
  });

  it("rotate matrix to left and right", () => {
    const matrix = [
      [0, 0, 0, 1],
      [0, 0, 1, 1],
      [0, 5, 5, 5],
      [5, 5, 5, 5],
    ];

    const left = rotateLeft(matrix);
    const right = rotateRight(left);

    expect(right).toStrictEqual(matrix);
  });

  it("rotate matrix to the left 4 times", () => {
    const matrix = [
      [1, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 3, 0],
      [0, 0, 0, 4],
    ];

    let left = rotateLeft(matrix);
    left = rotateLeft(left);
    left = rotateLeft(left);
    left = rotateLeft(left);

    expect(left).toStrictEqual(matrix);
  });

  it("rotate matrix to the right 4 times", () => {
    const matrix = [
      [0, 0, 0, 1],
      [0, 0, 2, 0],
      [0, 3, 0, 0],
      [4, 0, 0, 0],
    ];

    let right = rotateRight(matrix);
    right = rotateRight(right);
    right = rotateRight(right);
    right = rotateRight(right);

    expect(right).toStrictEqual(matrix);
  });
});
