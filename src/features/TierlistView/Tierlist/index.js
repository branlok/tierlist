import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Row from "./Row";

/* RENDERS ROWS */
function Tierlist() {
  let rows = useSelector((state) => state.loadedTierlist.rows);
  let rowOrder = useSelector((state) => state.loadedTierlist.rowOrder);

  return (
    <StyledTL>
      {rowOrder?.map((item, idx) => {
        if (item !== "storage") {
          return <Row key={item} rowId={item} />;
        }
      })}
    </StyledTL>
  );
}

let StyledTL = styled.div`
  height: auto;
  width: 100%;
  background-color: #2d1365;
  z-index: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .row:nth-child(1) {
    background-color: #c1b7db;
  }
  .row:nth-child(2) {
    background-color: #8c7cbe;
  }
  .row:nth-child(3) {
    background-color: #7a67b2;
  }
  .row:nth-child(4) {
    background-color: #4b3c7a;
  }
  .row:nth-child(5) {
    background-color: #332659;
  }
  .row:nth-child(6) {
    background-color: #180f30;
  }
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
  /* .row1 {
    background-color: #c1b7db;
  }
  .row2 {
    background-color: #8c7cbe;
  }
  .row3 {
    background-color: #7a67b2;
  } */
`;

export default Tierlist;
