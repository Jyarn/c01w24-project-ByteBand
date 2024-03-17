
import React from "react";

import DonatorForm from "./pages/donatorForm";
import Donation from "./pages/Donation";
import UploadWashroomtime from "./pages/uploadWashroomtime";
import AddWashrooms from "./pages/addWashrooms";
import SelectUser from "./pages/selectUser";
import HomeScreen from "./pages/homeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="WashroomUpload"
          component={AddWashrooms}
          options={{ title: "Suggest a new Washroom" }}
        />
        <Stack.Screen
          name="WashroomTimes"
          component={UploadWashroomtime}
        />
        <Stack.Screen
          name="SelectUser"
          component={SelectUser}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="DonatorForm"
          component={DonatorForm}
          options={{headerShown: false }}
        />
        <Stack.Screen
          name="Donation"
          component={Donation}
          options={{headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
