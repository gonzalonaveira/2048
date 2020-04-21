import React, { useState } from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Board from "./Board.jsx";
import GameMenu from "./GameMenu.jsx";
import ChangeTheme from "./ChangeTheme.jsx";
import { getTheme } from "../themes";

const GlobalStyle = createGlobalStyle`
  html, body {
      width:100%;
      height:100%;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      font-family: ${(props) => props.theme.font};
      font-size: 14px;
  }
`;

const AppWrapper = styled.div`
  width:100%;
  height:100%;
  min-height: 100%;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.secondaryColor};
`;

const AppContainer = styled.div`
  width: 500px;
  height:100%;
  min-height: 100%;
  margin: 0 auto;
  padding-top:100px;
  color: ${(props) => props.theme.secondaryColor};
`;

function App() {
  const [themeName, setThemeName] = useState(undefined);
  const theme = getTheme(themeName);


  return (
      <ThemeProvider theme={theme}>
        <AppWrapper>
          <ChangeTheme themeName={themeName} setTheme={setThemeName}/>
          <AppContainer>
            <GlobalStyle />
            <GameMenu/>
            <Board/>
          </AppContainer>
        </AppWrapper>
      </ThemeProvider>
  );
}

export default App;
