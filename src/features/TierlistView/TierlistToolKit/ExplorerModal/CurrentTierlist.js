import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../../db";

import DropdownSort from "../Explorer/DropdownSort";
import Item from "../Explorer/Item";
import Search from "../Search";

function CurrentTierlist() {
  let items = useSelector((state) => state.loadedTierlist.items);
  let [orderedItems, setOrderedItems] = useState([]);
  let [queryResult, setQueryResult] = useState(null);
  let [sort, setSort] = useState("[tierlistId+resides]");
  let { id } = useParams();

  useEffect(() => {
    console.log("run 1");
    let isMounted = true;
    if (Object.keys(items).length >= 0) {
      (async () => {
        console.log("run 3");
        const products = await db.items
          .where(sort)
          .between([id, "0"], [id, "\uffff"])
          .toArray((re) => {
            if (isMounted) {
              console.log("run 4", re);
              setOrderedItems(re);
            }
          });
      })();

      return () => {
        isMounted = false;
      };
    } else {
      console.log("nothing");
    }
  }, [items, sort]);
  console.log(items, orderedItems);
  return (
    <>
      <StyledSearchWrapper className="searchWrapper">
        <Search setQueryResult={setQueryResult} />
        <DropdownSort setSort={setSort} />
      </StyledSearchWrapper>
      <StyledExplorer>
        {queryResult
          ? queryResult.map((item, idx) => {
              return <Item key={item.id} item={items[item.id]} />;
            })
          : orderedItems.map((item, idx) => {
              return <Item key={item.id} item={items[item.id]} />;
            })}
      </StyledExplorer>
    </>
  );
}

let StyledSearchWrapper = styled.div`
  height: 80px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid ${(props) => props.theme.main.accent};
  /* padding-left: 15px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

let StyledExplorer = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  padding: 10px;
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
    @media only screen and (min-width: 900px) {
      max-width: calc(100% / 2 - 10px);
    }
    @media only screen and (min-width: 1300px) {
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

export default CurrentTierlist;
