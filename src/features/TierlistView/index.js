import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import useScreenshot from "../../customHooks/useScreenshot";
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

function retrieveTheme(theme) {
  switch (theme) {
    case "purple":
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
        },
      };
    case "red":
      return {
        main: {
          primary: "hsl(0, 56%, 25%)",
          primaryVarient: "hsl(0, 44%, 20%)",
          accent: "hsl(0, 61%, 38%)",
        },
      };
    case "pink":
      return {
        main: {
          primary: "hsl(321, 56%, 25%)",
          primaryVarient: "hsl(321, 44%, 20%)",
          accent: "hsl(321, 61%, 38%)",
        },
      };
    case "blue":
      return {
        main: {
          primary: "hsl(236, 56%, 25%)",
          primaryVarient: "hsl(236, 44%, 20%)",
          accent: "hsl(236, 61%, 38%)",
        },
      };
    case "brightBlue":
      return {
        main: {
          primary: "hsl(236, 74%, 48%)",
          primaryVarient: "hsl(236, 74%, 48%)",
          accent: "hsl(236, 74%, 48%)",
        },
        bright: true,
      };
    case "yellow":
      return {
        main: {
          primary: "hsl(57, 56%, 25%)",
          primaryVarient: "hsl(57, 44%, 20%)",
          accent: "hsl(57, 61%, 38%)",
        },
      };
    case "brightYellow":
      return {
        main: {
          primary: "hsl(63, 74%, 48%)",
          primaryVarient: "hsl(63, 74%, 48%)",
          accent: "hsl(63, 74%, 48%)",
        },
        bright: true,
      };
    case "brightRed":
      return {
        main: {
          primary: "hsl(0, 74%, 48%)",
          primaryVarient: "hsl(0, 74%, 24%)",
          accent: "hsl(0, 87%, 48%)",
        },
        bright: true,
      };
    case "brightPink":
      return {
        main: {
          primary: "hsl(328, 74%, 48%)",
          primaryVarient: "hsl(328, 74%, 48%)",
          accent: "hsl(328, 74%, 48%)",
        },
        bright: true,
      };

    default: {
      return {
        main: {
          primary: "hsl(259, 56%, 25%)",
          primaryVarient: "hsl(257, 44%, 20%)",
          accent: "hsl(245, 61%, 38%)",
        },
      };
    }
  }
}

function TierlistView() {
  // let rows = useSelector((state) => state.loadedTierlist.rows);
  let statuss = useSelector((state) => state.loadedTierlist.status);
  let theme = useSelector((state) => state.loadedTierlist.tierlist?.theme);
  let dispatch = useDispatch();
  let { id } = useParams();
  let onDragEnd = useDragLogic();
  let [toolState, setToolState] = useState(false);

  // const { generateImage, captureRef, status } = useScreenshot();

  // ref={captureRef} disabled={status === "loading"} onClick={generateImage}
  useEffect(() => {
    if (id) {
      //load requested tierlist to redux
      dispatch(deleteOutDatedTierlists());
      dispatch(loadTierlist(id));
    }
  }, [id]);

  let themes = useCallback(() => retrieveTheme(theme), [theme]);

  if (statuss == "loading") {
    return <div>loading</div>;
  } else {
    return (
      <ThemeProvider theme={themes}>
        <StyledWrapper data-test="tierlistwindow">
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
