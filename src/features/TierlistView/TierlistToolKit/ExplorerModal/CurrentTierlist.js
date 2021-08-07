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
  //   let [queryResult, setQueryResult] = useState(null);
  //search logic
  let [userSearch, setUserSearch] = useState(false);
  let [queryResult, setQueryResult] = useState(null);

  let [sort, setSort] = useState("[tierlistId+resides]");
  let { id } = useParams();

  //on load render items from store
  useEffect(() => {
    //When item updates, update arrangement.
    let isMounted = true;
    //we will only search if we are not using search
    if (!userSearch) {
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

  useEffect(() => {
    if (queryResult) {
      setUserSearch(true);
    } else {
      setUserSearch(false);
    }
  }, [queryResult]);

  return (
    <>
      <StyledSearchWrapper className="searchWrapper">
        <Search
          setQueryResult={setQueryResult}
          searchType={"search/items/name"}
          setUserSearch={setUserSearch}
        />
      </StyledSearchWrapper>
      <StyledExplorer>
        <StyledNoneFound visible={queryResult?.length == 0}>
          {queryResult?.length == 0 && "No Results Found"}
        </StyledNoneFound>
        {userSearch
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

let StyledNoneFound = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

let StyledSearchWrapper = styled.div`
  height: 80px;
  width: 100%;
  padding: 0px 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid ${(props) => props.theme.main.accent};
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
