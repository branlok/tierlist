import React from "react";
import styled from "styled-components";

function LinkBox() {
  return (
    <StyledLinkBox>
      <div className="module-link">Tierlist Info</div>
      <div className="module-link">Explorer</div>
    </StyledLinkBox>
  );
}

let StyledLinkBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    :hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export default LinkBox;
