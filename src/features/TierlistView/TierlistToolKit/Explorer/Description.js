import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editItemTitle, updateItemDetails } from "../../TierlistSlice";

function Description({ itemId, itemDescription }) {
  let [description, setDescription] = useState(itemDescription);
  let dispatch = useDispatch();
  let [showdescriptionEdit, setShowDescriptionEdit] = useState(
    description.length == 0 ? true : false
  );

  let submitForm = useRef();
  let textareaRef = useRef();

  useEffect(() => {
    if (showdescriptionEdit) {
      textareaRef.current.focus();
    }
  }, [showdescriptionEdit]);

  let submitDescription = async (e) => {
    e.preventDefault();
    console.log(itemId, description);

    await dispatch(
      updateItemDetails({
        itemId: itemId,
        content: description,
        field: "description",
      })
    );
    dispatch(
      editItemTitle({ id: itemId, newValue: description, field: "description" })
    );

    //run async sve to indexeddb
    setShowDescriptionEdit(false);
  };

  let handleChange = (e) => {
    const keyCode = e.code;
    setDescription(e.target.value);
    console.log(keyCode);
    if (keyCode === "Enter" && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
      // e.target.submit();
      console.log("happened fired");
      submitForm.current.submit();
      // Do something else such as send the message to back-end
      // ...
    }
  };

  if (showdescriptionEdit) {
    return (
      <StyledDescription>
        <form ref={submitForm} onSubmit={(e) => submitDescription(e)}>
          <textarea
            ref={textareaRef}
            className="input-description"
            placeholder="add note"
            onChange={(e) => handleChange(e)}
            value={description}
            onKeyDown={(e) =>
              e.code === "Enter" && !e.shiftKey && submitDescription(e)
            }
            // onSubmit={submitDescription}
          />
          {itemDescription !== description && (
            <button type="submit" className="save-button">
              Save Note
            </button>
          )}
        </form>
      </StyledDescription>
    );
  } else {
    return (
      <StyledDescription>
        <div
          className="description-wrapper"
          onClick={() => setShowDescriptionEdit(true)}
        >
          <p className="description">{description ? description : "add note"}</p>
        </div>
      </StyledDescription>
    );
  }
}

let StyledDescription = styled.div`
  /* height: 100%; */
  height: 85px;
  .description-wrapper {
    height: 100%;
    border-style: none;
    color: white;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    resize: none;
    /* margin: 10px -10px -10px -10px; */
    overflow-y: scroll;
    ::-webkit-scrollbar {
      height: 0;
      width: 0;
      color: transparent;
    }
    scrollbar-width: none;
    /* height: 50px; */
    /* flex-grow: auto; */

    .description {
      font-size: 12px;
      line-height: 13px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
  form {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .input-description {
    background-color: rgba(0, 0, 0, 0.2);
    /* border-radius: 5px; */
    height: 80px;
    padding: 10px;
    border-style: none;
    color: white;
    font-weight: bold;
    font-size: 12px;
    line-height: 13px;
    resize: none;
    /* margin: 10px -10px -10px -10px; */
    /* height: 50px; */
    /* flex-grow: auto; */
    font-family: Arial, Helvetica, sans-serif;
    transition: 0.2s;
    border-left: 2px solid transparent;
    :focus {
      outline: none;
      border-left: 2px solid white;
    }
    ::placeholder {
      color: #bfbfbf;
    }
  }
  .save-button {
    position: absolute;
    bottom: 5px;
    right: 10px;
    border-style: none;
    border-radius: 50px;
    font-size: 12px;
    padding: 0px 10px;
    background-color: #100c1a;
    color: white;
    font-weight: bold;
    transition: 0.2s;
    :hover {
      background-color: rgba(255, 255, 255, 0.9);
      transition: 0.2s;
      cursor: pointer;
      color: black;
    }
  }
`;

export default Description;
