import React, { useRef } from "react";
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
import { blinking } from "../Tierlist/RowTitle";
function TierlistHeaders() {
  let [editMode, setEditMode] = useState(false);

  let inputRef = useRef();

  let dispatch = useDispatch();
  let newRowId = useSelector(
    (state) =>
      state.loadedTierlist.rowOrder[state.loadedTierlist.rowOrder.length - 1]
  );
  let { title, description } = useSelector(
    (state) => state.loadedTierlist.tierlist
  );

  let [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    if (newRowId !== "storage") {
      console.log(newRowId);
      scrollToItem("row", newRowId);
    }
  }, [newRowId]);

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus();
    }
  }, [editMode]);

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

    let filteredTitle = newTitle;
    if (newTitle.length === 0) {
      filteredTitle = "Untitled Tierlist";
    }
    dispatch(editTierlistInfo({ newValue: filteredTitle, field: "title" }));
    await dispatch(saveTierlist());
    setEditMode(false);
    if (title.length === 0) {
      setNewTitle(filteredTitle);
    }
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
              ref={inputRef}
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
        <h2 className="caption">{description}</h2>
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
  /*Pattern provided from https://www.magicpattern.design/tools/css-backgrounds */
  opacity: 0.8;
  background-image: radial-gradient(gray 0.5px, transparent 0.5px),
    radial-gradient(gray 0.5px, rgba(0, 0, 0, 0.3) 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  /* background-image: url("https://images.unsplash.com/photo-1504548840739-580b10ae7715?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3000&q=80");
  background-size: cover; */
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
      width: 80%;
      box-sizing: border-box;
      animation: ${blinking} 2s linear infinite;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
    cursor: pointer;
    display: inline;
  }
  .caption {
    font-size: 16px;
    margin-top: 5px;
    font-weight: normal;
  }
`;

export default TierlistHeaders;
