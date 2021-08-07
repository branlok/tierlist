import React from "react";
import StyledInfoOverlay from "./Styles/StyledInfoOverlay";
import { StyledActionButton } from "./Styles/StyledTable";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as GargabeSVG } from "../../../../Styles/svg/Gargabe.svg";

function InstructionOverlay({setShowInstructions}) {
  return (
    <StyledInfoOverlay onClick={() => setShowInstructions(false)}>
      <h1>Action Instructions</h1>
      <div className="instruction">
        <StyledActionButton>
          <AddSVG className="svg" />
        </StyledActionButton>
        <div className="instruction-text">
          <span className="main">Adds to current tierlist</span>
        </div>
      </div>
      <div className="instruction">
        <StyledActionButton delete={true}>
          <AddSVG className="svg" />
        </StyledActionButton>
        <div className="instruction-text">
          <span className="main">Removes from current tierlist</span>
          <span className="extra">*if only instance, file will be deleted</span>
        </div>
      </div>
      <div className="instruction">
        <StyledActionButton bg={"#9c2525"}>
          <GargabeSVG className="svg" />
        </StyledActionButton>
        <div className="instruction-text">
          <span className="main"> Delete file and all instances</span>
        </div>
      </div>
      <div className="footnote">Click anywhere to exit</div>
    </StyledInfoOverlay>
  );
}



export default InstructionOverlay;
