import React, { useState } from "react";
import styled from "styled-components";
import ExplorerModal from "../Modal/ExplorerModal";
import MyTierlistModal from "../Modal/MyTierlistsModal";
import Storage from "../Storage/Storage";
import TierlistInfo from "../Modal/TierlistInfoModal";
import LinkBox from "./LinkBox";
import Logo from "./Logo";
import { fadeIn } from "../../../../GlobalStyles";
import Footer from "../ExpandedToolkit/Footer";

/**
 * renders minimize toolbar
 *
 * @param {boolean} param0.toolState - use to adjust storage view
 * @returns minimized version which onctains modal links, storage and logo
 */
function MiniToolKit({ toolState }) {
  let [modalOpen, setModalOpen] = useState(false);
  return (
    <StyledMiniToolKitWrapper>
      <Logo />
      <LinkBox setModalOpen={setModalOpen} />
      <Storage toolState={toolState} />
      {modalOpen === "info" && (
        <TierlistInfo modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen === "explorer" && (
        <ExplorerModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      {modalOpen === "myTierlists" && (
        <MyTierlistModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}
      <Footer />
    </StyledMiniToolKitWrapper>
  );
}

let StyledMiniToolKitWrapper = styled.aside`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default MiniToolKit;
