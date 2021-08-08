import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useAsync from "../../../../customHooks/useAsync";

import db from "../../../../db";
import { StyledBody, StyledHeader, StyledModule } from "../ExplorerModal";
import { StyledSearchWrapper } from "../ExplorerModal/LocalStorage";
import Search from "../Search";
import { StyledOverlay } from "../styles";
import Table from "./Table";

/**
 * Component renders either searched results or default(all) results of tierlists made
 */
function MyTierlistModal({ modalOpen, setModalOpen }) {
  //default operations - variables to list all tierlists avaliable on indexeddb.
  let [tierlists, setTierlists] = useState([]);
  let [reverse, setReverse] = useState(true); //true: sorts newest to olddest
  let [category, setCategory] = useState("date");
  //hooks to fetch default operations.
  let { execute, status, value, error } = useAsync(fetchTierlists, false);

  //override default with search variables
  let [userSearch, setUserSearch] = useState(false); //toggle use search tierlist instead.
  let [queryResult, setQueryResult] = useState(null); //exchange from search component to store searched tierlist data

  useEffect(() => {
    if (!userSearch) {
      execute(db, "tierlists", category, reverse);
    }
  }, [reverse, category]);

  useEffect(() => {
    if (status == "success") {
      setTierlists(value);
    } else if (status == "error") {
      console.log(error);
      //TODO : error handle
    }
  }, [status, value]);

  useEffect(() => {
    if (queryResult) {
      setUserSearch(true);
    } else {
      setUserSearch(false);
    }
  }, [queryResult]);

  //listen for escape to exit modal
  useEffect(() => {
    let handleCloseModal = function (event) {
      if (event.key === "Escape") {
        //do something
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleCloseModal);
    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  return (
    <StyledOverlay
      onClick={(e) => {
        e.preventDefault();
        setModalOpen(false);
      }}
    >
      <StyledModule onClick={(e) => e.stopPropagation(e)}>
        <StyledHeader>
          <div className="spacing"></div>
          <div className="right">My Tierlists</div>
        </StyledHeader>
        <div className="bodyWrapper">
          <StyledBody active={true} height={"full"}>
            <div className="leftColumn">Tierlists Made</div>
            <div className="body">
              <StyledSearchWrapper className="searchWrapper">
                <Search
                  setQueryResult={setQueryResult}
                  searchType={"search/tierlists/name"}
                  setUserSearch={setUserSearch}
                />
              </StyledSearchWrapper>
              <StyledScrollable className="fullScroll">
                <StyledListTierlists>
                  <Table
                    tierlists={userSearch ? queryResult : tierlists}
                    reverse={reverse}
                    setReverse={setReverse}
                    setCategory={setCategory}
                    category={category}
                    disableSort={userSearch}
                  />
                </StyledListTierlists>
              </StyledScrollable>
            </div>
          </StyledBody>
        </div>
      </StyledModule>
    </StyledOverlay>
  );
}

/**
 * async function to fetch data from indexeddb
 *
 * @param {*} db - indexeddb instance
 * @param {string} table - indexeddb table name
 * @param {string} index - indexeddb indexedb
 * @param {boolean} reverse - toggle reverse order or not
 * @returns
 */
let fetchTierlists = async (db, table, index, reverse) => {
  if (!reverse) {
    return await db[table]
      .orderBy(index)
      .reverse(index)
      .toArray((response) => {
        return response;
      });
  } else {
    return await db[table].orderBy(index).toArray((response) => {
      return response;
    });
  }
};

let StyledListTierlists = styled.div`
  width: 100%;
  height: 100%;
`;

let StyledScrollable = styled.div`
  height: calc(100% - 80px);
  width: 100%;
`;

export default MyTierlistModal;
