import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addImage } from "../../imageHandler/imageSlice";
import { addItem, updateItemsDB, updateTierlistStatus } from "../TierlistSlice";

function FileDropper({ setShowFileUpload }) {
  const dispatch = useDispatch();
  const tierlistId = useSelector((state) => state.loadedTierlist.tierlist.id);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let objectURLS = [];

      for (let file of acceptedFiles) {
        let id = nanoid();
        let imageURL = URL.createObjectURL(file);
        objectURLS.push([imageURL, id]);
        await dispatch(addImage({ source: file, imageURL, id, tierlistId }));
      }
      await dispatch(addItem(objectURLS));
      await dispatch(updateItemsDB());
      await dispatch(
        updateTierlistStatus({ status: "draft", date: Date.now(), tierlistId })
      );
      setShowFileUpload((prevState) => !prevState);
    },
    [tierlistId]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  return (
    <StyledFileDropper
      {...getRootProps()}
      onDragExit={() => setShowFileUpload((prevState) => !prevState)}
    >
      <input {...getInputProps()} />

      {isDragActive ? null : <p>Drop the files here ...</p>}

      {/* <StyledButton type="button" onClick={open}>
        Open File Dialog
      </StyledButton> */}
    </StyledFileDropper>
  );
}

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
  }
`;

let StyledButton = styled.button`
  height: 30px;
  width: 150px;
  border-radius: 50px;
  color: white;
  background-color: #8f317b;
  border-style: none;
  font-weight: bold;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.25), 0 0px 5px rgba(0, 0, 0, 0.22);
  cursor: pointer;
`;

export default FileDropper;
