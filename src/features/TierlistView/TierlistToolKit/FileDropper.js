import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { addImage } from "../../imageHandler/imageSlice";
import { addItem, updateItemsDB, updateTierlistStatus } from "../TierlistSlice";

function FileDropper({ showFileUpload, setShowFileUpload }) {
  const dispatch = useDispatch();
  const tierlistId = useSelector((state) => state.loadedTierlist.tierlist.id);

  const [showDialogue, setShowDialogue] = useState(true);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let objectURLS = [];

      for (let file of acceptedFiles) {
        let id = nanoid();
        let imageURL = URL.createObjectURL(file);
        objectURLS.push([imageURL, id]);
        await dispatch(addImage({ source: file, imageURL, id, tierlistId }));
      }

      await dispatch(addItem(objectURLS)); //array of items.
      await dispatch(updateItemsDB());
      await dispatch(updateTierlistStatus());
      setShowFileUpload((prevState) => !prevState);
    },
    [tierlistId]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: 'image/*'
  });

  return (
    <StyledFileDropper
      {...getRootProps()}
      onDragOver={() => setShowDialogue(false)}
      onDragLeave={() => {
        setShowDialogue(true);
        setShowFileUpload((prevState) => !prevState);
      }}
    >
      <input {...getInputProps()} />

      {<p>Drop the files here ...</p>}
      {showDialogue && (
        <StyledButton type="button" onClick={open}>
          Open File Dialog
        </StyledButton>
      )}
    </StyledFileDropper>
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

let StyledFileDropper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  /* height: 125px; */
  height: calc(100% - 35px);
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
