import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as CrossDeleteSVG } from "../../../Styles/svg/CrossDelete.svg";
import { ReactComponent as EditPenSVG } from "../../../Styles/svg/EditPen2.svg";

import {
  editRowInfo,
  returnToStorage,
  saveTierlist,
  updateOrderInRow,
} from "../TierlistSlice";

function RowTitle({ row }) {
  let [edit, setEdit] = useState(false);
  let [title, setTitle] = useState(row.name);
  let titleInputRef = useRef();

  const dispatch = useDispatch();

  //   let rowId = row.id;
  useEffect(() => {
    if (edit) {
      titleInputRef.current.focus();
    }
  }, [edit]);

  let removeRowContent = async (row, rowId) => {
    let itemOrder = row.itemOrder;
    for (let i of itemOrder) {
      //update item index
      await dispatch(
        updateOrderInRow({
          destination: { droppableId: "storage" },
          source: { droppableId: row.id },
          draggableId: i,
        })
      );
    }
    //reallocate items to storage, then delete row
    dispatch(returnToStorage({ rowItems: row.itemOrder, rowId: row.id }));
    await dispatch(saveTierlist());
  };

  let handleSubmitTitle = async (e) => {
    e.preventDefault();
    dispatch(editRowInfo({ id: row.id, field: "name", newValue: title }));
    await dispatch(saveTierlist());
    setEdit(false);
  };

  return (
    <StyledRowTitle>
      <div className="row-tools">
        <button
          className="delete-button"
          onClick={() => removeRowContent(row, row.id)}
        >
          <CrossDeleteSVG className="delete-cross" />
        </button>
        <button className="edit-button" onClick={() => setEdit(true)}>
          <EditPenSVG className="editSVG" />
        </button>
      </div>

      {edit ? (
        <form onSubmit={handleSubmitTitle}>
          <input
            ref={titleInputRef}
            className="input-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </form>
      ) : (
        <h2 onClick={() => setEdit(true)}>{row.name}</h2>
      )}
    </StyledRowTitle>
  );
}

let StyledRowTitle = styled.div`
  width: 150px;
  height: 125px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  position: relative;
  padding: 10px;

  //this gives a desaturated look
  background-color: rgba(0,0,0,0.3);

  :hover > .row-tools {
    transform: translateX(0px);
  }
  h2 {
    margin: 0px;
  }
  .row-tools {
    position: absolute;
    width: 40px;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    transform: translateX(-30px);
    transition: 0.2s;
    :hover {
      transform: translateX(0px);
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
  .delete-button {
    /* position: absolute;
    top: 5px;
    left: 0px; */
    background-color: transparent;
    border-style: none;
    cursor: pointer;
    .delete-cross {
      fill: rgba(255, 255, 255, 0.6);
      background-color: transparent;
      width: 10px;
      height: 10px;
      padding: 5px;
      /* border: 1px solid white; */
      /* background-color: rgba(255,255,255,0.1); */
      transition: 0.3s;
      :hover {
        transform: rotate(90deg);
        fill: rgba(255, 0, 0, 0.8);
      }
    }
  }
  .edit-button {
    /* position: absolute;
    top: 25px;
    left: 6px; */
    padding: 5px;
    border-style: none;
    background-color: transparent;
    .editSVG {
      height: 10px;
      width: 10px;
      fill: rgba(255, 255, 255, 0.6);
      transition: 0.3s;
      cursor: pointer;
      :hover {
        fill: rgba(255, 255, 255, 1);
      }
    }
  }
  form {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .input-title {
      font-size: 20px;
      border-style: none;
      background-color: transparent;
      width: 100%;
      height: 100%;
      color: white;
      font-weight: bold;
      text-align: center;
      border-bottom: 4px solid white;
      :focus {
        outline: none;
      }
    }
  }
`;

export default RowTitle;
