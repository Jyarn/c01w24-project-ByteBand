
import React from "react";
import { View } from "react-native";

import Donation from "./pages/Donation";
import UploadWashroomtime from "./pages/uploadWashroomtime";
const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    <Donation />
    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}
    </View>
  );
};

export default App;
