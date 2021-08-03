import styled, { keyframes } from "styled-components";



export const StyledHeader = styled.div`
  width: 100%;
  height: 35px;
  background-color: #161616;
  border-radius: 10px 10px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-bottom: 1px solid gray;
  flex-shrink: 0;

  .title {
    font-size: 14px;
    margin: 0px;
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  z-index: 10;

  justify-content: center;
  align-items: center;
`;


