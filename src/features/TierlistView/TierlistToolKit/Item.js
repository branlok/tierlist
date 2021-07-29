import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Item({ itemId, index }) {
  let [ready, setReady] = useState(false);
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
            <StyledImage ready={ready} src={item.imageURL} onLoad={() => setReady(true)} />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  height: 125px;
  padding: 10px; //experimental 
  color: white;
  flex-shrink: 0;
  overflow-x: hidden;
`;

let StyledImage = styled.img`
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: ${props => props.ready ? "1" : "0"};
  min-width: 170px;
  border-radius: 5px; //experimental 
  /* display: ${props => props.ready ? "block" : "none"} */
`;

export default Item;
