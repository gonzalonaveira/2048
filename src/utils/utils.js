import _ from "lodash";
import { FOUR_PROBABILITY } from "../config";

/**
 * Rotate matrix to the left
 * @param matrix
 * @returns *[] matrix
 */
const rotateLeft = (matrix) => Object.keys(matrix[0])
  .reverse()
  .map((i) => matrix.map((row) => row[i]));

/**
 * Rotate matrix to the right
 * @param matrix
 * @returns *[] matrix
 */
const rotateRight = (matrix) => Object.keys(matrix[0])
  .map((i) => matrix.map((row) => row[i]).reverse());

/**
 * Generate either a 2 or a 4 based on the configured probability for the 4
 * @param fourProbability: probability of getting a 4
 * @returns {number}
 */
const getRandomly2or4 = (fourProbability) => ((Math.random() > fourProbability) ? 2 : 4);

/**
 * Add the same values, but only add the values once.
 * Returns the modified row and a boolean value representing if
 * the original row changed
 * @param row
 * @returns {{row: *, needToMove: *}}
 */
const addSameValues = (row) => {
  const len = row.length;
  let col = -1;

  for (let x = 0; x < len; x++) {
    if (row[x] !== 0) {
      if (col === -1 || row[col] !== row[x]) {
        // If we dont have a current col
        // If the number are not same we can't add them
        col = x;
      } else if (row[col] === row[x]) {
        // sum same numbers
        row[col] += row[x];
        row[x] = 0;
        col = -1;
      }
    }
  }
  return row;
};

/**
 * Add a random value (2 || 4) in an available tile of the board
 * @param matrix: board
 * @param minMaxX: min / max value of the X axis
 * @param minMaxY: min / max value of the Y axis
 * @returns {*}
 */
const addRandomValueToMatrix = (matrix, minMaxX, minMaxY) => {
  const [minX, maxX] = minMaxY;
  const [minY, maxY] = minMaxX;

  const validCoords = [];
  // Get the possible locations for a new number
  // in the half of the board we are allow to insert a new item
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      if (matrix[i][j] === 0) {
        validCoords.push([i, j]);
      }
    }
  }
  if (validCoords.length > 0) {
    const randomCoord = _.random(0, (validCoords.length - 1));
    const [x, y] = validCoords[randomCoord];
    matrix[x][y] = getRandomly2or4(FOUR_PROBABILITY);
  }
  return matrix;
};

const moveRow = (movingRow, direction) => {
  const len = movingRow.length;
  let moved = false;

  const row = addSameValues(movingRow);

  // Move all the values to one side or the other
  for (let i = 0; i < len * len; i++) {
    const y = i % len;
    if (y !== len - 1) {
      if (["left", "up"].includes(direction)) {
        // current is empty and next is not
        if (row[y] === 0 && row[y + 1] !== 0) {
          row[y] = row[y + 1]; // move next to current
          row[y + 1] = 0;
          moved = true;
        }
      }
      if (["right", "down"].includes(direction)) {
        // current is not empty and next is
        if (row[y] !== 0 && row[y + 1] === 0) {
          row[y + 1] = row[y]; // move current to next
          row[y] = 0;
          moved = true;
        }
      }
    }
  }

  return { moved, row };
};

/**
 * Move the tiles to one direction, when there are gaps (0) in
 * between of other numbers
 * If we try to move the tiles vertically, we have to rotate the matrix
 * @param board
 * @param payload
 * @returns {*[]}
 */
const moveTiles = (board, payload) => {
  let nb = board;

  if (["down", "up"].includes(payload)) {
    nb = rotateLeft(nb);
  }

  const boardLength = nb.length;
  for (let i = 0; i < boardLength; i++) {
    const { moved, row } = moveRow(nb[i], payload);
    if (moved === true) {
      nb[i] = row;
    }
  }

  if (["down", "up"].includes(payload)) {
    nb = rotateRight(nb);
  }

  return nb;
};

/**
 * Add all the values of a matrix
 * @param matrix
 * @returns int
 */
const sumMatrixValues = (matrix) => (
  matrix.reduce((acc, row) => acc + row.reduce((colAcc, col) => colAcc + col, 0), 0)
);

/**
 * Get's the highest value of a matrix
 * @param matrix
 * @returns int
 */
const getHighestTile = (matrix) => matrix.flat().reduce((acc, v) => ((v > acc) ? v : acc), 0);

export {
  sumMatrixValues,
  rotateLeft,
  rotateRight,
  getRandomly2or4,
  addSameValues,
  getHighestTile,
  addRandomValueToMatrix,
  moveTiles,
};
