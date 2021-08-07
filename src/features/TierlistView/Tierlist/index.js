import React from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import Row from "./Row";

/* RENDERS ROWS */
function Tierlist({ toolState }) {
  let rows = useSelector((state) => state.loadedTierlist.rows);
  let rowOrder = useSelector((state) => state.loadedTierlist.rowOrder);
  let theme = useSelector((state) => state.loadedTierlist.tierlist.theme);
  function template(i, subtract, s, highlight) {
    //we are using hsl because it generates better gradients than rgba
    let nd = 38 + s;
    let l = 75 - subtract;
    l = Number.parseFloat(l).toFixed(4);
    nd = Number.parseFloat(nd).toFixed(0);
    return `
    .row:nth-child(${i + 1}) {
          background-color: ${`hsl(${highlight},${nd}%, ${l}%)`};
          transition: 0.3s;
         }
      `;
  }
  function getColorRows(numOfRows, theme) {
    let highlight;
    console.log(theme);
    switch (theme) {
      case "purple":
        highlight = "259";
        break;
      case "red":
        highlight = "0";
        break;
      case "brightRed":
        highlight = "0";
        break;
      case "blue":
        highlight = "236";
        break;
      case "brightBlue":
        highlight = "236";
        break;
      case "yellow":
        highlight = "57";
        break;
      case "brightYellow":
        highlight = "57";
        break;
      case "pink":
        highlight = "321";
        break;
      case "brightPink":
        highlight = "321";
        break;
      default:
        highlight = "259";
    }

    let str = "";
    let s = (100 - 38) / numOfRows;
    let segment = 75 / numOfRows;
    for (let index = 0; index < numOfRows; index += 1) {
      let subtract = segment * index;
      let nd = s * index;
      str += template(index, subtract, nd, highlight);
    }
    return str;
  }

  return (
    <StyledTL
      toolState={toolState}
      rowGenerator={getColorRows(rowOrder.length - 1, theme)}
    >
      {rowOrder?.map((item, idx) => {
        if (item !== "storage") {
          return (
            <Row key={item} index={idx} rowId={item} toolState={toolState} />
          );
        }
      })}
    </StyledTL>
  );
}

let leftToRight = keyframes`
from {
  transform: translate(-100%);
}
to {
  transform: translate(0%);
}
`

let StyledTL = styled.div`
  height: auto;
  width: 100%;
  /* background-color: #2d1365; */
  z-index: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${(props) => props.rowGenerator}
  .row {
    height: 125px;
    width: 100%;
    display: flex;

  }
  .title {
    width: 150px;
    height: 125px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    flex-shrink: 0;
  }
`;

export default Tierlist;
