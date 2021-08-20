import React from "react";
import styled from "styled-components";
import { gradient } from "../../../../GlobalStyles";
import { ReactComponent as LogoSVG } from "../../../../Styles/svg/onlyLogo.svg";
function Logo() {
  return (
    <StyledLogo>
      <h1>A Tierlist Maker</h1>
      <LogoSVG className="logo-svg" />
      <p>Made by Brandon</p>
    </StyledLogo>
  );
}

let StyledLogo = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #30269d;
  background-color: ${(props) => props.theme.main.accent};
  transition: 1s;
  /* :active {
    background: linear-gradient(270deg, #002dff, #441bd3, #9341c5, #c874de);
    background-size: 800% 800%;
    animation: ${gradient} 10s ease infinite;
  } */

  .title {
    font-weight: bold;
  }
  .logo-svg {
    height: 30px;
    width: 30px;
    padding: 20px;
    fill: white;
  }
  p {
    font-size: 12px;
  }
`;

export default Logo;
