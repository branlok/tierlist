import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as UpArrowSVG } from "../../../Styles/svg/upArrow.svg";
import Explorer from "./Explorer";
import FileDropper from "./FileDropper";
// import FileDropper from "./FileDropper";
// import FileDropper from "./FileDropper";

import Footer from "./Footer";
import Header from "./Header";
import MiniToolKit from "./MinimizeToolKit";
import Storage from "./Storage";

/**
 * Renders tierlist toolkit, expandable and unexpanded form
 *
 * @param: toolState (Boolean) True: toolbar open, false: toolbar closed
 * @param: setToolState (fucntion) cooresponding react setter for toolState
 */

function TierlistToolkit({ toolState, setToolState }) {
  //   let [toolState, setToolState] = useState(false);

  return (
    <StyledSidebar width={toolState ? "450px" : "250px"}>
      {/* <Header /> */}
      <StyledToggle
        pointLeft={toolState}
        className="toggle"
        onClick={() => setToolState((prevState) => !prevState)}
      >
        <UpArrowSVG className="toggleSVG" />
      </StyledToggle>
      {toolState ? (
        <StyledExpandedWrapper>
          <Header />
          <StyledWrapper>
            <Explorer />
            <Storage />
            <Footer />
          </StyledWrapper>
        </StyledExpandedWrapper>
      ) : (
        <MiniToolKit />
      )}
    </StyledSidebar>
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
  height: calc(100% - 100px); //80px + 20px from margin
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

let StyledSidebar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: #331c64;
  transition: 0.5s;
  flex-shrink: 0;
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  position: relative;
`;

let StyledToggle = styled.button`
  position: absolute;
  top: 50px;
  left: -15px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  .toggleSVG {
    width: 25px;
    height: 25px;
    fill: gray;
    padding-bottom: 2px;
    transform: ${(props) =>
      props.pointLeft
        ? "rotate(90deg) rotateY(180deg)"
        : "rotate(-90deg) rotateY(-180deg)"};
    transition: 0.5s;
    :hover {
      fill: black;
    }
  }
`;

export default TierlistToolkit;
