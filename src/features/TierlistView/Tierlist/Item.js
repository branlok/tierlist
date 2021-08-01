import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { deleteItem, deleteItemFromDB, saveTierlist } from "../TierlistSlice";
import { ReactComponent as CrossDeleteSVG } from "../../../Styles/svg/CrossDelete.svg";
import { ReactComponent as ReturnSVG } from "../../../Styles/svg/returnArrow.svg";
function Item({ itemId, index, toolState }) {
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);
  let size = useSelector((state) => state.loadedTierlist.tierlist.size);
  let dispatch = useDispatch();

  let deleteSequence = async () => {
    dispatch(deleteItem(itemId));
    await dispatch(deleteItemFromDB(itemId));
    dispatch(saveTierlist());
  };

  let scrollToItem = () => {
    let item = document.getElementById(`explorer-${itemId}`);
    if (item) {
      item.scrollIntoView({ behaviour: "smooth", block: "start" });
    }
  };

  let returnDnDStyle = (style, snapshot, size) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    const { moveTo, curve, duration } = snapshot.dropAnimation;
    if (snapshot.draggingOver == "storage") {
      return {
        ...style,
        height: "125px",
        width: toolState ? "auto" : "230px",
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
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={style}
            size={size}
            // style={returnDnDStyle(provided.draggableProps.style, snapshot)}
          >
            <div className="item-info-wrapper" onDoubleClick={scrollToItem}>
              {/* <div className="return-button">
                <ReturnSVG className="return-svg" />
              </div> */}
              <div className="delete-button" onClick={deleteSequence}>
                <CrossDeleteSVG className="delete-cross" />
              </div>
              <div className="name">{item.name} </div>
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
  /* height: 50px */
  width: ${props => props.size == "square" ? "125px" : "auto"};
  color: white;
  flex-shrink: 0;
  position: relative;
  /* padding: 10px; //experimental */
  /* border-radius: 10px; */

  .item-info-wrapper {
    height: 125px;
    width: 100%;
    opacity: 0;
    background-color: transparent;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: 0.3s;
    /* border: 3px solid black; */
    :hover {
      transition: 0.3s;
      opacity: 1;
      > .name {
        color: white;
      }
    }
  }
  .name {
    height: calc(100% - 0px);
    width: calc(100% - 0px);
    font-size: 20px;
    font-weight: bold;
    display: flex;
    padding: 10px;
    color: transparent;
    flex-direction: column-reverse;
    z-index: 2;
    //experimental below
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    /* margin: 5px; */
    /* border-radius: 15px; */
    background-color: rgba(0, 0, 0, 0.9);
    /* background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(97, 255, 0, 0) 100%
    ); */
  }
  .delete-button {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    .delete-cross {
      fill: rgba(255, 255, 255, 0.6);
      background-color: transparent;
      width: 10px;
      height: 10px;
      padding: 10px;
      transition: 0.2s;
      :hover {
        transform: rotate(-90deg);
        fill: rgba(255, 0, 0, 0.8);
      }
    }
  }
  .return-button {
    position: absolute;
    bottom: 2px;
    right: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
    .return-svg {
      fill: rgba(255, 255, 255, 0.6);
      background-color: transparent;
      transform: rotate(-90deg);
      /* width: 20px;
      height: 20px; */
      padding: 7px;
      transition: 0.2s;
      :hover {
        fill: rgba(255, 255, 255, 1);
      }
    }
  }
`;

let StyledImage = styled.img`
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
  /* display: block; */
  max-width: 250px;

  /* min-width: 170px; */

  /* border-radius: 10px; //experimental */
`;

export default Item;
