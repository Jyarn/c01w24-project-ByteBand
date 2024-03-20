import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView from "react-native-maps";
import NavBar from "../components/navBar"

export default HomeScreen = ({navigation}) => {
  //currently this does nothing as we can't search locations
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{width: '100%', height: '100%'}}
        initialRegion={{
          latitude: 43.7824,
          longitude: -79.1863,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
        mapPadding={{top:100, left: 315}}
      />
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Search for a place or address"
          value={searchLocation}
          onChangeText={setSearchLocation}
        />
        <TouchableOpacity onPress={()=> Alert.alert("Covid Alert", "Covid was bad")} style={styles.announcement}>
          <Text style={styles.announcementText}>Announcements</Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={navigation}/>
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
  input: {
    backgroundColor: 'white',
    height: 40,
    width: '90%',
    borderRadius: 30,
    borderColor: 'red',
    borderWidth: 0,
    padding: 10,
    fontSize: 16,
  },
  announcement: {
    backgroundColor: 'red',
    height: 40,
    maxWidth: '38%',
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'red',
    paddingLeft: 10,
    borderWidth: 3,
    justifyContent: 'center'
  },
  announcementText: {
    fontSize: 16,
    color: 'white',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 10,
    left: '5%',
    height: '10%',
    width: '90%',
    alignSelf: 'flex-end',
    borderRadius: 20,
    borderColor: 'red',
    borderWidth: 3,
  },
});