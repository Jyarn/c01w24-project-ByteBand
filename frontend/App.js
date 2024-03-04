
import React from "react";
import { View } from "react-native";

import AddWashrooms from "./pages/addWashrooms"; 
import UploadWashroomtime from "./pages/uploadWashroomtime";
const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    <AddWashrooms />
    </View>
  );
};

export default App;
