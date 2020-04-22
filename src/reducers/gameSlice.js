import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import {
  rotateLeft,
  rotateRight,
  generateNumber,
  addSameValues,
  sumMatrixValues,
  getHighestTile,
} from "../utils/utils";

const FOUR_PROBABILITY = 0.10;
const WIN_SCORE = 2048;

const moveRow = (movingRow, direction) => {
  const len = movingRow.length;
  let moved = false;

  const { needToMove, row } = addSameValues(movingRow);

  if (needToMove === false) {
    return { moved, row };
  }

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
    matrix[x][y] = generateNumber(FOUR_PROBABILITY);
  }
  return matrix;
};

const newGameState = () => {
  let defaultEmpty = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  const max = defaultEmpty.length - 1;
  const minMax = [0, max];

  defaultEmpty = addRandomValueToMatrix(defaultEmpty, minMax, minMax);
  return addRandomValueToMatrix(defaultEmpty, minMax, minMax);
};

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
 * Check if there are any available moves in the board
 * @param board
 * @returns {boolean}
 */
const checkAvailableMovements = (board) => {
  const possiblePayloads = ["right", "left", "down", "up"];
  // Clone to not affect the original board
  const original = _.cloneDeep(board);
  let haveAvailableMovements = false;

  for (let i = 0; i < possiblePayloads.length; i++) {
    // We move the tiles, and check against the original board
    // If these are not the same, means there are movements available
    const actual = moveTiles(board, possiblePayloads[i]);
    if (_.isEqual(original, actual) === false) {
      haveAvailableMovements = true;
      i = possiblePayloads.length;
    }
  }

  return haveAvailableMovements;
};

const gameSlice = createSlice({
  name: "game",
  initialState: {
    score: 0,
    highestScore: 0,
    gameOver: false,
    won: {
      status: false,
      keepPlaying: false,
    },
    board: newGameState(),
  },
  reducers: {
    keepPlaying(state, action) {
      state.won.keepPlaying = true;
      return state;
    },
    newGame(state, action) {
      state.score = 0;
      state.board = newGameState();
      state.gameOver = false;
      state.won = {
        status: false,
        keepPlaying: false,
      };
      return state;
    },
    move(state, action) {
      if (state.gameOver === true) {
        return state;
      }

      if (state.won.status === true && state.won.keepPlaying === false) {
        return state;
      }

      const { payload } = action;
      let { board } = state;
      const boardLength = board.length;
      // console.log(JSON.parse(JSON.stringify(board)));

      const boardClone = _.cloneDeep(board);
      const isThereMoreMovementsAvailable = checkAvailableMovements(boardClone, payload);

      if (isThereMoreMovementsAvailable === false) {
        state.gameOver = true;
        return state;
      }

      board = moveTiles(board, payload);
      // console.log(JSON.parse(JSON.stringify(board)));

      // If the user moved to a direction that didnt generate any change
      // We dont need to add any new value.
      const haveToAddNewValue = (_.isEqual(boardClone, board) === false);

      // If there are not movements to that side we dont add any new value
      if (haveToAddNewValue === true) {
        const max = boardLength - 1;
        const minMaxY = [0, max];
        const minMaxX = [0, max];

        const config = {
          left: 0, right: 1, up: 0, down: 1,
        };

        if (["left", "right"].includes(payload)) {
          minMaxX[config[payload]] = Math.round(max / 2);
        }
        if (["up", "down"].includes(payload)) {
          minMaxY[config[payload]] = Math.floor(max / 2);
        }

        board = addRandomValueToMatrix(board, minMaxX, minMaxY);
      }

      const score = sumMatrixValues(board);
      const highestTile = getHighestTile(board);

      if (score > state.highestScore) {
        state.highestScore = score;
      }
      state.won.status = (highestTile >= WIN_SCORE);
      state.score = score;
      state.board = board;

      return state;
    },
  },
});

export const selectBoard = (state) => state.game.board;
export const selectActualScore = (state) => state.game.score;
export const selectHighestScore = (state) => state.game.highestScore;
export const selectHasWon = (state) => state.game.won.status;
export const selectKeepPlaying = (state) => state.game.won.keepPlaying;
export const selectIsGameOver = (state) => state.game.gameOver;

export const { newGame, move, keepPlaying } = gameSlice.actions;

export default gameSlice.reducer;
