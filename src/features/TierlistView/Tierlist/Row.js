import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  returnToStorage,
  saveTierlist,
  updateOrderInRow,
} from "../TierlistSlice";
import { ReactComponent as CrossDeleteSVG } from "../../../Styles/svg/CrossDelete.svg";

import Item from "./Item";

function Row({ rowId, index }) {
  let row = useSelector((state) => state.loadedTierlist.rows[rowId]);
  let dispatch = useDispatch();

  let removeRowContent = async (row, rowId) => {
    let itemOrder = row.itemOrder;
    for (let i of itemOrder) {
      //update item index
      await dispatch(
        updateOrderInRow({
          destination: { droppableId: "storage" },
          source: { droppableId: rowId },
          draggableId: i,
        })
      );
    }
    //reallocate items to storage, then delete row
    dispatch(returnToStorage({ rowItems: row.itemOrder, rowId }));
    await dispatch(saveTierlist());
  };

  return (
    <Droppable droppableId={rowId} direction="horizontal">
      {(provided) => {
        return (
          <div className="row row1">
            <StyledRowTitle>
              <button
                className="delete-button"
                onClick={() => removeRowContent(row, rowId)}
              >
                <CrossDeleteSVG className="delete-cross" />
              </button>
              {row.name}
            </StyledRowTitle>
            <StyledDroppableRow
              //   className="row"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {row.itemOrder.map((item, idx) => {
                return <Item key={item} itemId={item} index={idx} />;
              })}
              {provided.placeholder}
            </StyledDroppableRow>
          </div>
        );
      }}
    </Droppable>
  );
}

let StyledDroppableRow = styled.div`
  height: 125px;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  user-select: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
`;

let StyledRowTitle = styled.div`
  width: 150px;
  height: 125px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  position: relative;
  .delete-button {
    position: absolute;
    top: 5px;
    left: 0px;
    background-color: transparent;
    border-style: none;
    cursor: pointer;
    .delete-cross {
      fill: rgba(255, 255, 255, 0.2);
      background-color: transparent;
      width: 10px;
      height: 10px;
      padding: 5px;
      /* border: 1px solid white; */
      /* background-color: rgba(255,255,255,0.1); */
      transition: 0.3s;
      :hover {
        transform: rotate(90deg);
        fill: rgba(255, 0, 0, 0.8);
      }
    }
  }
`;

export default Row;
