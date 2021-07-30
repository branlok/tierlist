import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addNewRow,
  editTierlistInfo,
  loadTierlist,
  saveTierlist,
} from "../TierlistSlice";
import { ReactComponent as AddSVG } from "../../../Styles/svg/Add2.svg";
import { useEffect } from "react";
import { useState } from "react";
function TierlistHeaders() {
  let [editMode, setEditMode] = useState(false);
  let [newTitle, setNewTitle] = useState("");
  console.log(newTitle);

  let dispatch = useDispatch();
  let newRowId = useSelector(
    (state) =>
      state.loadedTierlist.rowOrder[state.loadedTierlist.rowOrder.length - 1]
  );
  let title = useSelector((state) => state.loadedTierlist.tierlist.title);

  useEffect(() => {
    if (newRowId !== "storage") {
      console.log(newRowId);
      scrollToItem("row", newRowId);
    }
  }, [newRowId]);

  let scrollToItem = (prefix, id) => {
    let item = document.getElementById(`${prefix}-${id}`);
    if (item) {
      item.scrollIntoView({ behaviour: "smooth", block: "end" });
    }
  };

  let addRowAndSave = async () => {
    dispatch(addNewRow());
    await dispatch(saveTierlist());
  };

  let handleSubmitTitle = async (e) => {
    e.preventDefault();
    dispatch(editTierlistInfo({ newValue: newTitle, field: "title" }));
    await dispatch(saveTierlist());
    setEditMode(false);
  };

  return (
    <StyledTLHeaderWrapper>
      <StyledColumn>
        <button onClick={addRowAndSave}>
          <span>Add Row </span>
          <AddSVG className="svg" />
        </button>
      </StyledColumn>
      <StyledTLHeader>
        {editMode ? (
          <form className="title-form" onSubmit={(e) => handleSubmitTitle(e)}>
            <input
              className="title-input"
              placeholder="Enter New Title"
              type="text"
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
            ></input>
          </form>
        ) : (
          <h1 className="title" onClick={() => setEditMode(true)}>
            {title}
          </h1>
        )}
        <p>Description if it needs</p>
      </StyledTLHeader>
    </StyledTLHeaderWrapper>
  );
}

let StyledTLHeaderWrapper = styled.div`
  height: 300px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
`;

let StyledColumn = styled.div`
  width: 150px;
  height: 100%;
  color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column-reverse;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border-style: none;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    justify-content: flex-end;
    color: transparent;
    font-weight: bold;
    margin-bottom: 10px;
    :hover {
      /* background-color: rgba(255, 255, 255, 0.9); */
      color: white;
    }
    :active {
      /* background-color: rgba(255, 255, 255, 0.8); */
    }
    span {
      font-weight: bold;
    }
    .svg {
      height: 18px;
      margin: 0px 5px;
      fill: white;
    }
  }
`;

let StyledTLHeader = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  padding: 20px;
  .title-form {
    width: 100%;
    .title-input {
      border-style: none;
      background-color: transparent;
      font-size: 35px;
      font-weight: bold;
      color: white;
      line-height: 40px;
      padding: 0px;
      margin-bottom: 5px;
      ::placeholder {
        color: #c4c4c4;
      }
      :focus {
        outline: none;
        border-bottom: 4px solid white;
      }
    }
  }
  .title {
    font-size: 35px;
    line-height: 40px;
    margin-bottom: 5px;
  }
`;

export default TierlistHeaders;
