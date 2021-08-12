import React from "react";
import styled from "styled-components";
import Explorer from "./Explorer";
import Footer from "./Footer";
import Header from "./Header";
import Storage from "../Storage/Storage";

function ExpandedToolkit({ toolState }) {
  return (
    <StyledExpandedWrapper>
      <Header />
      <StyledWrapper>
        <Explorer />
        <Storage toolState={toolState} />
        <Footer />
      </StyledWrapper>
    </StyledExpandedWrapper>
  );
}

let StyledExpandedWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  .explorer {
    height: 100%;
  }
`;

let StyledWrapper = styled.div`
  width: calc(100% - 20px); //20px from margin
  height: calc(100% - 110px); //80px + 20px from margin
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin: 10px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
`;

export default ExpandedToolkit;
