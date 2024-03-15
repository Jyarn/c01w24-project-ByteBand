
import React from "react";
import { View } from "react-native";

import AddWashrooms from "./pages/addWashrooms";
import UploadWashroomtime from "./pages/uploadWashroomtime";
import BusinessAcknowledgement from "./pages/businessAcknowledgement";

const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    {/* <AddWashrooms /> */}

    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}

    {/* Render the uploadWashroomtime component */}
    <BusinessAcknowledgement />
    </View>
  );
};

export default App;
