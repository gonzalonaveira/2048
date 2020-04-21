import games, { newGame, move } from "./gameSlice";

// describe("new games", () => {
//   it("initial state should have two numbers", () => {
//     const initialState = games(undefined, {});
//     const notZero = initialState.reduce((acc, val) => acc + val.filter((v) => v > 0).length, 0);
//     expect(notZero).toBe(2);
//   });
//   it("new game should have two numbers", () => {
//     const newGameState = games(undefined, {
//       type: newGame,
//       payload: {},
//     });
//     const notZero = newGameState.reduce((acc, val) => acc + val.filter((v) => v > 0).length, 0);
//     expect(notZero).toBe(2);
//   });
// });

describe("move tiles", () => {
  // it("move tiles left - no add up", () => {
  //   const state = [
  //     [0, 0, 0, 5],
  //     [0, 0, 0, 5],
  //     [0, 0, 0, 5],
  //     [0, 0, 0, 5],
  //   ];
  //
  //   const response = games(state, {
  //     type: move,
  //     payload: "left",
  //   });
  //   console.log(response[0][0]);
  // });

  it("move tiles right - no add up", () => {
    const state = [
      [7, 0, 0, 0],
      [7, 0, 0, 0],
      [7, 0, 0, 0],
      [7, 0, 0, 0],
    ];

    const response = games(state, {
      type: move,
      payload: "right",
    });

    let notZero = 0;
    const end = response.length - 1;
    for (let i = 0; i <= end; i++) {
      if (response[i][0] > 0 || response[i][1] > 0) {
        notZero += 1;
      }
      expect(response[i][end]).toBe(7);
    }
    expect(notZero).toBe(1);
  });
});
