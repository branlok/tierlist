import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { expandIn } from "../../../../../GlobalStyles";
import { ReactComponent as CrossDelete } from "../../../../../Styles/svg/CrossDelete.svg";
import { StyledOverlay } from "../../styles";
import APIs from "./APIs";
import CurrentTierlist from "./CurrentTierlist";
import LocalStorage from "./LocalStorage";

/**
 *React Component that displays a modal for
 *exploring files that can be added to tierlist project
 *
 * @param {function} param0.setModalOpen - hook to change modal open or close.
 * @returns
 */
function ExplorerModal({ setModalOpen }) {
  let [tab, setTab] = useState("api");
  useEffect(() => {
    let handleCloseModal = function (event) {
      if (event.key === "Escape") {
        //do something
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleCloseModal);
    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  return (
    <StyledOverlay
      onClick={(e) => {
        e.preventDefault();
        setModalOpen(false);
      }}
    >
      <StyledModule onClick={(e) => e.stopPropagation(e)}>
        <StyledHeader>
          <div className="spacing">
            <button aria-label="Close" onClick={() => setModalOpen(false)}>
              <CrossDelete className="close" />
            </button>
          </div>
          <div className="right">Project Settings</div>
        </StyledHeader>
        <div className="bodyWrapper">
          <StyledBody active={tab == "api"}>
            <div className="leftColumn" onClick={() => setTab("api")}>
              API Explorer
            </div>
            <div className="body">
              <APIs />
            </div>
          </StyledBody>
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
        </div>
      </StyledModule>
    </StyledOverlay>
  );
}

export const StyledBody = styled.div`
  width: 100%;
  height: ${(props) =>
    props.height == "full"
      ? "100%"
      : props.active
      ? "calc(100% - 100px)"
      : "50px"};
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  overflow: hidden;
  /* flex-shrink: ${(props) => (props.active ? 1 : 0)}; */
  transition: 0.4s;
  box-shadow: 0 14px 28px rgba(02, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

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

export const StyledHeader = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.6);

  border-radius: 3px 3px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  font-size: 14px;
  flex-shrink: 0;
  z-index: 1;

  .spacing {
    width: 150px;
    height: 100%;
    border-right: 4px solid ${(props) => props.theme.main.accent};
    display: flex;
    align-items: center;
    button {
      border-style: none;
      background-color: transparent;
      cursor: pointer;
    }
    .close {
      height: 10px;
      margin-left: 10px;
      width: 10px;
      fill: white;
    }
  }
`;

export const StyledModule = styled.div`
  height: 80%;
  width: 80%;
  /* border: 4px solid ${(props) => props.theme.main.accent}; */
  background-color: #131313;

  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  animation: ${expandIn} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  .bodyWrapper {
    display: flex;
    flex-direction: column;
    height: calc(100% - 35px);
    width: 100%;
  }
`;

export default ExplorerModal;
