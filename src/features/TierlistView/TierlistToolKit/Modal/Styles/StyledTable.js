import styled from "styled-components";

let StyledTable = styled.table`
  width: 100%;
  /* height: 100%; do not give hieght to table, otherewise will stretch*/
  table-layout: fixed;
  background-color: #242424; //#131313;
  font-size: 13px;
  thead {
    height: 50px;
    background-color: #131313;
    position: sticky; //!! fix to work on chrome
    top: 0px;
    left: 0px;
    tr {
      th {
        text-align: start;
        vertical-align: middle;
        font-weight: bold;
        padding-left: 10px;
        height: 30px;
        transition: 0.2s;
        :hover {
          background-color: rgba(0, 0, 0, 0.9);
        }
        .title {
          width: calc(100% - (4 * 100px));
        }
        .sortSVG {
          fill: gray;
          height: 10px;
          transform: ${(props) => (props.reverse ? "rotate(-180deg)" : "")};
        }
      }
    }
  }
  tbody {
    tr {
      vertical-align: middle;
      height: 60px;
      color: gray;
      :hover {
        color: white;
        background-color: ${(props) =>
          props.confirmDelete ? "" : props.theme.main.accent};
        /* transition: 0s; */
      }
      td {
        padding-left: 10px;
        vertical-align: middle;
      }
      .title {
        color: white;
      }
      .action {
        vertical-align: middle;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        vertical-align: middle;
        width: 100%;
        height: 60px;
      }
    }
  }
`;

export let StyledRow = styled.tr`
  /* background: linear-gradient(to right, transparent 50%, #9c2525 50%);
  background-size: 200% 100%;
  background-position: ${(props) =>
    props.confirmDelete ? "right bottom" : "left bottom"};
  transition: 0.3s; */

  .image {
    height: 50px;
    width: 50px;
    object-fit: cover;
    overflow: hidden;
  }
`;

export let StyledActionLink = styled.a`
  //External
  width: ${(props) => (props.width == "fit" ? "auto" : "40px")};
  height: 40px;
  border-radius: 5px;
  background-color: ${(props) => (props.bg ? props.bg : "#131313")};
  margin-right: 10px;
  border: 3px solid transparent;
  text-decoration: none;
  padding: 0px 15px;
  //Internal
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  //disable appearance
  opacity: ${(props) => (props.disable ? "0.3" : "1")};
  pointer-events: ${(props) => (props.disable ? "none" : "auto")};

  :hover {
    transform: scale(1.15);
    border: 3px solid #e3e3e3;
  }
  :active {
    transform: scale(0.95);
    border: 3px solid #e3e3e3;
  }
`;

export let StyledActionButton = styled.button`
  //External
  width: ${(props) => (props.width == "fit" ? "auto" : "40px")};
  height: 40px;
  border-radius: 5px;
  background-color: ${(props) => (props.bg ? props.bg : "#131313")};
  margin-right: 10px;
  border: 3px solid transparent;
  //Internal
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  //disable appearance
  opacity: ${(props) => (props.disable ? "0.3" : "1")};
  pointer-events: ${(props) => (props.disable ? "none" : "auto")};

  :hover {
    transform: scale(1.15);
    border: 3px solid #e3e3e3;
  }
  :active {
    transform: scale(0.95);
    border: 3px solid #e3e3e3;
  }

  .svg {
    transition: 0.2s;
    height: 13px;
    width: 13px;
    padding: 2px;
    margin: 0px;
    fill: ${(props) => (props.delete ? "#8f1313" : "white")};
    transform: ${(props) =>
      props.delete ? "rotate(-135deg)" : "rotate(0deg)"};
  }
`;

export let StyledCol = styled.button`
  border-style: none;
  background-color: transparent;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  .sortingSVG {
    margin-top: 2px;
    fill: ${({ selected }) => (selected ? "white" : "gray")};
    transition: 0.3s;
    height: 10px;
    transform: ${({ reverse, selected }) =>
      !reverse && selected ? "rotateX(-180deg)" : ""};
  }
`;

export default StyledTable;
