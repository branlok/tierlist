import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import db from "../../../../db";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as GargabeSVG } from "../../../../Styles/svg/Gargabe.svg";
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
  let [confirmDelete, setConfirmDelete] = useState(false);
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
      <StyledRow confirmDelete={confirmDelete}>
        {/* <tr className="deleteOverlay">
          <td></td>
        </tr> */}
        <td className="picture-column">
          <img className="image" src={imageURL}></img>
        </td>
        <td className="title tdTitle">
          {fileName.length > 0 ? fileName : "Untitled"}
        </td>
        {/* <td className="instances">{}</td> */}
        <td className="date tdDate">{date.toLocaleTimeString()}</td>
        <td className="action">
          <div className="action-wrapper">
            <StyledActionButton
              delete={existsCopy}
              confirmDelete={confirmDelete}
              onClick={() => handleAddToTierlist(itemDetails, existsCopy)}
            >
              <AddSVG className="svg" />
            </StyledActionButton>

            <StyledActionButton
              bg={confirmDelete ? "#131313" : "#9c2525"}
              width={confirmDelete && "fit"}
              onClick={() => setConfirmDelete((prevState) => !prevState)}
            >
              {!confirmDelete ? <GargabeSVG className="svg" /> : "Cancel"}
            </StyledActionButton>
            {confirmDelete && (
              <StyledActionButton
                bg={"#9c2525"}
                width="fit"
                onClick={() => handleDeleteSource(itemId)}
              >
                Confirm
              </StyledActionButton>
            )}
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
  position: relative;
  background: linear-gradient(to right, transparent 50%, #9c2525 50%);
  /* background: linear-gradient(to right, red 50%, blue 50%); */
  background-size: 200% 100%;
  background-position: ${(props) =>
    props.confirmDelete ? "right bottom" : "left bottom"};
  /* margin-left: 10px; */
  transition: all 0.3s ease;

  :hover {
    color: white;
  }
  .deleteOverlay {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
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
    background-color: ${(props) =>
      props.confirmDelete ? "" : props.theme.main.accent};
  }
  .tdTitle {
    padding-left: 10px;
  }
  .tdDate {
    padding-left: 10px;
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
    width: 250px;
    span {
      margin: 0px 10px;
    }
  }
`;

export let StyledActionButton = styled.button`
  width: ${(props) => (props.width == "fit" ? "auto" : "40px")};
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${(props) => (props.delete ? "transparent" : "transparent")};
  margin-right: 10px;
  background-color: ${(props) => (props.bg ? props.bg : "#131313")};
  cursor: pointer;
  transition: 0.2s;
  opacity: ${(props) => (props.confirmDelete ? "0.3" : "1")};
  pointer-events: ${(props) => (props.confirmDelete ? "none" : "auto")};
  color: white;
  font-weight: bold;
  position: relative;
  :hover {
    transform: scale(1.05);
    border: 1px solid #e3e3e3;
  }
  .svg {
    transition: 0.3s;
    height: 13px;
    width: 13px;
    padding: 2px;
    margin: 0px;
    fill: ${(props) => (props.delete ? "#8f1313" : "white")};
    transform: ${(props) =>
      props.delete ? "rotate(-135deg)" : "rotate(0deg)"};
  }
`;
export default LocalStorageItem;
