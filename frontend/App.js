
import React from "react";
import { View } from "react-native";

import AddWashrooms from "./pages/addWashrooms"; 

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Render the addWashrooms component */}
      <AddWashrooms />
    </View>
  );
};

export default App;
