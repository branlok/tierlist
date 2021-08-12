import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fadeIn } from "../../../../GlobalStyles";
import { addImage } from "../../imageSlice";

import { addItem, saveTierlist } from "../../TierlistSlice";

/**
 * React Component that will allows users to drag and drop items
 * calls async action to update indexeddb and redux stores.
 *
 * @param {function} param0.setShowFileUpload - accepts react hook to set state to toggle back to storage mode.
 * @returns Component with React-drop-zone logic.
 */
function FileDropper({ setShowFileUpload }) {
  const dispatch = useDispatch();
  let { id: tierlistId } = useParams();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let objectURLS = []; //array of [imageURL, id]
      for (let file of acceptedFiles) {
        let id = nanoid();
        let imageURL = URL.createObjectURL(file);
        objectURLS.push([imageURL, id]);
        //store original image file into indexeddb(image table)
        await dispatch(addImage({ source: file, imageURL, id, tierlistId }));
      }
      dispatch(addItem(objectURLS)); //adds Items to redux only then,
      await dispatch(saveTierlist()); //tell thunk to update redux tierlist to idnexeddb

      //return to storage draggables
      setShowFileUpload((prevState) => !prevState);
    },
    [tierlistId]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: "image/*",
  });

  return (
    <StyledFileDropper
      {...getRootProps()}
      onDragLeave={() => {
        setShowFileUpload((prevState) => !prevState);
      }}
    >
      <input {...getInputProps()} />

      {<p>Drop the files here ...</p>}
      {!isDragActive && (
        <StyledButton type="button" onClick={open}>
          Open File Dialog
        </StyledButton>
      )}
    </StyledFileDropper>
  );
}

let StyledFileDropper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  /* height: 125px; */
  height: calc(100%);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    padding: 15px;
    user-select: none;
    pointer-events: none;
  }
`;

let StyledButton = styled.button`
  /* position: absolute;
  bottom: 10px;
  right: 10px; */
  height: 30px;
  width: 150px;
  border-radius: 50px;
  font-size: 12px;
  color: white;
  background-color: ${(props) => props.theme.main.accent};
  border-style: none;
  font-weight: bold;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.25), 0 0px 5px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  animation: ${fadeIn} 1s ease forwards;
  transition: 0.1s;
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.main.primaryVarient};
    transform: scale(0.95);
  }
  :active {
    transform: scale(0.9);
  }
`;

export default FileDropper;
