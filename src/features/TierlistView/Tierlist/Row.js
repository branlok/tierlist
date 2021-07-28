import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  returnToStorage,
  saveTierlist,
  updateOrderInRow,
} from "../TierlistSlice";
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
            <div className="title">
              <button onClick={() => removeRowContent(row, rowId)}>
                DELETE
              </button>
              {row.name}
            </div>
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

export default Row;
