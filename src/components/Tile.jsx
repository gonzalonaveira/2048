import React from "react";
import styled from "styled-components";

const TileContainer = styled.div`
    width: 110px;
    height: 110px;
    border: rgba(209, 238, 210, 0.35);
    background: rgba(238, 228, 218, 0.35);
    border-radius: ${(props) => `calc(${props.theme.borderRadius} / 2)`};
    line-height: 110px;
    color: ${(props) => props.theme.secondaryColor};
    user-select: none;

    .tileContent {
        border-radius: ${(props) => `calc(${props.theme.borderRadius} / 2)`};
        background: ${(props) => props.theme.foreground};
        background: #eee4da;
        text-align: center;
        font-weight: bold;
        z-index: 10;
        font-size: 45px;
    }
`;

function Tile(props) {
  return <TileContainer key={`${props.x}-${props.y}`}>
    <div className="tileContent">{ props.value !== 0 ? props.value : null }</div>
  </TileContainer>;
}

export default Tile;
