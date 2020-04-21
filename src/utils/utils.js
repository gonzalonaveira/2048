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
 * @param probability
 * @returns {number}
 */
const generateNumber = (probability) => ((Math.random() > probability) ? 2 : 4);

const addSameValues = (row) => {
  const len = row.length;
  let col = -1;
  let needToMove = false;

  for (let x = 0; x < len; x++) {
    if (row[x] === 0) {
      needToMove = true;
    } else if (col === -1 || row[col] !== row[x]) {
      // If we dont have a current col
      // If the number are not same we can't add them
      col = x;
    } else if (row[col] === row[x]) {
      // sum same numbers
      row[col] += row[x];
      row[x] = 0;
      col = -1;
      needToMove = true;
    }
  }
  return { needToMove, row };
};

const sumMatrixValues = (matrix) => (
  matrix.reduce((acc, row) => acc + row.reduce((colAcc, col) => colAcc + col, 0), 0)
);

const getHighestTile = (matrix) => matrix.flat().reduce((acc, v) => ((v > acc) ? v : acc), 0);

export {
  sumMatrixValues,
  rotateLeft,
  rotateRight,
  generateNumber,
  addSameValues,
  getHighestTile,
};
