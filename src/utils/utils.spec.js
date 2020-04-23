import {
  rotateLeft,
  rotateRight,
  getRandomly2or4,
  addSameValues,
  sumMatrixValues,
  getHighestTile,
  addRandomValueToMatrix,
  moveTiles,
} from "./utils";

const numberOfNotZero = (matrix) => matrix
  .flat()
  .reduce((acc, v) => ((v !== 0) ? acc + 1 : acc), 0);


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

describe("generate random 2 or 4", () => {
  it("get 2", () => {
    const shouldBe2 = getRandomly2or4(-1);
    expect(shouldBe2).toEqual(2);
  });
  it("get 4", () => {
    const shouldBe4 = getRandomly2or4(10);
    expect(shouldBe4).toEqual(4);
  });
});

describe("add same values in a row", () => {
  it("add 2 values", () => {
    const row = [0, 0, 0, 0];
    const value = addSameValues(row);

    expect(value).toStrictEqual([0, 0, 0, 0]);
  });

  it("add 2 values", () => {
    const row = [0, 0, 2, 2];
    const value = addSameValues(row);

    expect(value).toStrictEqual([0, 0, 4, 0]);
  });

  it("add 4 values", () => {
    const row = [2, 2, 2, 2];
    const value = addSameValues(row);

    expect(value).toStrictEqual([4, 0, 4, 0]);
  });

  it("add 2 values separated", () => {
    const row = [2, 0, 2, 0];
    const value = addSameValues(row);

    expect(value).toStrictEqual([4, 0, 0, 0]);
  });

  it("add only the 2 values but not the other one", () => {
    const row = [4, 2, 0, 2];
    const value = addSameValues(row);

    expect(value).toStrictEqual([4, 4, 0, 0]);
  });

  it("doesnt add values", () => {
    const row = [1, 0, 2, 0];
    const value = addSameValues(row);

    expect(value).toStrictEqual([1, 0, 2, 0]);
  });
});

describe("add matrix values", () => {
  it("add 2x2 matrix", () => {
    const matrix = [
      [2, 2],
      [2, 2],
    ];
    const value = sumMatrixValues(matrix);
    expect(value).toStrictEqual(8);
  });
});

describe("get highest tile", () => {
  it("get the highest value", () => {
    const matrix = [
      [2, 0],
      [2, 16],
    ];
    const value = getHighestTile(matrix);
    expect(value).toStrictEqual(16);
  });
});

describe("addRandomValueToMatrix", () => {
  it("only one value changed", () => {
    const matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const value = addRandomValueToMatrix(matrix, [0, 1], [0, 1]);
    const notZero = numberOfNotZero(value);
    expect(notZero).toStrictEqual(1);
  });

  it("only one value changed, in the correct coords", () => {
    const matrix = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const value = addRandomValueToMatrix(matrix, [0, 0], [0, 0]);
    const notZero = numberOfNotZero(value);
    const newVal = value[0][0];

    expect(notZero).toStrictEqual(1);
    expect(newVal === 2 || newVal === 4).toBeTruthy();
  });
});

describe("moveTiles", () => {
  it("move diagonal left", () => {
    const matrix = [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ];
    const value = moveTiles(matrix, "left");
    expect(value).toStrictEqual([
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
    ]);
  });
  it("move diagonal right", () => {
    const matrix = [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ];
    const value = moveTiles(matrix, "right");
    expect(value).toStrictEqual([
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
      [0, 0, 0, 2],
    ]);
  });

  it("move diagonal up", () => {
    const matrix = [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ];
    const value = moveTiles(matrix, "up");
    expect(value).toStrictEqual([
      [2, 2, 2, 2],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  it("move diagonal down", () => {
    const matrix = [
      [2, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 0],
      [0, 0, 0, 2],
    ];
    const value = moveTiles(matrix, "down");
    expect(value).toStrictEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 2],
    ]);
  });
});
