import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import db from "../../../../db";
import { editItemTitle, updateItemDetails } from "../../TierlistSlice";
import { ReactComponent as EditPenSVG } from "../../../../Styles/svg/EditPen.svg";
import Description from "./Description";
import { useRef } from "react";
import scrollInto from "../../../utils/scrollInto";

function Item({ item }) {
  //better appraoch to use api from indexeddb
  //if adding sort, like sort by api rank, need asign weight to each row.
  //adding serach abilities
  let rowReference = useSelector((state) => state.loadedTierlist.rows);
  let dispatch = useDispatch();
  let [title, setTitle] = useState(item?.name);
  let [showTitleEdit, setShowTitleEdit] = useState(
    item?.name?.length == 0 ? true : false
  );
  let titleEditRef = useRef();

  const handleSubmit = async (e) => {
    //run dispatch to edit redux
    // console.log(item.id);
    e.preventDefault();
    await dispatch(
      updateItemDetails({ itemId: item.id, content: title, field: "name" })
    );
    // dispatch(editItemTitle({ id: item.id, newValue: title, field: "name" }));
    //run async sve to indexeddb
    setShowTitleEdit(false);

    //save subset
  };

  useEffect(() => {
    if (showTitleEdit && title) {
      titleEditRef.current.focus();
    }
  }, [showTitleEdit]);

  if (!item) return null;
  return (
    <StyledItem id={`explorer-${item.id}`} className="modal">
      <img className="itemImage" src={item.imageURL}></img>
      <StyledItemContent>
        <div className="top">
          {showTitleEdit ? (
            <form
              onSubmit={handleSubmit}
              onKeyDown={(e) => {
                e.key == "Tab" && handleSubmit(e);
              }}
            >
              <input
                ref={titleEditRef}
                className="input-title"
                placeholder="add title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
          ) : (
            <p
              className="title"
              onClick={() => {
                setShowTitleEdit(true);
              }}
            >
              {item.name} <EditPenSVG className="svg" />
            </p>
          )}

          <div className="tag" onClick={() => scrollInto("row", item.resides)}>
            <p>{rowReference[item.resides].name}</p>
          </div>
        </div>
        <Description itemId={item.id} itemDescription={item.description} />
        {/* <textarea className="input-description" placeholder="add note" /> */}
        {/* <button className="save-button">Save</button> */}
      </StyledItemContent>
      <StlyedBG src={item.imageURL} />
    </StyledItem>
  );
}

let fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

let StyledItem = styled.div`
  width: calc(100% - 10px);
  height: 125px;
  display: flex;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #3b3b3b;
  /* min-width: 200px; */
  /* padding: 10px; */
  margin: 5px;
  animation: ${fadeIn} 1s ease forwards;
  .itemImage {
    /* height: calc(100% - 20px); */
    width: 80px;
    object-fit: cover;
    flex-shrink: 0;
    z-index: 1;
    /* margin: 10px; */
    /* border-radius: 5px; */
    overflow: hidden;
  }
`;

let StyledItemContent = styled.div`
  width: 100%;
  height: 125px;
  z-index: 1;
  /* margin: 10px 0px; */
  display: flex;
  flex-direction: column;
  /* backdrop-filter: blur(3px); */
  .top {
    width: 100%;
    height: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    .title {
      background-color: transparent;
      border-style: none;
      color: white;
      font-weight: bold;
      width: 100%;
      height: 25px;
      padding-left: 10px;
      font-size: 13px;

      /* text-align: center; */
      display: flex;
      align-items: center;
      .svg {
        fill: gray;
        height: 10px;
        margin-left: 5px;
        cursor: pointer;
        :hover {
          fill: white;
        }
      }
    }
    color: white;
    form {
      width: 100%;
      display: flex;
      .input-title {
        background-color: transparent;
        border-style: none;
        color: white;
        font-weight: bold;
        width: 100%;
        margin: 0px;
        padding-right: 10px;
        padding-left: 10px;
        font-size: 13px;
        height: 25px;
        border-left: 2px solid transparent;
        :focus {
          border-left: 2px solid white;
          outline: none;
        }
      }
    }
    .tag {
      flex-shrink: 0;
      padding: 0px 20px;
      font-size: 12px;
      height: 25px;
      /* margin-right: 5px; */
      width: auto;
      max-width: 200px;
      margin-right: 10px;
      border: 1px solid gray;

      background-color: rgba(255, 255, 255, 0.2);
      /* backdrop-filter: blur(10px); */
      border-radius: 20px;
      text-align: center;
      display: flex;
      justify-content: flex-start;
      text-align: start;
      align-items: center;
      user-select: text;
      transition: 0.3s;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

let StlyedBG = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  opacity: 0.2;
  object-fit: cover;
  object-position: center center;
`;

export default Item;
