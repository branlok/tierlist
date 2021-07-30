import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { saveTierlist } from "../TierlistSlice";

function Footer() {
  let tierlist = useSelector((state) => state.loadedTierlist);
  let dispatch = useDispatch();

  return (
    <StyledHeader>
      <button
        className="save-button"
        onClick={async () => {
          await dispatch(saveTierlist(tierlist));
        }}
      >
        Save to Collection
      </button>
    </StyledHeader>
  );
}

let StyledHeader = styled.div`
  width: 100%;
  padding-top: 10px;
  height: 80px;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  /* border: 1px solid white; */
  .save-button {
    background-color: #19cd61;
    border-radius: 50px;
    height: 30px;
    font-weight: bold;
    text-align: center;
    border-style: none;
    color: white;
    padding: 0px 10px;
  }
  /* background-color: rgba(255,255,255,0.5); */
`;

export default Footer;
