import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "./Box";
import { newGame, selectActualScore, selectHighestScore } from "../reducers/gameSlice";

const GameMenuContainer = styled.div`
    display: grid;
    grid-template-columns: 50% 50%;
    grid-column-gap: 10px;
    grid-template-rows: auto;
    
    .titleBoxes{
      display: grid;
      grid-template-columns: 75% 25%;
      grid-column-gap: 10px;
      grid-template-rows: 75%;
      margin-right: 10px;
    }
    
    .newGame{
      width: 100%;
      height: 100%;
      font-weight: 700;
      color: ${(props) => props.theme.primaryColor};
      background: ${(props) => props.theme.secondaryColor};
      border-radius: ${(props) => props.theme.borderRadius}};
    }
    
    .newGame:hover, .newGame:active{
      cursor: pointer;
      box-shadow: 0 0 4px 0 rgba(0,0,0,.25);
      background: ${(props) => props.theme.foreground};
    }
    
    .scoreBoxes{
       display: grid;
       grid-template-columns: 50% 50%;
       grid-column-gap: 10px;
       grid-template-rows: 64%;
       margin-right: 5px;
    }
    
    button:focus {
      outline: 0;
    }
    
    h1{
      font-size: 70px;
      margin: 0px;
    }
`;

function GameMenu() {
  const dispatch = useDispatch();
  const score = useSelector(selectActualScore);
  const highestScore = useSelector(selectHighestScore);

  return (
      <GameMenuContainer>
        <div className="titleBoxes">
          <h1>2048</h1>
          <button className="newGame" onClick={() => dispatch(newGame())}>New Game</button>
        </div>
        <div className="scoreBoxes">
          <Box label={"Score"} value={score}/>
          <Box label={"Best"} value={highestScore}/>
        </div>
      </GameMenuContainer>
  );
}

export default GameMenu;
