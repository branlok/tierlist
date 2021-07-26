import React from "react";
import { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Item from "./Item";

function Storage() {
  let storageRow = useSelector((state) => state.loadedTierlist.rows.storage);
  

  console.log(storageRow.id);
  return (
    <StyledStorageWrapper>
      <Droppable droppableId={storageRow.id} direction="horizontal">
        {(provided) => {
          return (
            <StyledStorage ref={provided.innerRef} {...provided.droppableProps}>
              {storageRow.itemOrder.map((item, index) => {
                  console.log(item);
                return <Item key={item} itemId={item} index={index} />;
              })}
              {storageRow.itemOrder.length == 0 ? <div className="messsge-for-empty"> empty </div> : null}
              {provided.placeholder}
            </StyledStorage>
          );
        }}
      </Droppable>
    </StyledStorageWrapper>
  );
}
// let StyledGallery1 = styled.div`
//   width: 100%;
//   height: 125px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
// `;

let StyledStorageWrapper = styled.div`
  height: 150px;
  width: 100%;
  /* background-color: #261b3d; */
  border-radius: 10px;
  padding: 10px;
  overflow: hidden;
  flex-shrink: 0;
  /* box-sizing: border-box; */
  
`;

let StyledStorage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: #261b3d;
  border-radius: 10px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
  height: 0;
  width: 0;
  color: transparent;
}
.messsge-for-empty {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: gray;
}
`;

export default Storage;
