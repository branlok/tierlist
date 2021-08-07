import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
import { StyledActionButton, StyledRow } from "../Modal/Styles/StyledTable";

function LocalStorageItem({ item, itemKeys, setItemWasDeleted }) {
  let { id } = useParams();
  let { id: itemId, dateAdded, fileName, picture: imageURL } = item;
  imageURL = useMemo(() => URL.createObjectURL(imageURL), [imageURL]);

  let [itemDetails, setItemDetails] = useState({
    decoration: null,
    description: "",
    id: itemId,
    imageURL: imageURL,
    name: "",
    resides: "storage",
    tierlistId: id,
  });

  //if current tierlist has this, render add,remove and button ui logic.
  let [existsCopy, setExistCopy] = useState(itemKeys.includes(itemId));
  let [confirmDelete, setConfirmDelete] = useState(false);

  let [disableButton, setDisableButton] = useState(false);
  let dispatch = useDispatch();

  let date = new Date(dateAdded);

  /**
   * function  conditionally dispatches between copying item  to tierlist or deleting item.
   *
   * @param {object} itemDetails
   * @param {boolean} remove
   */
  let handleAddToTierlist = async (itemDetails, remove) => {
    setDisableButton(true);
    if (remove) {
      //shallow delete - for components like explore
      await dispatch(deleteItemFromDB(itemId));
      //save state
      await dispatch(saveTierlist());
      setExistCopy((prevState) => !prevState);
    } else {
      //clone instance
      itemDetails.imageURL = imageURL;
      //make item instance
      await dispatch(syncNewItems(itemDetails));
      await dispatch(saveTierlist());
      setExistCopy((prevState) => !prevState);
    }
    setDisableButton(false);
  };

  let handleDeleteSource = async (itemId) => {
    //shallow delete  - for components like explore
    await dispatch(deleteItemFromDB(itemId));
    //deep delete  - for components like file explorer
    await dispatch(deleteSingleImageItem(itemId));
    await dispatch(saveTierlist()); //doesn't hurt to save again.
    //we will manually change our own ui because this is async is not tied to redux if item is deleted away from tierlist.
    setItemWasDeleted((prevState) => !prevState);
  };

  if (itemDetails) {
    return (
      <StyledRow confirmDelete={confirmDelete}>
        <td className="picture-column">
          <img className="image" src={imageURL}></img>
        </td>
        <td className="title tdTitle">
          {fileName.length > 0 ? fileName : "Untitled"}
        </td>
        <td className="date tdDate">{date.toLocaleTimeString()}</td>
        <td className="action">
          <StyledActionButton
            delete={existsCopy}
            confirmDelete={confirmDelete}
            disabled={disableButton}
            disable={confirmDelete}
            onClick={() => handleAddToTierlist(itemDetails, existsCopy)}
          >
            <AddSVG className="svg" />
          </StyledActionButton>
          <StyledActionButton
            bg={confirmDelete ? "#131313" : "#910715"}
            width={confirmDelete ? "fit" : ""}
            onClick={() => setConfirmDelete((prevState) => !prevState)}
          >
            {!confirmDelete ? <GargabeSVG className="svg" /> : "Cancel"}
          </StyledActionButton>
          {confirmDelete && (
            <StyledActionButton
              bg={"#910715"}
              width="fit"
              onClick={() => handleDeleteSource(itemId)}
            >
              Confirm
            </StyledActionButton>
          )}
        </td>
      </StyledRow>

      //   </StyledRow>
    );
  } else {
    return null;
  }
}

export default LocalStorageItem;
