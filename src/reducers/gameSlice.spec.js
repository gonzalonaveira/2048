import gameReducer from "./gameSlice";

describe("test game reducer", () => {
  it("should handle initial state", () => {
    const initialState = gameReducer(undefined, {});

    const numberOfNotZero = (matrix) => matrix
      .flat()
      .reduce((acc, v) => ((v !== 0) ? acc + 1 : acc), 0);

    expect(initialState.score).toEqual(0);
    expect(initialState.highestScore).toEqual(0);
    expect(initialState.gameOver).toEqual(false);
    expect(initialState.won.status).toEqual(false);
    expect(initialState.won.keepPlaying).toEqual(false);
    expect(numberOfNotZero(initialState.board)).toEqual(2);
  });
});
