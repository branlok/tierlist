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
import RowTitle from "./RowTitle";

function Row({ rowId, index }) {
  let row = useSelector((state) => state.loadedTierlist.rows[rowId]);

  return (
    <Droppable droppableId={rowId} direction="horizontal">
      {(provided) => {
        return (
          <div id={`row-${rowId}`}className="row row1">
            <RowTitle row={row}/>
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
