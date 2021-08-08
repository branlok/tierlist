import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import useScreenshot from "../../../../../customHooks/useScreenshot";
import { StyledOverlay } from "../../styles";
import MockTierlist from "./MockTierlist";

function FinalizeModal({ setOpenFinalize }) {
  const { generateImage, captureRef, status } = useScreenshot();
  let [orientation, setOrientation] = useState("column");
  //TODO: add more settings before export, ie. theme, layout, title inclusion
  return (
    <StyledOverlay dark>
      <StyledModule>
        <StyledScreenshotWrapper className="fullScroll">
          <div ref={captureRef}>
            <MockTierlist orientation={orientation} />
          </div>
        </StyledScreenshotWrapper>
        <StyledActions>
          <div>Saved!</div>
          <div className="buttonsWrapper">
            <button
              className="cancel-button"
              onClick={() => setOpenFinalize(false)}
            >
              close
            </button>
            <button
              className="download-button"
              disabled={status === "loading"}
              onClick={generateImage}
            >
              download Image
            </button>
          </div>
        </StyledActions>
      </StyledModule>
    </StyledOverlay>
  );
}

let expandIn = keyframes`
from {
    transform: scale(0.9);
    opacity: 0;
}
to {
    transform: scale(1);
    opacity: 1;
}
`;

let floatIn = keyframes`
from {
    transform: translateY(-50px);
    opacity: 0;
}
to {
    transform: translateY(0px);
    opacity: 1;
}
`;

let StyledModule = styled.div`
  @media only screen and (min-width: 0px) {
    height: 300px;
    width: 700px;
    border: 2px solid white;
  }
  /* @media only screen and (min-width: 900px) {
    height: 300px;
    width: 700px;
  } */
  /* /* @media only screen and (min-width: 1300px) {
    height: 500px;
    width: 900px;
  } */
  @media only screen and (min-width: 1700px) {
    height: 400px;
    width: 900px;
    border: 6px solid white;
  }

  border-radius: 10px;
  background-color: ${(props) => props.theme.main.accent};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: ${expandIn} 0.3s ease forwards;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 212, 255, 0) 100%
  );
  /* background-color: black; */
`;

let StyledScreenshotWrapper = styled.div`
  animation: ${floatIn} 1s ease forwards;
  @media only screen and (min-width: 0px) {
    /* height: auto; */
    max-height: 350px; //300px;
    width: 400px;
  }
  @media only screen and (min-width: 1700px) {
    height: 300px;
    max-height: 500px;
    width: 500px;
  }
  position: absolute;
  bottom: 50px;
  left: 50px;

  overflow-y: scroll;
  overflow-x: hidden;
`;

let StyledActions = styled.div`
  margin-left: 450px;

  @media only screen and (min-width: 0px) {
    width: 250px;
    height: 100%;
    margin-left: 450px;
  }
  @media only screen and (min-width: 1700px) {
    height: 100%;
    width: 350px;
    margin-left: 550px;
  }

  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .buttonsWrapper {
    margin-top: 10px;
    display: flex;
    button {
      margin: 5px;
      padding: 5px 15px;
      border-radius: 20px;
      border-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      cursor: pointer;
      transition: 0.3s;
      font-weight: bold;
      color: white;
      font-size: 12px;
      transition: 0.2s;
    }
    .cancel-button {
      background: gray;

      :hover {
        background: darkgray;
      }
      :active {
        transform: scale(0.95);
      }
    }
    .download-button {
      background: ${(props) => props.theme.main.primaryVarient};
      :hover {
        background: ${(props) => props.theme.main.primary};
      }
      :active {
        transform: scale(0.95);
      }
      :disabled {
        background-color: darkgray !important;
        :hover {
        }
      }
    }
  }
`;

export default FinalizeModal;
