import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBoard,
  selectHasWon,
  selectIsGameOver,
  selectKeepPlaying,
  move,
  keepPlaying,
} from "../reducers/gameSlice";

import useArrowsEvent from "../hooks/useArrowsEvent";

import Tile from "./Tile.jsx";
import Message from "./Message";

const BoardContainer = styled.div`
    height: 500px;
    width: 500px;

    padding-top: 15px;
    padding-left: 15px;

    display: grid;
    grid-template-columns: 110px 110px 110px 110px;
    grid-template-rows: 110px 110px 110px 110px;

    grid-column-gap: 15px;
    grid-row-gap: 15px;

    background: ${(props) => props.theme.foreground};
    border-radius: ${(props) => props.theme.borderRadius}};
`;

function Board() {
  const dispatch = useDispatch();

  useArrowsEvent((e) => {
    dispatch(move(e));
  });

  const board = useSelector(selectBoard);
  const hasWon = useSelector(selectHasWon);
  const isGameOver = useSelector(selectIsGameOver);
  const wantsToKeepPlaying = useSelector(selectKeepPlaying);

  const isHardcoreGamer = hasWon === true && wantsToKeepPlaying === false;

  return (<>
          { isHardcoreGamer === false ? null
            : <Message>
                <h2>You Won!</h2>
                <button onClick={() => dispatch(keepPlaying())}>Keep playing</button>
              </Message>
          }
          { isGameOver ? <Message><h2>You Lost!</h2></Message> : null }
        <BoardContainer>
        {board.map(
          (row, i) => row.map((cell, j) => <Tile key={`tile-${j}-${i}`} value={cell} x={j} y={i}/>),
        )}
        </BoardContainer>
    </>);
}

export default Board;
