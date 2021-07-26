import React from "react";
import { Draggable } from "react-beautiful-dnd";
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
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* {item.name}  */}
            <StyledImage src={item.imageURL} />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  width: 100px;
  height: 100%;
  color: white;
  background-color: gray;
  flex-shrink: 0;
`;

let StyledImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export default Item;
