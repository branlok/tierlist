import React from "react";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Item from "./Item";

function Storage() {
  let storageRow = useSelector((state) => state.loadedTierlist.rows.storage);

  return (
    <StyledStorageWrapper>
      <Droppable droppableId={storageRow.id} direction="horizontal">
        {(provided) => {
          return (
            <StyledStorage ref={provided.innerRef} {...provided.droppableProps}>
              {storageRow.itemOrder.map((item, index) => {
                return <Item key={item} itemId={item} index={index} />;
              })}
              {storageRow.itemOrder.length == 0 ? (
                <div className="messsge-for-empty"> empty </div>
              ) : null}
              {provided.placeholder}
            </StyledStorage>
          );
        }}
      </Droppable>
    </StyledStorageWrapper>
  );
}

let StyledStorageWrapper = styled.div`
  height: 125px;
  width: 100%;
  border-radius: 10px;
  padding: 0px 10px;
  overflow: hidden;
  flex-shrink: 0;
  overflow: hidden;
`;

let StyledStorage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #261b3d;
  border-radius: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  user-select: none;
  position: relative;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }

  .messsge-for-empty {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: gray;
    z-index: 0;
  }
`;

export default Storage;
