import React from "react";
import styled from "styled-components";

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  font-weight: 700;
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
  position: relative;
  background-color: ${(props) => props.theme.foreground};
  padding: 5px 0;
  border-radius: ${(props) => props.theme.borderRadius}};
  font-size: 14px;

  p {
      text-transform: uppercase;
      color: ${(props) => props.theme.white};
      padding: 0px;
      margin: 0px;
  }
 
  .boxValue {
      font-size: 28px;
  }
`;

function Box({ label, value }) {
  return (
      <BoxContainer>
        <p>{label}</p>
        <p className="boxValue">{value}</p>
      </BoxContainer>
  );
}

export default Box;
