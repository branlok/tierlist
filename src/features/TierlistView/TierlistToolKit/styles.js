import styled, { keyframes } from "styled-components";

export const StyledHeader = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.2); //#161616;
  border-radius: 10px 10px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
  .title {
    font-size: 14px;
    margin: 0px;
  }
  .adder {
    border-style: none;
    background-color: transparent;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .add-svg {
    height: 15px;
    width: 15px;
    fill: white;
    padding: 2px;
    /* border: 1px solid white; */
    transition:0.2s;
    cursor: pointer;
    :hover {
      background-color: rgba(0,0,0,0.5);
    }
  }
`;

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  /* background-color: rgba(255, 255, 255, 0.1); */
  background-color: ${(props) =>
    props.dark ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.1)"}; //#161616;
  display: flex;
  z-index: 10;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
`;
