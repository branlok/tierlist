import React from "react";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Tierlist from "./Tierlist";
import TierlistHeaders from "./TierlistHeaders";
import {
  loadTierlist,
  modifyRowOrder,
  reorderItemBetweenRow,
  saveTierlist,
  updateOrderInRow,
} from "./TierlistSlice";
import TierlistToolkit from "./TierlistToolKit";


function TierlistView() {
  // let rows = useSelector((state) => state.loadedTierlist.rows);
  let status = useSelector((state) => state.loadedTierlist.status);
  let dispatch = useDispatch();
  let { id } = useParams();
  let onDragEnd = useDragLogic();

  useEffect(() => {
    if (id) {
      //load requested tierlist to redux
      dispatch(loadTierlist(id));
    }
  }, [id]);

  if (status == "loading") {
    return <div>loading</div>;
  } else {
    return (
      <StyledWrapper data-test="tierlistwindow">
        <StyledLeftColumn data-test="leftColumn" />
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <StyledPageWrapper>
              <TierlistHeaders />
              <Tierlist />
            </StyledPageWrapper>
            <TierlistToolkit />
          </Wrapper>
        </DragDropContext>
      </StyledWrapper>
    );
  }
}


function useDragLogic() {
  let rows = useSelector((state) => state.loadedTierlist.rows);
  // let status = useSelector((state) => state.loadedTierlist.status);
  let dispatch = useDispatch();
  let onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppaableId &&
      destination.index === source.index
    ) {
      return;
    }

    let start = rows[source.droppableId];
    let finish = rows[destination.droppableId];
    if (start === finish) {
      dispatch(modifyRowOrder({ destination, source, draggableId }));
      await dispatch(saveTierlist());
    } else {
      dispatch(updateOrderInRow({ destination, source, draggableId }));
      dispatch(reorderItemBetweenRow({ destination, source, draggableId }));
      await dispatch(saveTierlist());
      
    }
  };
  return onDragEnd;
}


let StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

let StyledLeftColumn = styled.div`
  position: absolute;
  height: 100%;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

let StyledPageWrapper = styled.div`
  background-color: #2d1365;
  height: 100%;
  width: calc(100% - 450px);
  /* width: 100%; */
  overflow-y: scroll;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
`;

let Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export default TierlistView;
