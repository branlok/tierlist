import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../../db";

import DropdownSort from "../Explorer/DropdownSort";
import Item from "../Explorer/Item";
import Search from "../Search";
import LocalStorageItem, { StyledActionButton } from "./LocalStorageItem";

import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as GargabeSVG } from "../../../../Styles/svg/Gargabe.svg";
import { ReactComponent as InfoSVG } from "../../../../Styles/svg/info.svg";
function LocalStorage() {
  let items = useSelector((state) => state.loadedTierlist.items);
  let [orderedItems, setOrderedItems] = useState([]);
  let [queryResult, setQueryResult] = useState(null);
  let [sort, setSort] = useState("[tierlistId+resides]");
  let [columnSort, setColumnSort] = useState("dateAdded");
  let [reverseColumn, setReverseColumn] = useState(false);
  let [showInstructions, setShowInstructions] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    //When item updates, update arrangement.
    let isMounted = true;
    if (Object.keys(items).length >= 0) {
      (async () => {
        if (reverseColumn) {
          await db.images.orderBy(columnSort).toArray((re) => {
            if (isMounted) {
              setOrderedItems(re);
            }
          });
        } else {
          await db.images
            .orderBy(columnSort)
            .reverse()
            .toArray((re) => {
              if (isMounted) {
                setOrderedItems(re);
              }
            });
        }
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [items, sort, columnSort, reverseColumn]);

  return (
    <>
      <StyledSearchWrapper className="searchWrapper">
        <Search setQueryResult={setQueryResult} />
        <DropdownSort setSort={setSort} />
      </StyledSearchWrapper>
      <StyledExplorer disableScroll={showInstructions}>
        {showInstructions && (
          <StyledInfoOverlay onClick={() => setShowInstructions(false)}>
            <h1>Action Instructions</h1>
            <div className="instruction">
              <StyledActionButton>
                <AddSVG className="svg" />
              </StyledActionButton>
              <div className="instruction-text">
                <span className="main">Adds to current tierlist</span>
              </div>
            </div>
            <div className="instruction">
              <StyledActionButton delete={true}>
                <AddSVG className="svg" />
              </StyledActionButton>
              <div className="instruction-text">
                <span className="main">Removes from current tierlist</span>
                <span className="extra">
                  *if only instance, file will be deleted
                </span>
              </div>
            </div>
            <div className="instruction">
              <StyledActionButton bg={"#9c2525"}>
                <GargabeSVG className="svg" />
              </StyledActionButton>
              <div className="instruction-text">
                <span className="main"> Delete file and all instances</span>
              </div>
            </div>
            <div className="footnote">Click anywhere to exit</div>
          </StyledInfoOverlay>
        )}
        <table>
          <thead>
            <tr>
              <th className="picture">Image</th>
              <th className="title">Title</th>
              {/* <th className="instances">Instances</th> */}
              <th
                className="date"
                onClick={() => setReverseColumn((prevState) => !prevState)}
              >
                Date Added
              </th>
              <th className="action" onClick={() => setShowInstructions(true)}>
                Actions <InfoSVG className="infoSVG" />
              </th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item) => {
              // console.log(item);
              let imageURL = URL.createObjectURL(item.picture);
              return (
                <LocalStorageItem
                  key={item.id}
                  imageURL={imageURL}
                  itemId={item.id}
                  itemKeys={Object.keys(items)}
                  dateAdded={item.dateAdded}
                  fileName={item.fileName}
                />
              );
            })}
          </tbody>
        </table>
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
  flex-direction: column;
  position: relative;
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

let StyledInfoOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  .instruction {
    background-color: #262626;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 5px;
    width: 250px;
    .svg {
      margin: 5px;
    }
    .instruction-text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .main {
        font-size: 12px;
        font-weight: bold;
      }
      .extra {
        font-size: 10px;
        color: gray;
      }
    }
  }
  .footnote {
    font-size: 12px;
    margin-top: 20px;
  }
`;

export default LocalStorage;
