import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const uploadWashroomtime = () => {
  // Get schedule from backend
  const [reason, setReason] = useState("");
  const [schedule, setSchedule] = useState("");

  const handleSubmit = () => {
    const uploadWashroomtime = {
      schedule,
      reason,
    };
    // Here you would send this data to a backend server or handle it as required
    console.log(uploadWashroomtime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Schedule</Text>
      <View style={styles.row}>
      <Text style={styles.bold}>Monday</Text>

        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View><View style={styles.row}>
      <Text style={styles.bold}>Tuesday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.bold}>Wednesday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.bold}>Thursday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.bold}>Friday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.bold}>Saturday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      <View style={styles.row}>
      <Text style={styles.bold}>Sunday</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Open:</Text>
        <Text
          style={[styles.container, styles.flexHalf]}>Close:</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Tell us what happened"
        value={reason}
        onChangeText={setReason}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
  header: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 45,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 12,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexHalf: {
    width: "36%",
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

export default uploadWashroomtime;