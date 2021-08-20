import React from "react";
import styled from "styled-components";
import Item from "./Item";

function Results({ queryResult, view }) {
  console.log(queryResult.results);
  if (view === "Kitsu") {
    return (
      <StyledExplorer>
        {queryResult.data.searchAnimeByTitle.nodes.length === 0 && (
          <StyledPrompt>Sorry, we can't find anything</StyledPrompt>
        )}
        {queryResult.data.searchAnimeByTitle.nodes.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              imageUrl={item.posterImage.views[2].url}
              title={item.titles.canonical}
              description={item.description.en}
            />
          );
        })}
      </StyledExplorer>
    );
  } else if (view === "Unsplash") {
    return (
      <StyledExplorer>
        {queryResult.results.length === 0 && (
          <StyledPrompt>Sorry, we can't find anything</StyledPrompt>
        )}
        {queryResult.results.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              imageUrl={item.urls.small}
              title={item.description}
              description={`Captured by ${item.user.name}`}
            />
          );
        })}
      </StyledExplorer>
    );
  } else {
    return null;
  }
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

export default Results;
