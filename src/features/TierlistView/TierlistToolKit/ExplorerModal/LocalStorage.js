import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../../db";

import DropdownSort from "../Explorer/DropdownSort";
import Item from "../Explorer/Item";
import Search from "../Search";
import LocalStorageItem from "./LocalStorageItem";

function LocalStorage() {
  let items = useSelector((state) => state.loadedTierlist.items);
  let [orderedItems, setOrderedItems] = useState([]);
  let [queryResult, setQueryResult] = useState(null);
  let [sort, setSort] = useState("[tierlistId+resides]");
  let [columnSort, setColumnSort] = useState("dateAdded");
  let [reverseColumn, setReverseColumn] = useState(false);
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
      <StyledExplorer>
        <table>
          <thead>
            <tr>
              <th className="picture">Image</th>
              <th className="title">Title</th>
              <th className="instances">Instances</th>
              <th
                className="date"
                onClick={() => setReverseColumn((prevState) => !prevState)}
              >
                Date Added
              </th>
              <th className="action">Action</th>
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
  overflow-y: scroll;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
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
    width: calc(100% - 550px);
  }
  .date {
    width: 150px;
  }
  .action {
    width: 200px;
  }
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  scrollbar-width: none;
`;

export default LocalStorage;
