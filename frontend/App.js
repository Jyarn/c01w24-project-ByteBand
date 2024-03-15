import React from "react";
import { View } from "react-native";

import AddWashrooms from "./pages/addWashrooms";
import UploadWashroomtime from "./pages/uploadWashroomtime";
import NewsArticle from "./components/newsArticle"

const App = () => {
  return (
  <View style={{ flex: 1 }}>
    {/* Render the addWashrooms component */}
    {/*<AddWashrooms />*/}


    {/* Render the uploadWashroomtime component */}
    {/* <UploadWashroomtime /> */}

    {/* Render news article component */}
    <NewsArticle uid={"testarticle1"}/>
    </View>
  );
};

export default App;
