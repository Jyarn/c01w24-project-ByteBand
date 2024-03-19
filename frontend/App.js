import React from "react";
import { View } from "react-native";

import AddWashrooms from "./pages/addWashrooms";
import UploadWashroomtime from "./pages/uploadWashroomtime";
import AddRatings from "./pages/addRatings";

const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    {/* <AddWashrooms /> */}

    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}

    {/* Render the addRatings component */}
    {/*** Hard coded to test the addRatings component ***/}
    <AddRatings washroomId="65f9e3b27d8146a5049b2f77"/>
    </View>
  );
};

export default App;
