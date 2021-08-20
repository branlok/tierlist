import React from "react";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { fadeIn } from "../../../../../../GlobalStyles";
import { ReactComponent as KitsuLogo } from "../../../../../../Styles/svg/kitsu.svg";
import { ReactComponent as UnsplashLogo } from "../../../../../../Styles/svg/UnsplashLogo.svg";
import Search from "../../../Search";
import { StyledSearchWrapper } from "../LocalStorage";
import Item from "./Item";
// import OptionAPI from "./OptionAPI";
import OptionsAPI from "./OptionsAPI";
import Results from "./Results";
function APIs() {
  //if view true; reveal search and search items, if false, back to select api
  let [view, setView] = useState(null);
  let [userSearch, setUserSearch] = useState(false);
  let [queryResult, setQueryResult] = useState(null);

  let reset = () => {
    setView(null);
    setUserSearch(false);
    setQueryResult(null);
  };

  return (
    <StyledWrapper view={view}>
      {view && (
        <StyledSearchWrapper className="searchWrapper">
          <Search
            setQueryResult={setQueryResult}
            searchType={{ externalApi: true, api: view }}
            setUserSearch={setUserSearch}
          />
          <div className="search-choice" onClick={() => reset()}>
            {view === "Kitsu" && <KitsuLogo className="kitsu-logo" />}
            {view === "Unsplash" && <UnsplashLogo className="unsplash-logo" />}
          </div>
        </StyledSearchWrapper>
      )}

      <div className="container">
        {!view && <OptionsAPI setView={setView} />}
        {view == "Kitsu" && !userSearch && (
          <StyledPrompt>search your favourite anime on Kitsu</StyledPrompt>
        )}
        {view == "Unsplash" && !userSearch && (
          <StyledPrompt>search any image from Unsplash</StyledPrompt>
        )}
        {userSearch && queryResult && (
          <Results queryResult={queryResult} view={view} />
        )}
      </div>
    </StyledWrapper>
  );
}

let StyledPrompt = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  font-weight: bold;
`;

let StyledExplorer = styled.div`
  height: calc(100%);
  width: 100%;
  /* padding: 10px; */
  overflow-y: scroll;
  scroll-behavior: smooth;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: center;
  /* justify-content: center; */
  .modal {
    flex-basis: auto;
    flex-grow: 1;
    @media only screen and (min-width: 0px) {
      max-width: calc(100% / 1 - 10px);
    }
    @media only screen and (min-width: 1000px) {
      max-width: calc(100% / 1 - 10px);
    }
    @media only screen and (min-width: 1100px) {
      max-width: calc(100% / 2 - 10px);
    }
    @media only screen and (min-width: 1600px) {
      max-width: calc(100% / 3 - 10px);
    }
    @media only screen and (min-width: 1700px) {
      max-width: calc(100% / 4 - 10px);
    }
    @media only screen and (min-width: 2600px) {
      max-width: calc(100% / 5 - 10px);
    }
    /* min-width: calc(100% / 3 - 10px); */
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  scrollbar-width: none;
`;

let StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  .search-choice {
    height: 100%;
    width: 50px;
    height: 30px;
    padding: 6px;
    border-radius: 10px;
    /* border: 1px solid rgba(255, 255, 255, 1); */

    margin-left: 10px;
    cursor: pointer;

    box-shadow: 0 0px 3px rgba(255, 255, 255, 0.12),
      0 0px 2px rgba(255, 255, 255, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: ${(props) =>
      props.view === "Unsplash"
        ? "rgba(255,255,255,1)"
        : "rgba(255,255,255,0)"};
    :hover {
      /* background-color: ${(props) => props.theme.main.primary}; */
      box-shadow: 0 0px 8px rgba(255, 255, 255, 0.12),
        0 0px 12px rgba(255, 255, 255, 0.24);
    }
  }
  .container {
    height: 100%;
    width: 100%;
    padding: 10px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      height: 0;
      width: 0;
      color: transparent;
    }
    scrollbar-width: none;
    .header-instructions {
      /* flex-shrink: 0; */
      height: 70px;
      margin-top: -10px;
      margin-left: -10px;
      margin-right: -10px;
      border-bottom: 2px solid black;
      display: flex;
      text-align: center;
      justify-content: center;
      align-items: center;
      background-color: #262626;
      z-index: 10;
      h1 {
        font-size: 20px;
        /* height: 100%; */
        /* color: ${(props) => props.theme.fontColor[100]}; */
        color: white;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
      }
    }
    .api-selector {
      display: flex;
      flex-direction: column;
      height: calc(100% - 70px);
      min-height: 350px;
      animation: ${fadeIn} 1s ease forwards;
      padding: 10px 20px;
      /* min-height: 400px; */
      justify-content: start;
      align-items: center;
      overflow-y: scroll;
      background-color: rgba(255, 255, 255, 0.1);
      border: 5px solid rgba(255, 255, 255, 0.4);
      margin-top: 10px;
      border-radius: 15px;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        height: 0;
        width: 0;
        color: transparent;
      }
      scrollbar-width: none;
    }
  }
  .results {
    /* height: 100%;
    width: 100%; */
    border: 1px solid red;
  }

  .kitsu-logo {
    height: 100%;
    width: 100%;
    fill: #fd8320;
  }
  .unsplash-logo {
    height: 100%;
    width: 100%;
  }
`;

export default APIs;
