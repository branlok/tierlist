import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteItem, deleteItemFromDB, saveTierlist } from "../TierlistSlice";

function Item({ itemId, index }) {
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);
  let dispatch = useDispatch();

  let deleteSequence = async () => {
    dispatch(deleteItem(itemId)); 
    await dispatch(deleteItemFromDB(itemId));
    dispatch(saveTierlist());
  };

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided) => {
        return (
          <StyledItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div
              className="delete-button"
              onClick={deleteSequence}
            >
              DELETE
            </div>
            <StyledImage src={item.imageURL} />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  /* width: 100px; */
  height: 125px;
  color: white;
  background-color: gray;
  flex-shrink: 0;
  position: relative;
  .delete-button {
    position: absolute;
    top: 0px;
    right: 0px;
    background-color: red;
    cursor: pointer;
  }
`;

let StyledImage = styled.img`
  height: 100%;
  /* width: 100%; */
  object-fit: cover;
  display: block;
`;

export default Item;
