
import React from "react";
import { View } from "react-native";

import DonatorForm from "./pages/donatorForm";
import Donation from "./pages/Donation";
import UploadWashroomtime from "./pages/uploadWashroomtime";
import AddWashrooms from "./pages/addWashrooms";
import SelectUser from "./pages/selectUser";
const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    <SelectUser />
    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}
    </View>
  );
};

export default App;
