import React from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";


function Item({ itemId, index }) {
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided) => {
        return (
          <StyledItem {...provided.draggableProps} ref={provided.innerRef}>
            <StyledImage {...provided.dragHandleProps} src={item.imageURL} />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  height: 125px;
  /* width: 100%; */
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-shrink: 0;
`;

let StyledImage = styled.img`
  height: 125px;
  width: 100px;
  object-fit: cover;
  flex-shrink: 0;
`;

let StyledDescription = styled.div`
  width: 100%;
  height: 100%;
`;

export default Item;
