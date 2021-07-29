import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addNewRow, saveTierlist } from "../TierlistSlice";
import { ReactComponent as AddSVG } from "../../../Styles/svg/Add2.svg";
function TierlistHeaders() {
  let dispatch = useDispatch();

  let addRowAndSave = async () => {
    dispatch(addNewRow());
    await dispatch(saveTierlist());
  };

  return (
    <StyledTLHeaderWrapper>
      <StyledColumn>
        <button onClick={addRowAndSave}>
          <span>Add Row </span>
          <AddSVG className="svg" />
        </button>
      </StyledColumn>
      <StyledTLHeader>
        <h1 className="title">This is my tierlist</h1>
        <p>Description if it needs</p>
      </StyledTLHeader>
    </StyledTLHeaderWrapper>
  );
}

let StyledTLHeaderWrapper = styled.div`
  height: 300px;
  width: 100%;
  flex-shrink: 0;
  display: flex;
`;

let StyledColumn = styled.div`
  width: 150px;
  height: 100%;
  color: white;
  flex-shrink: 0;
  display: flex;
  flex-direction: column-reverse;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-style: none;
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    transition: 0.3s;
    :hover {
      background-color: rgba(255, 255, 255, 0.9);
    }
    :active {
      background-color: rgba(255, 255, 255, 0.8);
    }
    span {
      font-weight: bold;
    }
    .svg {
      height: 18px;
      margin: 0px 5px;
    }
  }
`;

let StyledTLHeader = styled.div`
  height: 100%;
  width: 100%;
  color: white;
  padding: 20px;
  .title {
    font-size: 25px;
  }
`;

export default TierlistHeaders;
