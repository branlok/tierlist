import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import RowTitle from "../../../Tierlist/RowTitle";

function MockTierlist({ orientation }) {
  console.log("what");
  let rowOrder = useSelector((state) => state.loadedTierlist.rowOrder);
  let theme = useSelector((state) => state.loadedTierlist.tierlist.theme);

  return (
    <StyledMockTierlist
      orientation={orientation}
      rowGenerator={getColorRows(rowOrder.length - 1, theme)}
    >
      {rowOrder.map((item, idx) => {
        if (item !== "storage") {
          return <MockRow key={item} index={idx} rowId={item} />;
        }
      })}
    </StyledMockTierlist>
  );
}

function MockRow({ rowId }) {
  let row = useSelector((state) => state.loadedTierlist.rows[rowId]);
  console.log(row);
  return (
    <div className="row">
      <MockRowTitle row={row} />
      <StyledMockRow>
        {row.itemOrder.map((item, idx) => {
          return <MockItem key={item} itemId={item} />;
        })}
      </StyledMockRow>
    </div>
  );
}

function MockRowTitle({ row }) {
  return (
    <StyledRowTitle>
      <p>{row.name}</p>
    </StyledRowTitle>
  );
}

function MockItem({ itemId }) {
  console.log(itemId);
  let { imageURL } = useSelector((state) => state.loadedTierlist.items[itemId]);
  console.log(imageURL);
  return (
    <StyledMockItem>
      <img className="image" src={imageURL} />
    </StyledMockItem>
  );
}

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

let StyledMockTierlist = styled.div`
  width: 400px;
  @media only screen and (min-width: 1700px) {
    width: 500px;
  }
  ${(props) => props.rowGenerator}
  .row {
    /* display: flex;
      height: auto; */
  }
`;

let StyledMockRow = styled.div`
  /* height: 125px; */
  /* min-height: 50px; */
  @media only screen and (min-width: 0px) {
    /* min-width: 50px; */
  }
  @media only screen and (min-width: 1700px) {
    /* min-height: 100px; */
  }
  display: flex;
  flex-wrap: wrap;
`;

let StyledRowTitle = styled.div`
  height: 30px;
  /* width: 50px; */
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: left;
  font-size: 12px;
  background: rgb(0,0,0);
background: linear-gradient(0deg, rgba(0,0,0,0.1) 0%, rgba(0,212,255,0) 70%);
  /* background-color: rgba(0, 0, 0, 0.3); */
`;

let StyledMockItem = styled.div`
  @media only screen and (min-width: 0px) {
    max-width: 50px;
    max-height: 50px;
  }
  @media only screen and (min-width: 1700px) {
    max-width: 100px;
    max-height: 100px;
  }
  overflow: hidden;

  .image {
    object-fit: cover;
    @media only screen and (min-width: 0px) {
      height: 50px;
      width: 50px;
    }
    @media only screen and (min-width: 1700px) {
      width: 100px;
      height: 100px;
    }
  }
`;

export default MockTierlist;
