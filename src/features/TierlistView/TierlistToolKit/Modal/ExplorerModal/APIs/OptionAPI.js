import React from "react";
import styled from "styled-components";

function OptionAPI({ logo, title, description, setView, containerColor }) {
  return (
    <StyledAPIOption containerColor={containerColor}>
      <div className="logo-container">{logo}</div>
      <div className="caption">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setView(title)}>Search on {title}</button>
      </div>
    </StyledAPIOption>
  );
}

export default OptionAPI;

let StyledAPIOption = styled.div`
  display: flex;
  height: calc(50% - 20px);
  min-width: 350px;
  flex-shrink: 0;
  /* height: 100%; */
  width: 100%;
  background-color: ${(props) => props.theme.main.base};
  background-color: ${(props) => props.containerColor};
  border-radius: 8px;
  padding: 10px;
  /* margin: 10px; */
  margin: 10px;
  transition: 0.2s;
  overflow: hidden;
  display: flex;
  align-items: space-between;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  /* justify-content:center; */
  :hover {
    /* background-color: ${(props) => props.theme.main.accent}; */
  }
  .logo-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    height: 100%;
    width: 40%;
    margin-right: 10px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.12);
  }
  h2 {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
    flex-shrink: 0;
    color: ${(props) => props.theme.fontColor["100"]};
    color: black;
  }
  .caption {
    /* width: 100%;
    height: 100%; */
    width: 60%;
    overflow: hidden;
    color: white;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    h2 {
      height: 20px;
      flex-shrink: 0;
    }
    p {
      height: 100%;
      overflow: hidden;
      color: #303030;
      font-weight: bold;
    }
    button {
      margin-top: 15px;
      height: 35px;
      flex-shrink: 0;
      cursor: pointer;
      border-style: none;
      border-radius: 5px;
      transition: 0.2s;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      font-weight: bold;
      :hover {
        background-color: rgba(0, 0, 0, 1);
        color: white;
      }
    }
  }
`;
