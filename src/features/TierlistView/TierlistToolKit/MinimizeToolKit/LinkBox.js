import React from "react";
import styled from "styled-components";

function LinkBox({ setModalOpen }) {
  return (
    <StyledLinkBox>
      <li onClick={() => setModalOpen("info")}>
        <button className="module-link">Tierlist Settings</button>
      </li>
      <li onClick={() => setModalOpen("explorer")}>
        <button className="module-link">Explorer</button>
      </li>
      <li onClick={() => setModalOpen("myTierlists")}>
        <button className="module-link">My Tierlists</button>
      </li>
    </StyledLinkBox>
  );
}

let StyledLinkBox = styled.ul`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  li {
    height: 40px;
    width: 100%;
  }
  .module-link {
    background-color: black;
    height: 40px;
    width: 100%;
    font-weight: bold;
    color: white;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    cursor: pointer;
    outline: none;
    border-style: none;
    :hover {
      background-color: ${props => props.theme.main.primaryVarient}; //rgba(255, 255, 255, 0.3);
    }
  }
`;

export default LinkBox;
