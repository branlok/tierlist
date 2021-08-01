import React from "react";
import styled, { keyframes } from "styled-components";
import Search from "../Search";
import { StyledOverlay } from "../styles";
import CurrentTierlist from "./CurrentTierlist";

function ExplorerModal({ modalOpen, setModalOpen }) {
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
          <StyledBody active={true}>
            <div className="leftColumn">Current Tierlist</div>
            <div className="body ">
              <CurrentTierlist />
            </div>
          </StyledBody>
          <StyledBody>
            <div className="leftColumn ">Local Storage</div>
            <div className="body ">Local storage search</div>
          </StyledBody>
          <StyledBody>
            <div className="leftColumn">API</div>
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
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
    border-right: 4px solid ${(props) => props.theme.main.accent};
    flex-shrink: 0;
  }
  .body {
    height: 100%;
    padding: 10px;
  }
  .row1 {
    height: calc(100% - 100px);
  }
  .row2 {
    height: 50px;
    flex-shrink: 0;
  }
  .row3 {
    height: 50px;
    flex-shrink: 0;
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
  border-bottom: 1px solid ${(props) => props.theme.main.accent};
  flex-shrink: 0;
  z-index: 1;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .spacing {
    width: 150px;
    height: 100%;
    border-right: 4px solid ${(props) => props.theme.main.accent};
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
  height: 90%;
  width: 90%;
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
    height: 100%;
    width: 100%;
  }
`;

let StyledSection = styled.section`
  display: flex;
  height: ${({ height }) => (height ? height : "100%")};
  flex-shrink: ${({ shrink }) => (shrink ? "1" : "0")};
  .title {
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
    border-right: 4px solid #30269d;
    font-weight: bold;
    font-size: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  .body {
    font-size: 16px;
    display: flex;
    width: 100%;
    display: flex;
    justify-content: ${({ flexEnd }) => (flexEnd ? "flex-end" : "flex-start")};
    align-items: start;
    padding: 15px 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    .field {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 100%;
      margin: 5px;
      label {
        padding-left: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        height: 25px;
      }
      input {
        border-style: none;
        background-color: #434343;
        border: 1px solid #666666;
        border-radius: 5px;
        height: 25px;
        padding-left: 5px;
        color: white;
        font-size: 13px;
      }
      select {
        width: 100%;
        padding-left: 5px;
        /* padding: 5px 35px 5px 5px; */
        font-size: 13px;
        border: 1px solid #666666;
        background-color: #434343;
        color: white;
        border-radius: 5px;
        height: 25px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        /* background: url(https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-down-1781999-1514199.png) 96% / 15%
          no-repeat #eee;
      } */
      }
    }
    .cancel {
      border-radius: 5px;
      background-color: gray;
      color: white;
      font-weight: bold;
      border-style: none;
      padding: 5px 15px;
      margin: 5px 0px;
      cursor: pointer;
    }
    .submit {
      border-radius: 5px;
      background-color: #30269d;
      color: white;
      font-weight: bold;
      border-style: none;
      padding: 5px 15px;
      margin: 5px 10px;
      cursor: pointer;
    }
  }
`;

export default ExplorerModal;
