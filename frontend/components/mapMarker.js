import { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

const MapMarker = ({ washroom, onPress }) => {
  const [coordinate, setCoordinate] = useState(null);

  useEffect(() => {
    const fetchCoordinate = async () => {
      try {
        await Location.geocodeAsync(washroom.googleAddress).then((data) => {
          setCoordinate(data[0]);
        });
      } catch (error) {
        console.log("Fetch marker coordinate failed:", error);
      }
    }

    fetchCoordinate();
  }, []);

  if (coordinate) {
    return <Marker coordinate={coordinate} onPress={onPress} />
  }
};

export default MapMarker;