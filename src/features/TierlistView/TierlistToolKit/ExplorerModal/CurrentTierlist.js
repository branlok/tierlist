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
    //When item updates, update arrangement.
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
  border-bottom: 1px solid gray;
  /* padding-left: 15px; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

let StyledExplorer = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  border-radius: 0px 0px 10px 10px;
  padding: 10px;
  /* background-color: rgba(0, 0, 0, 0.8); */
  overflow-y: scroll;
  user-select: none;
  scroll-behavior: smooth;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  /* justify-content: center; */
  .modal {
    width: calc(32%);
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  scrollbar-width: none;
`;

export default CurrentTierlist;
