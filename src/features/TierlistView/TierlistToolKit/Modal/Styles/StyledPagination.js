import styled from "styled-components";

let StyledPagination = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 2px solid ${(props) => props.theme.main.accent};
  button {
    border-style: none;
    background-color: transparent;
    height: 80%;
    width: 70px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    /* border: 1px solid white; */
    cursor: pointer;
    /* transform: scale(0.9); */
    transition: 0.2s;
    :hover {
      transform: scale(1.1);
    }
    :active {
      .svg {
        fill: gray;
      }
    }
    .svg {
      fill: white;
      height: 50%;
      width: 50%;
      transition: 0.3s;
    }
    .backwards {
      transform: rotate(180deg);
      opacity: ${({ disableLeft }) => (disableLeft ? "0.3" : "1")};
    }
    .forwards {
      opacity: ${({ disableRight }) => (disableRight ? "0.3" : "1")};
    }
  }
`;

export default StyledPagination;
