import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../db";

import Item from "./Explorer/Item";
import { StyledHeader } from "./styles";

/**
 * Component returns ordered list of items query from indexeddb
 *
 * @returns list of ordered items in tierlist
 * **/

function Explorer() {
  let items = useSelector((state) => state.loadedTierlist.items);

  let [orderedItems, setOrderedItems] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    //When item updates, update arrangement.
    let isMounted = true;
    if (Object.keys(items).length >= 0) {
      (async () => {
        const products = await db.items
          .where("[tierlistId+resides]")
          .between([id, "0"], [id, "\uffff"])
          .toArray((re) => {
            if (isMounted) {
              setOrderedItems(re);
            }
          });
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [items]);
  return (
    <StyledWrapper>
      <StyledHeader>
        <h1 className="title">Explorer</h1>
        <StyledTools />
      </StyledHeader>

      <StyledExplorer>
        {orderedItems.map((item, idx) => {
          return <Item key={item.id} item={items[item.id]} />;
        })}
      </StyledExplorer>
    </StyledWrapper>
  );
}

let StyledTools = styled.div`
  height: 20px;
  width: 100px;
  background-color: black;
  border-radius: 5px;
`;
// let StyledHeader = styled.div`
//   width: 100%;
//   height: 35px;
//   background-color: gray;
//   border-radius: 10px 10px 0px 0px;
//   color: white;
//   font-weight: bold;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   /* .filter {
//     height: 100%;
//     width: 100px;
//     background-color: black;
//     border-radius: 5px;
//   } */
// `;

let StyledWrapper = styled.section`
  height: calc(100% - 200px);
  width: 100%;
  /* padding: 10px; */
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 10px;
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 10px;
    flex-shrink: 0;
  }
`;

let StyledExplorer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  overflow-y: scroll;
  user-select: none;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  scrollbar-width: none;
`;

export default Explorer;
