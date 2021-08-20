import React from "react";
import { ReactComponent as KitsuLogo } from "../../../../../../Styles/svg/kitsu.svg";
import { ReactComponent as UnsplashLogo } from "../../../../../../Styles/svg/UnsplashLogo.svg";
import OptionAPI from "./OptionAPI";

function OptionsAPI({ view, setView }) {
  return (
    <>
      <header className="header-instructions">
        <h1>Find images you want with the most up to date databases </h1>
      </header>
      <div className="api-selector">
        <OptionAPI
          title={"Kitsu"}
          description={
            "Kitsu is a content discovery platform that helps anime and manga fans track, share and discover more of what they love."
          }
          setView={setView}
          logo={<KitsuLogo className="kitsu-logo" />}
          containerColor={"#fd8320"}
        />
        <OptionAPI
          title={"Unsplash"}
          description={
            "A good resource to get high quality images to create generic lists such as food/sports etc"
          }
          setView={setView}
          logo={<UnsplashLogo className="unsplash-logo" />}
          containerColor={"white"}
        />
      </div>
    </>
  );
}

export default OptionsAPI;
