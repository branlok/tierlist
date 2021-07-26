import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addImage } from "../../imageHandler/imageSlice";
import { addItem, updateItemsDB, updateTierlistStatus } from "../TierlistSlice";

function FileDropper() {
  const dispatch = useDispatch();
  const tierlistId = useSelector((state) => state.loadedTierlist.tierlist.id);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      let objectURLS = [];
      //can't use foreach because await wont'work
      // console.log(acceptedFiles);

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
    },
    [tierlistId]
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });
  return (
    <StyledGallery>
      <StyledFileDropper {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}

        <StyledButton type="button" onClick={open}>
          Open File Dialog
        </StyledButton>
      </StyledFileDropper>
    </StyledGallery>
  );
}

let StyledGallery = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
`;

let StyledFileDropper = styled.div`
  background-color: #3b345e;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    padding: 15px;
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
