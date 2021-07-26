import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { newTierlistBuild } from "../TierlistView/TierlistSlice";

function Home() {
  //create new tierlist and redirect
  let dispatch = useDispatch();
  let id = nanoid();
  dispatch(newTierlistBuild({ id }));

  return <Redirect to={`/build/${id}`} />;
}

export default Home;
