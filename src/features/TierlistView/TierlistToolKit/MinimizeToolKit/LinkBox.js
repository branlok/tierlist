import React from "react";
import styled from "styled-components";

function LinkBox({setModalOpen}) {
  
  return (
    <StyledLinkBox>
      <div className="module-link" onClick={() => setModalOpen("info")}>Tierlist Settings</div>
      <div className="module-link" onClick={() => setModalOpen("explorer")} >Explorer</div>
      <div className="module-link" onClick={() => setModalOpen("myTierlists")} >My Tierlists</div>
    </StyledLinkBox>
  );
}

let StyledLinkBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
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
    :hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export default LinkBox;
