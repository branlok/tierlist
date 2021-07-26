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
        onClick={async () => {
          await dispatch(saveTierlist(tierlist));
        }}
      >
        save
      </button>
    </StyledHeader>
  );
}

let StyledHeader = styled.div`
  width: 100%;
  height: 50px;
  flex-shrink: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  flex-shrink: 0;
  /* background-color: rgba(255,255,255,0.5); */
`;

export default Footer;
