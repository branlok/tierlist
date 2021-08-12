import styled from "styled-components";

export const StyledHeader = styled.header`
  width: 100%;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.2); //#161616;
  background-color: ${props => props.theme.main.primary};

  border-radius: 10px 10px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
  transition: 0.3s;
  :hover {
    background-color: ${props => props.theme.main.accent};
  }
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
    cursor: pointer;
    span {
      color: transparent;
      padding-right: 5px;
      transition: 0.3s;
    }
    :hover span {
      color: white;
    }
  }
  .add-svg {
    height: 10px;
    width: 10px;
    fill: ${(props) => (props.rotateSVG ? "lightgray" : "white")};
    padding-top: 1px;
    transition: 0.2s;
    transform: ${(props) =>
      props.rotateSVG ? "rotate(45deg)" : "rotate(0deg)"};
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
