import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FileDropper from "./FileDropper";
import Item from "./Item";
import { StyledHeader } from "./styles";

function Storage({ mini }) {
  let storageRow = useSelector((state) => state.loadedTierlist.rows.storage);
  let [showFileUpload, setShowFileUpload] = useState(
    // storageRow.itemOrder.length > 0 ? false : true
    false
  );

  return (
    <StyledStorageWrapper vertical={mini}>
      <StyledHeader>
        <div className="title">Storage</div>
        <div
          className="adder"
          onClick={() => setShowFileUpload((prevState) => !prevState)}
        >
          +
        </div>
      </StyledHeader>
      {showFileUpload ? (
        <FileDropper setShowFileUpload={setShowFileUpload} />
      ) : (
        <Droppable
          droppableId={storageRow.id}
          direction={mini ? "vertical" : "horizontal"}
        >
          {(provided) => {
            return (
              <StyledStorage
                vertical={mini}
                ref={provided.innerRef}
                {...provided.droppableProps}
                onDragOver={() => setShowFileUpload((prevState) => !prevState)}
              >
                {storageRow.itemOrder.map((item, index) => {
                  return (
                    <Item
                      key={item}
                      itemId={item}
                      index={index}
                      vertical={mini}
                    />
                  );
                })}
                {storageRow.itemOrder.length == 0 ? (
                  <div className="messsge-for-empty">
                    {" "}
                    Drop the images files or draggables here ...{" "}
                  </div>
                ) : null}
                {provided.placeholder}
              </StyledStorage>
            );
          }}
        </Droppable>
      )}
    </StyledStorageWrapper>
  );
}

let StyledStorageWrapper = styled.div`
  /* height: 160px; */
  height: ${(props) => (props.vertical ? "100%" : "160px")};
  width: 100%;
  border-radius: 10px;
  /* padding: 0px 10px; */
  overflow: hidden;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
`;

let StyledStorage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  /* background-color: #261b3d; */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 10px 10px;
  overflow-x: ${(props) => (props.vertical ? "hidden" : "scroll")};
  overflow-y: ${(props) => (props.vertical ? "scroll" : "hidden")};
  user-select: none;
  position: relative;
  scrollbar-width: none;
  /* flex-direction: row-reverse; */
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  .messsge-for-empty {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px;
    text-align: center;
    font-size: 12px;
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: gray;
    z-index: 0;
  }
`;

export default Storage;
