import { nanoid } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useParams } from "react-router-dom";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { fadeIn } from "../../GlobalStyles";
import { ReactComponent as NotificationSVG } from "../../Styles/svg/notification.svg";
import { ReactComponent as CircleCheckSVG } from "../../Styles/svg/CircleCheck.svg";
import retrieveTheme from "../utils/themeSelect";
import Tierlist from "./Tierlist";
import TierlistHeaders from "./TierlistHeaders";
import {
  deleteOutDatedTierlists,
  loadTierlist,
  modifyRowOrder,
  reorderItemBetweenRow,
  saveTierlist,
  updateOrderInRow,
} from "./TierlistSlice";
import TierlistToolkit from "./TierlistToolKit";

function TierlistView() {
  let status = useSelector((state) => state.loadedTierlist.status);
  let theme = useSelector((state) => state.loadedTierlist?.tierlist?.theme); //This is undefined on mount until status is "ready"
  let dispatch = useDispatch();
  let { id } = useParams();
  //toggle toolbar open or closed.
  let [toolState, setToolState] = useState(false);

  useEffect(() => {
    if (id) {
      //load requested tierlist to redux
      dispatch(deleteOutDatedTierlists());
      dispatch(loadTierlist(id));
    }
  }, [id]);

  //beautiful-dnd set up
  let onDragEnd = useDragLogic();

  //setup theme
  let themes = useCallback(() => retrieveTheme(theme), [theme]);

  if (status === "loading") {
    return <StyledLoadingPage>loading</StyledLoadingPage>;
  } else {
    return (
      <ThemeProvider theme={themes}>
        <StyledWrapper data-test="tierlistwindow">
          <Prompt
            when={true}
            message="You have unsaved changes, are you sure you want to leave?"
          />
          <Notifications />
          <StyledLeftColumn data-test="leftColumn" />
          <DragDropContext onDragEnd={onDragEnd}>
            <Wrapper>
              <StyledPageWrapper>
                <TierlistHeaders />
                <Tierlist toolState={toolState} />
              </StyledPageWrapper>
              <TierlistToolkit
                toolState={toolState}
                setToolState={setToolState}
              />
            </Wrapper>
          </DragDropContext>
        </StyledWrapper>
      </ThemeProvider>
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

function Notifications() {
  let notifications = useSelector(
    (state) => state.loadedTierlist.notifications
  );

  // let [test, setTest] = useState([]);

  return (
    <StyleNotifContainer>
      {notifications.map((item) => {
        return <Notification key={item.notifId} message={item.message} />;
      })}
    </StyleNotifContainer>
  );
}

function Notification({ message }) {
  let [expires, setExpires] = useState(false);
  console.log(message);
  useEffect(() => {
    let timeout = setTimeout(() => setExpires(true), 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (expires) return null;
  return (
    <div className="notif">
      <CircleCheckSVG className="svg" />
      {message}
      <div className="highlight"></div>
    </div>
  );
}

let fadeinout = keyframes`
0% {
  opacity: 0;
  height: 0px;
}
10% {
  opacity: 1;
  height: 50px;
}
50% {
  opacity: 1;
  height: 50px;
}
90% {
  opacity: 1;
  height: 50px;
  /* margin-top: 10px; */
}
100% {
  opacity: 0;
  height: 0px;
  display: none;
  /* margin-top: 0px; */
}

`;

let StyleNotifContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 500px;
  width: 300px;
  /* border: 1px solid white; */
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  /* overflow: hidden; */
  margin: 10px;
  padding: 10px;
  pointer-events: none;
  .notif {
    margin-top: 5px;
    height: 50px;
    font-size: 12px;
    animation: ${fadeinout} 3s ease forwards;
    background-color: ${(props) => props.theme.main.accent};
    width: 100%;
    flex-shrink: 0;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    border-radius: 5px;
    .svg {
      height: 20px;
      width: 20px;
      fill: white;
      margin-right: 10px;
    }
    .highlight {
      height: 1px;
    }
  }
`;

let StyledLoadingPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
`;

let StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

let StyledLeftColumn = styled.div`
  position: absolute;
  height: 100%;
  width: 150px;
  background-color: ${(props) =>
    props.theme.bright ? "rgba(255, 255, 255, 0.6); " : "rgba(0, 0, 0, 0.8);"};
  transition: 0.3s;
  z-index: 1;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

let StyledPageWrapper = styled.div`
  /* background-color: #2d1365; */
  background-color: ${(props) => props.theme.main.primary}; //0°, 56%, 25%
  height: 100%;
  width: calc(100% - 250px);
  /* transition: 0.3s; */
  /* width: 100%; */
  /* width: 100%; */
  overflow-y: scroll;
  scrollbar-width: none;
  scroll-behavior: smooth;
  /* display: flex;
  flex-direction: column; */
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
