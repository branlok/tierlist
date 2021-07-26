import React from "react";
import styled from "styled-components";

function TierlistHeaders() {
  return (
    <StyledTLHeaderWrapper>
      <StyledColumn>Settings</StyledColumn>
      <StyledTLHeader>
        <h1 className="title">tierlistname</h1>
        <p>DEscription</p>
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
