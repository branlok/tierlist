import React from "react";
import styled from "styled-components";
import Storage from "../Storage";
import LinkBox from "./LinkBox";
import Logo from "./Logo";

function MiniToolKit() {
  return (
    <StyledMiniToolKitWrapper>
      <Logo />
      <LinkBox />
      <div className="storage-wrapper">
        <Storage mini={true} />
      </div>
    </StyledMiniToolKitWrapper>
  );
}

let StyledMiniToolKitWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .storage-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    padding: 10px;
  }
`;

export default MiniToolKit;
