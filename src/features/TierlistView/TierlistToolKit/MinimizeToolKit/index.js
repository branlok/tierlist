import React, { useState } from "react";
import styled from "styled-components";
import ExplorerModal from "../ExplorerModal";
import MyTierlistModal from "../MyTierlistsModal";
import Storage from "../Storage";
import TierlistInfo from "../TierlistInfo";
import LinkBox from "./LinkBox";
import Logo from "./Logo";

function MiniToolKit({ toolState }) {
  let [modalOpen, setModalOpen] = useState(false);
  return (
    <StyledMiniToolKitWrapper>
      <Logo />
      <LinkBox setModalOpen={setModalOpen} />
      <div className="storage-wrapper">
        <Storage toolState={toolState} />
      </div>
      {modalOpen == "info" && (
        <TierlistInfo modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen == "explorer" && (
        <ExplorerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen == "myTierlists" && (
        <MyTierlistModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
    </StyledMiniToolKitWrapper>
  );
}

let StyledMiniToolKitWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .storage-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    padding: 10px;
  }
`;

export default MiniToolKit;
