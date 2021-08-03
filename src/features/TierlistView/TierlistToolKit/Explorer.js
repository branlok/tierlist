import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../db";
import DropdownSort from "./Explorer/DropdownSort";

import Item from "./Explorer/Item";
import Search from "./Search";
import { StyledHeader } from "./styles";

/**
 * Component returns ordered list of items query from indexeddb
 *
 * @returns list of ordered items in tierlist
 * **/

function Explorer() {
  let items = useSelector((state) => state.loadedTierlist.items);
  let [orderedItems, setOrderedItems] = useState([]);
  let [queryResult, setQueryResult] = useState(null);
  let [sort, setSort] = useState("[tierlistId+resides]");
  let { id } = useParams();

  useEffect(() => {
    //When item updates, update arrangement.
    console.log("this ran");
    let isMounted = true;
    if (Object.keys(items).length >= 0) {
      (async () => {
        const products = await db.items
          .where(sort)
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
  }, [items, sort]);
  return (
    <>
      <Search setQueryResult={setQueryResult} />
      <StyledWrapper className="explorer">
        <StyledHeader>
          <h1 className="title">Explorer</h1>
          <DropdownSort setSort={setSort} />
        </StyledHeader>

        <StyledExplorer>
          {queryResult
            ? queryResult.map((item, idx) => {
                return <Item key={item.id} item={items[item.id]} />;
              })
            : orderedItems.map((item, idx) => {
                return <Item key={item.id} item={items[item.id]} />;
              })}
        </StyledExplorer>
      </StyledWrapper>
    </>
  );
}

let StyledTools = styled.select`
  width: 100px;
  padding-left: 5px;
  font-size: 13px;
  border: 1px solid #666666;
  background-color: #434343;
  color: white;
  border-radius: 5px;
  height: 25px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

let StyledWrapper = styled.section`
  height: 100%;
  width: 100%;
  /* padding: 10px; */
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  border-radius: 10px;
  overflow: hidden;
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
