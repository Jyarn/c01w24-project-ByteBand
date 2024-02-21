import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RadioButton } from 'react-native-paper';
import ProvinceSelector from '../components/provinceSelector'

const addWashrooms = () => {
  const [isUser, setIsUser] = useState("User");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    const addWashrooms = {
      type: isUser,
      locationName,
      address,
      city,
      province,
      postal,
      email,
    };
    // Here you would send this data to a backend server or handle it as required
    console.log(addWashrooms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Info</Text>
      <View style={styles.radioContainer}>
        <RadioButton
          value="User"
          status={isUser === 'User' ? 'checked' : 'unchecked'}
          color="red"
          onPress={() => setIsUser('User')}
        />
        <Text style={styles.radio}>User</Text>
        <RadioButton
          value="Business"
          status={isUser === 'Business' ? 'checked' : 'unchecked'}
          color="red"
          onPress={() => setIsUser('Business')}
        />
        <Text style={styles.radio}>Business</Text>
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
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <View style={styles.row}>
        <ProvinceSelector province={province} setProvince={setProvince} />
        <TextInput
          style={[styles.input, styles.flexHalf]}
          placeholder="Postal"
          value={postal}
          onChangeText={setPostal}
        />
      </View>
      <Text style={styles.header}>Your Contact Info:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {isUser == "Business" ? <Text style={[styles.subtext, styles.invis]}>Filler</Text> : 
        <Text style={styles.subtext}>Contact info is only to inform you if application was successful</Text>}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    gap: 5,
  },
  radio: {
    textAlign: "center",
    marginVertical: "auto",
    marginRight: 25
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
    marginTop: 20,
  },
  submitText: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtext: {
    color:"gray",
    marginTop: -20,
  },
  invis: {
    color:"white",
  }
});

export default addWashrooms;
