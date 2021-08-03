import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import db from "../../../../db";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as CheckedSVG } from "../../../../Styles/svg/check.svg";
import {
  deleteItem,
  deleteItemFromDB,
  deleteSingleImageItem,
  saveTierlist,
  syncNewItems,
} from "../../TierlistSlice";

function LocalStorageItem({ fileName, imageURL, itemId, itemKeys, dateAdded }) {
  let [itemDetails, setItemDetails] = useState(null);
  let [existsCopy, setExistCopy] = useState(itemKeys.includes(itemId));
  let [deleted, setDeleted] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (itemId) {
      (async () => {
        await db.items.where({ id: itemId }).toArray((re) => {
          if (isMounted) {
            setItemDetails(re[0]);
          }
        });
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [itemId]);

  let date = new Date(dateAdded);

  let handleAddToTierlist = async (itemDetails, remove) => {
    if (remove) {
      await dispatch(deleteItemFromDB(itemId));
      await dispatch(saveTierlist());
      setExistCopy((prevState) => !prevState);
    } else {
      //clone instance
      itemDetails.imageURL = imageURL;
      await dispatch(syncNewItems(itemDetails));
      await dispatch(saveTierlist());
      setExistCopy((prevState) => !prevState);
    }
  };

  let handleDeleteSource = async (itemDetails) => {
    await dispatch(deleteItemFromDB(itemDetails)); //do a shallow delete
    await dispatch(deleteSingleImageItem(itemDetails)); //do a full delete and tag.
    await dispatch(saveTierlist()); //doesn't hurt to save again.

    //we will manually change our own ui because this is async is not tied to redux if item is deleted away from tierlist.
    setDeleted(true);
  };

  if (deleted) return null;
  if (itemDetails) {
    return (
      //   <StyledRow>
      <StyledRow>
        <td className="picture-column">
          <img className="image" src={imageURL}></img>
        </td>
        <td className="filename">
          {fileName.length > 0 ? fileName : "Untitled"}
        </td>
        <td className="instances">{}</td>
        <td className="dateAdded">{date.toLocaleTimeString()}</td>
        <td className="action">
          <div className="action-wrapper">
            <StyledActionButton
              delete={existsCopy}
              onClick={() => handleAddToTierlist(itemDetails, existsCopy)}
            >
              <AddSVG className="svg" />
            </StyledActionButton>
            <button onClick={() => handleDeleteSource(itemId)}>
              Delte Forever
            </button>
          </div>
        </td>
      </StyledRow>

      //   </StyledRow>
    );
  } else {
    return null;
  }
}
let StyledRow = styled.tr`
  height: 50px;
  width: 100%;
  padding: 5px;
  transition: 0.2s;
  color: gray;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  :hover {
    color: white;
  }
  .picture-column {
    width: 100px;
    text-align: center;
    vertical-align: middle;
  }
  /* :nth-child(even) {
    background: #111111;
  }
  :nth-child(odd) {
    background: #181818;
  } */
  :hover {
    background-color: ${(props) => props.theme.main.accent};
  }
  .image {
    height: 50px;
    width: 50px;
    object-fit: cover;
    overflow: hidden;
  }
  td {
    text-align: start;
    vertical-align: middle;
    font-weight: bold;
    font-size: 14px;
    height: 70px;
    /* border-right: 1px solid ${(props) => props.theme.main.accent}; */
    /* padding-left: 10px; */
  }
  .action-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    span {
      margin: 0px 10px;
    }
  }
  .filename {
    /* white-space: nowrap; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */

    width: calc(100% - 550px);
  }
  .dateAdded {
    width: 100px;
  }
`;

let StyledActionButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.delete ? "transparent" : "#212121")};
  margin-right: 10px;
  background-color: #131313;
  cursor: pointer;
  transition: 0.2s;
  :hover {
    transform: scale(1.1);
    background-color: #212121;
  }

  .svg {
    /* fill: white; */
    transition: 0.3s;
    height: 13px;
    width: 13px;
    padding: 8px;
    margin: 0px;
    fill: ${(props) => (props.delete ? "#8f1313" : "white")};
    transform: ${(props) => (props.delete ? "rotate(-45deg)" : "rotate(0deg)")};
  }
  .delete {
    fill: #8f1313;
    transform: rotate(45deg);
  }
`;
export default LocalStorageItem;
