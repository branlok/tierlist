import styled from "styled-components";

let StyledInfoOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  backdrop-filter: blur(10px);
  top: 0px;
  left: 0px;
  z-index: 2;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  h1 {
    margin-bottom: 10px;
    font-size: 20px;
  }
  .instruction {
    background-color: #262626;
    padding: 5px;
    border-radius: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 5px;
    width: 250px;
    .svg {
      margin: 5px;
    }
    .instruction-text {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .main {
        font-size: 12px;
        font-weight: bold;
      }
      .extra {
        font-size: 10px;
        color: gray;
      }
    }
  }
  .footnote {
    font-size: 12px;
    margin-top: 20px;
  }
`;

export default StyledInfoOverlay;
