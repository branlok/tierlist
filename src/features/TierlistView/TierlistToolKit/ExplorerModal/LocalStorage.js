import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import db from "../../../../db";

import DropdownSort from "../Explorer/DropdownSort";
import Item from "../Explorer/Item";
import Search from "../Search";
import LocalStorageItem from "./LocalStorageItem";

import { ReactComponent as SortBySVG } from "../../../../Styles/svg/triangle.svg";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as GargabeSVG } from "../../../../Styles/svg/Gargabe.svg";
import { ReactComponent as InfoSVG } from "../../../../Styles/svg/info.svg";
import { ReactComponent as ArrowSVG } from "../../../../Styles/svg/arrow.svg";
import StyledTable, {
  StyledActionButton,
  StyledCol,
} from "../Modal/Styles/StyledTable";
import PaginationButtons from "../Modal/PaginationButtons";
import InstructionOverlay from "../Modal/InstructionOverlay";
import useAsync from "../../../../customHooks/useAsync";

let fetchTierlists = async (db, table, index, reverse, page, pageSize) => {
  if (!reverse) {
    return await db[table]
      .orderBy(index)
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray((response) => {
        console.log(response, "Dew");
        return response;
      });
  } else {
    return await db[table]
      .orderBy(index)
      .reverse()
      .offset(page * pageSize)
      .limit(pageSize)
      .toArray((response) => {
        console.log(response, "Dew");
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
      console.log(status, value, "read me");
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

let fadeIn = keyframes`
from {
opacity: 0
}
to {
opacity: 1;
}
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
  table {
    overflow: hidden;
    table-layout: fixed;
    thead {
      background-color: #131313;
      box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25), 0 5px 10px rgba(0, 0, 0, 0.22);
      position: sticky;
      top: 0;
      z-index: 1;
      th {
        text-align: start;
        vertical-align: middle;
        font-weight: bold;
        padding-left: 10px;
        color: #e3e3e3;
        font-size: 13px;
        /* width: 100%; */
      }
    }
  }
  .instances {
    width: 100px;
  }
  .picture {
    text-align: center;
    vertical-align: middle;
    height: 50px;
    width: 100px;
    padding: 5px;
    /* padding: 10px; */
  }
  .title {
    /* width: calc(100% - 650px); */
    max-width: 150px;
    /* max-width: 400px; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .date {
    width: 200px;
  }
  .action {
    width: 250px;
    position: relative;
    .infoSVG {
      height: 10px;
      width: 10px;
      fill: white;
      margin-left: 10px;
    }
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  scrollbar-width: none;
`;

// let StyledInfoOverlay = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.8);
//   position: absolute;
//   backdrop-filter: blur(10px);
//   top: 0px;
//   left: 0px;
//   z-index: 2;
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   align-items: center;
//   h1 {
//     margin-bottom: 10px;
//     font-size: 20px;
//   }
//   .instruction {
//     background-color: #262626;
//     padding: 5px;
//     border-radius: 5px;
//     display: flex;
//     justify-content: flex-start;
//     align-items: center;
//     margin: 5px;
//     width: 250px;
//     .svg {
//       margin: 5px;
//     }
//     .instruction-text {
//       display: flex;
//       flex-direction: column;
//       justify-content: space-around;
//       .main {
//         font-size: 12px;
//         font-weight: bold;
//       }
//       .extra {
//         font-size: 10px;
//         color: gray;
//       }
//     }
//   }
//   .footnote {
//     font-size: 12px;
//     margin-top: 20px;
//   }
// `;

export default LocalStorage;
