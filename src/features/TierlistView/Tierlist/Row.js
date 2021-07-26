import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Item from "./Item";

function Row({ rowId }) {
  let row = useSelector((state) => state.loadedTierlist.rows[rowId]);

  return (
    <div className="row row1">
      <div className="title">{row.name}</div>
      <Droppable droppableId={rowId} direction="horizontal">
        {(provided) => {
          return (
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
          );
        }}
      </Droppable>
    </div>
  );
}

let StyledDroppableRow = styled.div`
  height: 125px;
  width: 100%;
  display: flex;
  overflow-x: scroll;
  ::-webkit-scrollbar {
  height: 0;
  width: 0;
  color: transparent;
}
`;

export default Row;
