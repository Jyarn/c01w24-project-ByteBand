import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const addWashrooms = () => {
  const [isUser, setIsUser] = useState(true);
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const addWashrooms = {
      type: isUser ? "User" : "Business",
      locationName,
      address,
      city,
      postal,
      email,
    };
    // Here you would send this data to a backend server or handle it as required
    console.log(addWashrooms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Retail Info:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity onPress={() => setIsUser(true)} style={styles.radio}>
          <Text>User</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsUser(false)} style={styles.radio}>
          <Text>Business</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        value={locationName}
        onChangeText={setLocationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.flexHalf]}
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={[styles.input, styles.flexHalf]}
          placeholder="Postal"
          value={postal}
          onChangeText={setPostal}
        />
      </View>
      <Text style={styles.header}>Contact:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radio: {
    marginRight: 20,
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
    width: "48%",
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
});

export default addWashrooms;
