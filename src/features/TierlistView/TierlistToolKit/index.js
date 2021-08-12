import React from "react";

import styled from "styled-components";
import { bounceIn } from "../../../GlobalStyles";
import { ReactComponent as UpArrowSVG } from "../../../Styles/svg/upArrow.svg";
import ExpandedToolkit from "./ExpandedToolkit";
import MiniToolKit from "./MinimizeToolKit";

/**
 * ?Renders  right sidebar toolkit of buildFpage, expandable and unexpanded states
 *
 * @param: toolState (Boolean) True: toolbar open, false: toolbar closed
 * @param: setToolState (fucntion) cooresponding react setter for toolState
 */
function TierlistToolkit({ toolState, setToolState }) {
  return (
    <StyledSidebar width={toolState ? "400px" : "250px"}>
      <ToggleButton pointLeft={toolState} setToolState={setToolState} />
      {toolState ? (
        <ExpandedToolkit toolState={toolState} />
      ) : (
        <MiniToolKit toolState={toolState} />
      )}
    </StyledSidebar>
  );
}

/**
 * renders the button that points left or right depending on expanded or not
 *
 * @param {boolean} param0.toolState - toolbar's state expanded/minimized
 * @param {boolean} param0.setToolState - toolbar's setter
 * @returns
 */
function ToggleButton({ pointLeft, setToolState }) {
  return (
    <StyledToggle
      pointLeft={pointLeft}
      className="toggle"
      onClick={() => setToolState((prevState) => !prevState)}
    >
      <UpArrowSVG className="toggleSVG" />
    </StyledToggle>
  );
}

let StyledSidebar = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) => props.theme.main.primaryVarient};
  transition: 0.3s;
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
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: black;
  animation: ${bounceIn} 1s ease forwards;
  .toggleSVG {
    width: 20px;
    height: 20px;
    fill: white;
    padding: 6px;
    padding-bottom: 6px;
    transform: ${(props) =>
      props.pointLeft
        ? "rotate(90deg) rotateY(180deg)"
        : "rotate(-90deg) rotateY(-180deg)"};
    transition: 0.3s;
    :hover {
      fill: gray;
    }
  }
`;

export default TierlistToolkit;
