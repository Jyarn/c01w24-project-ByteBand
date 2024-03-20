import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { SERVER_URL } from "../constants/constants";

const UploadWashroomtime = () => {
  // Get schedule from backend

  const [reason, setReason] = useState("");
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        await fetch(`${SERVER_URL}/checkAvailabilitydemo`).then(
          async (response) => {
            if (!response.ok) {
              console.log("Served failed:", response.status);
            } else {
              await response.json().then((data) => {
                getScheduleState(data.response);
              });
            }
          }
        );
      } catch (error) {
        console.log("Fetch function failed:", error);
      }
    };

    getSchedule();
  }, []);

  const getScheduleState = (data) => {
    setSchedule(data);
  }
  if (!schedule) {
    return <Text>Loading...</Text>; // Or any other loading state representation
  }

  return (

    <View style={styles.container}>

      <Text style={styles.header}>Change Schedule</Text>

      <View style={styles.row}>
        <Text style={styles.bold}>Monday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Monday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Monday[0].End}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.bold}>Tuesday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Tuesday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Tuesday[0].End}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={styles.bold}>Wednesday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Wednesday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Wednesday[0].End}</Text>
        </View>
      </View><View style={styles.row}>
        <Text style={styles.bold}>Thursday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Thursday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Thursday[0].End}</Text>
        </View>
      </View><View style={styles.row}>
        <Text style={styles.bold}>Friday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Friday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Friday[0].End}</Text>
        </View>
      </View><View style={styles.row}>
        <Text style={styles.bold}>Saturday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Saturday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Saturday[0].End}</Text>
        </View>
      </View><View style={styles.row}>
        <Text style={styles.bold}>Sunday</Text>
        <View style={styles.rightRow}>
        <Text
          style={[styles.text]}>Open:</Text>
          <Text style={styles.bold}>{schedule.Sunday[0].Start}</Text>
        <Text
          style={[styles.text]}>Close:</Text>
          <Text style={styles.bold}>{schedule.Sunday[0].End}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Tell us what happened"
        value={reason}
        onChangeText={setReason}
      />

      <View><Image
        style={styles.photo}
        source={require('../assets/import.png')} /></View>
        </View>


  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
  },
  text: {
    marginRight: 10
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 45,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 10
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 15,
  },
  rightRow: {
    flexDirection: "row",
  },
  submitButton: {
    backgroundColor: "red",
    borderRadius: 5,
  },
  submitText: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  photo:{
    width:128,
    height:128,
    marginLeft: 100,
    marginTop: 64,
  },
});

export default UploadWashroomtime;
