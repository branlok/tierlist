import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { saveTierlist } from "../../TierlistSlice";
import FinalizeModal from "../Modal/FinalizeModal";

function Footer() {
  // let tierlist = useSelector((state) => state.loadedTierlist);
  // let dispatch = useDispatch();
  let [openFinalize, setOpenFinalize] = useState(false);

  return (
    <StyledFinalize>
      <button
        className="save-button"
        onClick={() => setOpenFinalize(true)}
        // onClick={async () => {
        //   await dispatch(saveTierlist(tierlist));
        // }}
      >
        Save to Collection
      </button>
      {openFinalize ? (
        <FinalizeModal setOpenFinalize={setOpenFinalize} />
      ) : null}
    </StyledFinalize>
  );
}

let StyledFinalize = styled.div`
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
    background-color: ${(props) => props.theme.main.accent};
    border-radius: 50px;
    height: 30px;
    font-weight: bold;
    text-align: center;
    border-style: none;
    color: white;
    padding: 0px 10px;
    transition: 0.1s;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.main.primaryVarient};
      transform: scale(0.95);
    }
    :active {
      transform: scale(0.9);
    }
  }
  /* background-color: rgba(255,255,255,0.5); */
`;

export default Footer;
