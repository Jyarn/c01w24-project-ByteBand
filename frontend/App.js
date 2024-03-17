
import React from "react";
import { View } from "react-native";

import addWashrooms from "./pages/addWashrooms";
import news_article from "./pages/news";
import UploadWashroomtime from "./pages/uploadWashroomtime";
const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    <news_article />

    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}
    </View>
  );
};

export default App;
