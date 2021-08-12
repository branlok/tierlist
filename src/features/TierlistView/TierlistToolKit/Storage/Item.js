import React, { useCallback } from "react";
import { useState } from "react";

import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as CrossDeleteSVG } from "../../../../Styles/svg/CrossDelete.svg";
import { deleteItemFromDB, saveTierlist } from "../../TierlistSlice";

/**
 * Component dynamically renders sizes coresponding to minimized
 * or expanded of the right tierlisttoolkit. Along with draggable logic.
 *
 * @param {object} param0.itemId - item id of the draggable item
 * @param {string} param0.index - index of the item in the row it resides
 * @param {boolean} param0.toolState - toolbar is expanded or closed
 * @returns
 */
function Item({ itemId, index, toolState }) {
  let [ready, setReady] = useState(false);
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);
  let dispatch = useDispatch();


  let runStyleCalc = useCallback(
    (style, snapshot) => returnDnDStyle(style, snapshot),
    []
  );

  let deleteSequence = async () => {
    await dispatch(deleteItemFromDB(itemId)); //doesn't delete source unless its the last item.
    await dispatch(saveTierlist());
  };

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided, snapshot) => {
        const style = runStyleCalc(provided.draggableProps.style, snapshot);
        return (
          <StyledItem
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            style={style}
            toolState={toolState}
          >
            <StyledDelete className="delete delete-button" onClick={deleteSequence}>
              <CrossDeleteSVG className="delete-cross" />
            </StyledDelete>

            <StyledImage
              className="image"
              ready={ready}
              src={item.imageURL}
              onLoad={() => setReady(true)}
              toolState={toolState}
            />
          </StyledItem>
        );
      }}
    </Draggable>
  );
}

let returnDnDStyle = (style, snapshot) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { curve, duration } = snapshot.dropAnimation;
  if (snapshot.draggingOver !== "storage") {
    return {
      ...style,
      height: "125px",
      width: "125px",
      // maxWidth: "250px",
      minWidth: "125px",
      transition: `all ${curve} ${duration}s`,
    };
  } else {
    return {
      ...style,
    };
  }
};

let StyledItem = styled.div`
  height: 125px;
  /* min-width: ${(props) => (props.toolState ? "125px" : "230px")}; */
  width: ${(props) => (props.toolState ? "125px" : "230px")};
  /* padding: 10px; //experimental  */
  color: white;
  flex-shrink: 0;
  overflow-x: hidden;
  position: relative;
  :hover .delete {
    opacity: 1;
  }
  :hover .image {
    /* padding: 30px; */
  }
`;

let StyledDelete = styled.div`
  position: absolute;
  opacity: 0;
  top: 8px;
  right: 8px;
  cursor: pointer;
  transition: 0.1s;
  .delete-cross {
    fill: rgba(255, 255, 255, 1);
    background-color: transparent;
    width: 10px;
    height: 10px;
    padding: 5px;
    transition: 0.2s;
    z-index: 3;
    :hover {
      transform: rotate(-90deg);
      fill: #d42013;
    }
  }
`;

let StyledImage = styled.img`
  height: 100%;
  width: 100%;
  width: ${(props) => (props.toolState ? "125px" : "100%")};
  /* max-width: 250px; */
  transition: 0.1s;
  object-fit: cover;
  display: block;
  :hover {
  }
  /* :hover {
    padding: 6px;
  } */
  /* opacity: ${(props) => (props.ready ? "1" : "0")}; */
  /* min-width: 130px; */

  /* border-radius: 5px; //experimental  */
  /* display: ${(props) => (props.ready ? "block" : "none")} */
`;

export default Item;
