import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteItem, deleteItemFromDB, saveTierlist } from "../TierlistSlice";
import { ReactComponent as CrossDeleteSVG } from "../../../Styles/svg/CrossDelete.svg";

function Item({ itemId, index }) {
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);
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

  return (
    <Draggable draggableId={itemId} index={index}>
      {(provided) => {
        return (
          <StyledItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="item-info-wrapper" onDoubleClick={scrollToItem}>
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
  color: white;
  flex-shrink: 0;
  position: relative;
  padding: 10px; //experimental
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
    :hover {
      transition: 0.3s;
      opacity: 1;
      > .name {
        color: white;
      }
    }
  }
  .name {
    height: 100%;
    width: 100%;
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
    border-radius: 10px;
    //experimental above
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(97, 255, 0, 0) 100%
    );
  }
  .delete-button {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    .delete-cross {
      fill: rgba(255, 255, 255, 0.6);
      background-color: transparent;
      width: 15px;
      height: 15px;
      padding: 10px;
      transition: 0.5s;
      :hover {
        transform: rotate(-90deg);
        fill: rgba(255, 0, 0, 0.8);
      }
    }
  }
`;

let StyledImage = styled.img`
  height: 100%;
  /* width: 100%; */
  object-fit: cover;
  display: block;
  min-width: 170px;

  border-radius: 10px; //experimental
`;

export default Item;
