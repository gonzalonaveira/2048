import React from "react";
import styled from "styled-components";

const MessageContainer = styled.div`
    display: grid;
    position: fixed;
    width: 450px;
    height: 150px;
    align-self: end; /* bottom of column */
    justify-self: end; /* right of row */
    z-index: 100;
    background: ${(props) => props.theme.foreground};
    border: ${(props) => `${props.theme.border} ${props.theme.secondaryColor}`};
    border-radius: ${(props) => props.theme.borderRadius}};
    color: ${(props) => props.theme.white}};
    margin-left: 28px;
    margin-top: 8%;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.3);
    
    h2 {
      font-size: 50px;
      text-align: center;
      margin-bottom: 0px;
    }
    
    button {
      width: 100px;
      height: 80%;
      font-weight: 700;
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.secondaryColor};
      border-radius: ${(props) => props.theme.borderRadius};
      margin: 0 auto;
    }
`;

function Message(props) {
  return <MessageContainer>
    {props.children}
  </MessageContainer>;
}

export default Message;
