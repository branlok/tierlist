import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { newTierlistBuild } from "../TierlistView/TierlistSlice";

/**
 * Parent Route Component - immediately redirect user to /build with newly generated id param for project.
 *
 * @returns Redirect
 *
 */
function Home() {
  let dispatch = useDispatch();
  let id = nanoid();
  //alter loadedTierlist to loading before redirect
  dispatch(newTierlistBuild({ id }));

  return <Redirect to={`/build/${id}`} />;
}

export default Home;
