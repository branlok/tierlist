import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { addImage } from "../../imageHandler/imageSlice";
import { addItem } from "../TierlistSlice";
import Explorer from "./Explorer";
import FileDropper from "./FileDropper";
// import FileDropper from "./FileDropper";
// import FileDropper from "./FileDropper";

import Footer from "./Footer";
import Header from "./Header";
import Storage from "./Storage";

function TierlistToolkit() {

  return (
    <StyledSidebar>
      <Header />
      <Explorer />
      <Storage />
      <FileDropper />
      <Footer />
    </StyledSidebar>
  );
}


let StyledSidebar = styled.div`
  height: 100vh;
  width: 450px;
  padding: 10px;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: #14082e;
  /* z-index: 2; */
  color: white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
`;

export default TierlistToolkit;
