import React from "react";
import styled from "styled-components";
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
  background-color: #30269d;
  background-color: ${(props) => props.theme.main.accent};
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
