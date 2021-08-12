import React from "react";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import FileDropper from "./FileDropper";
import Item from "./Item";
import { StyledHeader } from "../styles";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";

/**
 * React Comopnent that renders the Storage module,
 * as default renders the Storage Draggable column,
 * but on file dragover, it changes to a filedropper component
 *
 * @param {boolean} param0.toolState - takes a prop name 'toolState' that inidicate toolbar open or closed.
 * @returns
 */
function Storage({ toolState }) {
  let storageRow = useSelector((state) => state.loadedTierlist.rows.storage);
  let [showFileUpload, setShowFileUpload] = useState(false);

  return (
    <StyledStorageWrapper vertical={!toolState}>
      <StyledHeader rotateSVG={showFileUpload}>
        <h1 className="title">Storage</h1>
        <button
          className="adder"
          onClick={() => setShowFileUpload((prevState) => !prevState)}
        >
          <span>{showFileUpload ? "Return" : "Add Files"}</span>
          <AddSVG className="add-svg" />
        </button>
      </StyledHeader>
      {showFileUpload ? (
        <FileDropper setShowFileUpload={setShowFileUpload} />
      ) : (
        <Droppable
          droppableId={storageRow.id}
          direction={toolState ? "horizontal" : "vertical"}
        >
          {(provided) => {
            return (
              <StyledStorage
                vertical={!toolState}
                ref={provided.innerRef}
                {...provided.droppableProps}
                onDragOver={() => setShowFileUpload((prevState) => !prevState)}
                // onDragLeave={() => setShowFileUpload((prevState) => !prevState)}
              >
                {storageRow.itemOrder.map((item, index) => {
                  return (
                    <Item
                      key={item}
                      itemId={item}
                      index={index}
                      toolState={toolState}
                    />
                  );
                })}
                {storageRow.itemOrder.length === 0 ? (
                  <div className="messsge-for-empty">
                    Drop image files or draggables here ...{" "}
                  </div>
                ) : null}
                {provided.placeholder}
              </StyledStorage>
            );
          }}
        </Droppable>
      )}
    </StyledStorageWrapper>
  );
}

let StyledStorageWrapper = styled.section`
  height: ${(props) => (props.vertical ? "100%" : "160px")};
  /* width: ${(props) => (props.vertical ? "100%" : "calc(100% - 20px)")}; */
  padding: ${(props) => (props.vertical ? "10px" : "0px")};
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  flex-shrink: ${(props) => (props.vertical ? "1" : "0")};
  overflow: hidden;
  position: relative;
`;

let StyledStorage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 10px 10px;
  //storage as minimized or expanded
  flex-direction: ${(props) => (props.vertical ? "column" : "row")};
  overflow-x: ${(props) => (props.vertical ? "hidden" : "scroll")};
  overflow-y: ${(props) => (props.vertical ? "scroll" : "hidden")};
  user-select: none;
  position: relative;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  .messsge-for-empty {
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 20px;
    text-align: center;
    font-size: 12px;
    width: 100%;
    height: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: gray;
    z-index: 0;
  }
`;

export default Storage;
