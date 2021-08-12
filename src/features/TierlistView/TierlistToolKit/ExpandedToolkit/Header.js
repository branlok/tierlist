import React from "react";
import styled from "styled-components";
import { gradient } from "../../../../GlobalStyles";

function Header() {
  return <StyledHeader>Tierlist Toolkit</StyledHeader>;
}

let StyledHeader = styled.div`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  background-color: rgba(0,0,0,0.2);
  margin-top: -10px;
  /* background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: ${gradient} 15s ease infinite; */

`;

export default Header;
