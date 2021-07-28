import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addNewRow, saveTierlist } from "../TierlistSlice";

function TierlistHeaders() {
  let dispatch = useDispatch();

  let addRowAndSave = async () => {
    dispatch(addNewRow());
    await dispatch(saveTierlist());
  };

  return (
    <StyledTLHeaderWrapper>
      <StyledColumn>
        <button onClick={addRowAndSave}>Add Row</button>
      </StyledColumn>
      <StyledTLHeader>
        <h1 className="title">This is my tierlist</h1>
        <p>Description if it needs</p>
      </StyledTLHeader>
    </StyledTLHeaderWrapper>
  );
}

let StyledTLHeaderWrapper = styled.div`
  height: 200px;
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
