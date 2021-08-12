import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../../../db";

import DropdownSort from "../../ExpandedToolkit/Explorer/DropdownSort";
import Item from "../../ExpandedToolkit/Explorer/Item";
import Search from "../../Search";
import LocalStorageItem from "./LocalStorageItem";

import { ReactComponent as SortBySVG } from "../../../../../Styles/svg/triangle.svg";
import { ReactComponent as AddSVG } from "../../../../../Styles/svg/Add2.svg";
import { ReactComponent as GargabeSVG } from "../../../../../Styles/svg/Gargabe.svg";
import { ReactComponent as InfoSVG } from "../../../../../Styles/svg/info.svg";
import { ReactComponent as ArrowSVG } from "../../../../../Styles/svg/arrow.svg";
import StyledTable, {
  StyledActionButton,
  StyledCol,
} from "../Styles/StyledTable";
import PaginationButtons from "../PaginationButtons";
import InstructionOverlay from "../InstructionOverlay";
import useAsync from "../../../../../customHooks/useAsync";
import { fadeIn } from "../../../../../GlobalStyles";

let fetchTierlists = async (db, table, index, reverse, page, pageSize) => {
  if (!reverse) {
    return await db[table]
      .orderBy(index)
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray((response) => {
        return response;
      });
  } else {
    return await db[table]
      .orderBy(index)
      .reverse()
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray((response) => {
        return response;
      });
  }
};

/**
 * Component renders either searched results or default(all) results of items uploaded
 */
function LocalStorage() {
  let items = useSelector((state) => state.loadedTierlist.items);

  //default operations - variables to list all items avaliable on indexeddb.
  let [orderedItems, setOrderedItems] = useState([]);
  let [reverse, setReverse] = useState(false);
  let category = "dateAdded"; //current only dateAdded is sortable.
  let [page, setPage] = useState(0);
  let [itemWasDeleted, setItemWasDeleted] = useState(false);
  let pageSize = 5;
  //hook to fetch default operations.
  let { execute, status, value, error } = useAsync(fetchTierlists, false);

  //override default with search variables
  let [userSearch, setUserSearch] = useState(false);
  let [queryResult, setQueryResult] = useState(null);

  //misc
  let [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (!userSearch) {
      execute(db, "images", category, reverse, page, pageSize);
    }
  }, [category, reverse, page, itemWasDeleted]);

  useEffect(() => {
    if (status == "success") {
      setOrderedItems(value);
    } else if (status == "error") {
      console.log(error);
      //TODO : error handle
    }
  }, [status, value, itemWasDeleted]);

  //   useEffect(() => {
  //     if (itemWasDeleted) {
  //       setItemWasDeleted(false);
  //     }
  //   }, [itemWasDeleted]);

  // if search component reuturn queryResult with value,
  // overridedefault and show userSearch results
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
          searchType={"search/images/fileName"}
          setUserSearch={setUserSearch}
        />
      </StyledSearchWrapper>
      <StyledExplorer disableScroll={showInstructions}>
        {showInstructions && (
          <InstructionOverlay setShowInstructions={setShowInstructions} />
        )}
        <div className="tierlistBrowser">
          <StyledTable orderByDate={reverse}>
            <thead>
              <tr>
                <th className="picture">Image</th>
                <th className="title">Title</th>
                <th
                  className="date"
                  onClick={() => setReverse((prevState) => !prevState)}
                >
                  <StyledCol
                    reverse={reverse}
                    selected={category == "dateAdded"}
                  >
                    Date Added
                    <SortBySVG className="sortingSVG" />
                  </StyledCol>
                  {/* Date Added <SortBySVG className="sortSVG" /> */}
                </th>
                <th
                  className="action"
                  onClick={() => setShowInstructions(true)}
                >
                  Actions <InfoSVG className="infoSVG" />
                </th>
              </tr>
            </thead>
            <tbody>
              {(userSearch ? queryResult : orderedItems).map((item) => {
                return (
                  <LocalStorageItem
                    key={item.id}
                    item={item}
                    itemKeys={Object.keys(items)}
                    setItemWasDeleted={setItemWasDeleted}
                  />
                );
              })}
            </tbody>
          </StyledTable>
          <PaginationButtons
            page={page}
            setPage={setPage}
            itemLength={orderedItems.length}
            hide={userSearch}
          />
        </div>
      </StyledExplorer>
    </>
  );
}

export let StyledSearchWrapper = styled.div`
  height: 80px;
  width: 100%;
  padding: 20px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid ${(props) => props.theme.main.accent};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;



let StyledExplorer = styled.div`
  height: calc(100% - 80px);
  width: 100%;
  overflow-y: ${(props) => (props.disableScroll ? "hidden" : "scroll")};
  scroll-behavior: smooth;
  display: flex;
  opacity: 0;
  flex-direction: column;
  position: relative;
  animation: ${fadeIn} 0.3s ease forwards;
  animation-delay: 0.5s;
  .tierlistBrowser {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100%;
    /* position: relative; */
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  scrollbar-width: none;
`;

export default LocalStorage;
