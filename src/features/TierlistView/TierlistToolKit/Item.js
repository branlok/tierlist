import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Item({ itemId, index }) {
  let [ready, setReady] = useState(false);
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);


  let returnDnDStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    const { curve, duration } = snapshot.dropAnimation;
    if (snapshot.draggingOver !== "storage") {
      return {
        ...style,
        height: "125px",
        width: "auto",
        maxWidth: "250px",
        transition: `all ${curve} ${duration}s`,
      };
    } else {
      return {
        ...style,
      };
    }
  };

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => {
        const style = returnDnDStyle(provided.draggableProps.style, snapshot);
        return (
          <StyledItem
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            style={style}
          >
            <StyledImage
              ready={ready}
              src={item.imageURL}
              onLoad={() => setReady(true)}
            />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let StyledItem = styled.div`
  height: 125px;
  /* padding: 10px; //experimental  */
  color: white;
  flex-shrink: 0;
  overflow-x: hidden;
`;

let StyledImage = styled.img`
  height: 100%;
  width: 100%;
  max-width: 250px;
  object-fit: cover;
  display: block;
  opacity: ${(props) => (props.ready ? "1" : "0")};
  /* min-width: 130px; */

  /* border-radius: 5px; //experimental  */
  /* display: ${(props) => (props.ready ? "block" : "none")} */
`;

export default Item;
