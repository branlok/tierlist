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
          <StyledItem
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <StyledImage src={item.imageURL} />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  height: 100%;
  color: white;
  flex-shrink: 0;
`;

let StyledImage = styled.img`
  height: 100%;
  width: 100px;
  object-fit: cover;
`;

export default Item;
