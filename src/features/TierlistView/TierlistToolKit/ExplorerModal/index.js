import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Search from "../Search";
import { StyledOverlay } from "../styles";
import CurrentTierlist from "./CurrentTierlist";
import LocalStorage from "./LocalStorage";

function ExplorerModal({ modalOpen, setModalOpen }) {
  let [tab, setTab] = useState("currentTierlist");

  return (
    <StyledOverlay
      onClick={(e) => {
        e.preventDefault();
        setModalOpen(false);
      }}
    >
      <StyledModule onClick={(e) => e.stopPropagation(e)}>
        <StyledHeader>
          <div className="spacing"></div>
          <div className="right">Project Settings</div>
        </StyledHeader>
        <div className="bodyWrapper">
          <StyledBody active={tab == "currentTierlist"}>
            <div
              className="leftColumn"
              onClick={() => setTab("currentTierlist")}
            >
              Current Tierlist
            </div>
            <div className="body">
              <CurrentTierlist />
            </div>
          </StyledBody>
          <StyledBody active={tab == "localStorage"}>
            <div className="leftColumn" onClick={() => setTab("localStorage")}>
              Local Storage
            </div>
            <div className="body">
              <LocalStorage />
            </div>
          </StyledBody>
          <StyledBody active={tab == "api"}>
            <div className="leftColumn" onClick={() => setTab("api")}>
              API
            </div>
            <div className="body">Local storage search</div>
          </StyledBody>
        </div>
      </StyledModule>
    </StyledOverlay>
  );
}

const StyledBody = styled.div`
  width: 100%;
  height: ${(props) => (props.active ? "calc(100% - 100px)" : "50px")};
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  overflow: hidden;
  /* flex-shrink: ${(props) => (props.active ? 1 : 0)}; */
  transition: 0.4s;
  .leftColumn {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 4px solid ${(props) => props.theme.main.accent}; //30269d;
    font-weight: bold;
    font-size: 16px;
    width: 150px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
    transition: 0.2s;
    cursor: pointer;
    color: ${(props) => (props.active ? "white" : "#404040")};
    :hover {
      background-color: rgba(255, 255, 255, 0.2);
      color: white;
    }
  }
  .body {
    height: 100%;
    width: 100%;
    /* padding: 10px; */
    display: ${(props) => (props.active ? "block" : "none")};
  }
`;

const StyledHeader = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px 10px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  /* border-bottom: 1px solid ${(props) => props.theme.main.accent}; */
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .spacing {
    width: 150px;
    height: 100%;
    /* border-right: 4px solid ${(props) => props.theme.main.accent}; */
  }
`;

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

const StyledModule = styled.div`
  height: 80%;
  width: 80%;
  border: 1px solid ${(props) => props.theme.main.accent};
  background-color: #131313;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  animation: ${expandIn} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 10px;
  position: relative;
  .bodyWrapper {
    display: flex;
    flex-direction: column;
    height: calc(100% - 35px);
    width: 100%;
  }
`;

export default ExplorerModal;
