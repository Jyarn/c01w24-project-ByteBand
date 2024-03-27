import { useState } from "react";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapMarker = ({ washroom, onPress }) => {
  const [coordinate, setCoordinate] = useState(null);

  const fetchCoordinate = async () => {
    const geoCodedLocation = await Location.geocodeAsync(washroom.googleAddress);
    setCoordinate(geoCodedLocation[0]);
  }

  fetchCoordinate();

  if (coordinate) {
    return <Marker coordinate={coordinate} onPress={onPress} />
  }
};

export default MapMarker;