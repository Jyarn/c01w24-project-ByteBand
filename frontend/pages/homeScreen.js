import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  ActivityIndicator
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import NavBar from "../components/navBar";
import MapMarker from "../components/mapMarker";
import { SERVER_URL } from "../constants/constants";

const DEFAULT_REGION = {
  latitude: 43.7824,
  longitude: -79.1863,
  latitudeDelta: 0.015,
  longitudeDelta: 0.015,
}

export default HomeScreen = ({ navigation }) => {
  const [washrooms, setWashrooms] = useState(undefined);
  const [region, setRegion] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const mapRef = useRef();

  useEffect(() => {
    const getWashrooms = async () => {
      try {
        await fetch(`${SERVER_URL}/getAllWashrooms`).then(async (response) => {
          if (!response.ok) {
            console.log("Server failed:", response.status);
          } else {
            await response.json().then((data) => {
              setWashrooms(data.response);
            })
          }
        });
      } catch (error) {
        console.log("Fetch function failed:", error);
      }
    };

    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissions to access location was denied.");
          setRegion(DEFAULT_REGION);
        } else {
          let location = await Location.getCurrentPositionAsync({});
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          });
        }
      } catch (error) {
        console.log("Get user location failed:", error);
      } finally {
        setLoading(false);
      }
    };

    getWashrooms();
    getUserLocation();
  }, []);

  const fetchSearchLocation = async () => {
    try {
      setLoadingSearch(true);
      await Location.geocodeAsync(searchLocation).then((data) => {
        setRegion({
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        });
        mapRef.current.animateToRegion(region);
        setLoadingSearch(false);
      });
    } catch (error) {
      setLoadingSearch(false);
      console.log("Fetch search location failed:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {loading
        ?
        <View style={styles.mapLoadingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.mapLoadingText}>Fetching map data...</Text>
        </View>
        :
        washrooms &&
        <View>
          <MapView
            style={{ width: '100%', height: '100%' }}
            region={region}
            mapPadding={{ top: 100, bottom: 100 }}
            showsUserLocation={true}
            ref={mapRef}
          >
            {washrooms.map((washroom) => {
              return (
                <MapMarker
                  key={washroom._id}
                  washroom={washroom}
                  onPress={() => (
                    navigation.navigate("WashroomInfo", { washroomId: washroom._id })
                  )}
                />);
            })}
          </MapView>
          <View style={styles.container}>
            <View style={styles.searchBar}>
              <TextInput
                style={styles.input}
                placeholder="Search for a place or address"
                value={searchLocation}
                onChangeText={setSearchLocation}
              />
              <Pressable style={styles.searchButton} onPress={!loadingSearch ? fetchSearchLocation : null}>
                {!loadingSearch
                  ?
                  <Text>Search</Text>
                  :
                  <ActivityIndicator />}
              </Pressable>
            </View>
          </View>
          <NavBar navigation={navigation} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 50,
    height: '20%',
    width: '100%',
    marginLeft: '5%',
  },
  mapLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapLoadingText: {
    fontSize: 24,
  },
  searchBar: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    width: '70%',
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 0,
    padding: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: 'white',
    height: 40,
    width: '20%',
    marginLeft: 5,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center'
  },
});