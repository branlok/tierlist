import React, { useEffect, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  deleteItemFromDB,
  returnItemToStorage,
  saveTierlist,
} from "../TierlistSlice";
import { ReactComponent as CrossDeleteSVG } from "../../../Styles/svg/CrossDelete.svg";
import { createPortal } from "react-dom";

function Item({ itemId, index, toolState }) {
  let item = useSelector((state) => state.loadedTierlist.items[itemId]);
  let size = useSelector((state) => state.loadedTierlist.tierlist.size);
  let dispatch = useDispatch();

  let deleteSequence = async () => {
    await dispatch(deleteItemFromDB(itemId)); //doesn't delete source unless its the last item.
    await dispatch(saveTierlist());
  };

  let returnToStorage = async () => {
    dispatch(returnItemToStorage(itemId));
    await dispatch(saveTierlist());
  };

  const renderDraggable = useDraggableInPortal();

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
        width: toolState ? "125px" : "230px",
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
      {renderDraggable((provided, snapshot) => {
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
              <div className="delete-button" onClick={deleteSequence}>
                <CrossDeleteSVG className="delete-cross" />
              </div>
              <div className="return-button" onClick={returnToStorage}>
                return
              </div>
              <div className="name">{item.name}</div>
            </div>
            <StyledImage src={item.imageURL} />
          </StyledItem>
        );
      })}
    </Draggable>
  );
}

//hook solution provided from to fix parent row transform distort draggable position fix
// Issue: https://github.com/atlassian/react-beautiful-dnd/issues/128
// Solution: https://github.com/DucktorDanny/react-beautiful-dnd-example
const useDraggableInPortal = () => {
  const self = useRef({}).current;

  useEffect(() => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.pointerEvents = "none";
    div.style.top = "0";
    div.style.width = "100%";
    div.style.height = "100%";
    self.elt = div;
    document.body.appendChild(div);
    return () => {
      document.body.removeChild(div);
    };
  }, [self]);

  return (render) =>
    (provided, ...args) => {
      const element = render(provided, ...args);
      if (provided.draggableProps.style.position === "fixed") {
        return createPortal(element, self.elt);
      }
      return element;
    };
};

let StyledItem = styled.div`
  height: 125px;
  width: ${(props) => (props.size == "square" ? "125px" : "100%")};
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
    transform: scale(0.9);
    :hover {
      transition: 0.3s;
      opacity: 1;
      transform: scale(1);
      > .name {
        color: white;
      }
    }
  }
  .name {
    height: calc(100% - 0px);
    width: calc(100% - 0px);

    font-size: 14px;
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
    text-align: center;
    padding: 10px;
    padding-bottom: 40px;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    /* margin: 5px; */
    /* border-radius: 15px; */
    background-color: rgba(0, 0, 0, 0.9);
    /* background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.3) 100%
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
    bottom: 0px;
    right: 0px;
    cursor: pointer;
    align-items: center;
    width: calc(100% - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    margin: 10px;
    font-size: 12px;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px 5px;
    background-color: black;
    transition: 0.1s;
    :hover {
      transform: scale(0.95);
    }
    .return-svg {
      fill: rgba(255, 255, 255, 0.4);
      background-color: transparent;
      transform: rotate(180deg);
      height: 15px;
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
  /* max-width: 250px; */

  /* min-width: 170px; */

  /* border-radius: 10px; //experimental */
`;

export default Item;
