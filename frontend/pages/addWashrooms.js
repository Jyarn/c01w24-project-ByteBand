import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RadioButton } from 'react-native-paper';
import { SERVER_URL } from "../constants/constants.js";

import ProvinceSelector from "../components/provinceSelector";
import ImageButton from "../components/imageButton";

const AddWashrooms = ({ navigation }) => {
  const [isUser, setIsUser] = useState("User");
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postal, setPostal] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // check if any fields are left empty
    if (locationName == "" || address == "" || city == "" || province == ""
      || postal == "" || email == "") {
      setError("Please Fill in All Fields");
      return;
    }

    // check if address starts with number
    if (!address.match(/^\d+(\s\w+){2,}/)) {
      setError("Please Enter Address as number street name");
      return;
    }

    // check for valid postal codes
    if (!postal.match(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)) {
      setError("Please Enter a valid Postal Code");
      return;
    }

    // check if email is of valid format
    if (!email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) {
      setError("Please Enter a valid Email Address");
      return;
    }

    setError("");

    const res = await fetch(`${SERVER_URL}/submitWashroom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: isUser,
        name: locationName,
        address: address,
        city: city,
        province: province,
        postal: postal.replace(/\s/g, ""),
        email: email,
      }),
    });

    const body = await res.json();

    if (res.status == 200) {
      navigation.navigate('Home');
    } else {
      console.log(`failed to submit washroom application (${body.error})`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', marginVertical: 20}}>
        <ImageButton
          onPress={() => navigation.navigate('Home')}
          imageStyle={{ height: 20, width: 20 }}
          imageSource={require('../images/back.png')}
        />
        <Text style={styles.header}>Suggest a New Washroom</Text>
      </View>
      <View style={styles.radioContainer}>
        <RadioButton
          value="User"
          status={isUser === 'User' ? 'checked' : 'unchecked'}
          color="red"
          onPress={() => setIsUser('User')}
        />
        <Text style={styles.radioText}>User</Text>
        <RadioButton
          value="Business"
          status={isUser === 'Business' ? 'checked' : 'unchecked'}
          color="red"
          onPress={() => setIsUser('Business')}
        />
        <Text style={styles.radioText}>Business</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        value={locationName}
        autoCapitalize="words"
        onChangeText={setLocationName}

      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        value={address}
        autoCapitalize="words"
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        value={city}
        autoCapitalize="words"
        onChangeText={setCity}
      />
      <View style={styles.row}>
        <ProvinceSelector province={province} setProvince={setProvince} />
        <TextInput
          style={[styles.input, styles.flexHalf]}
          placeholder="Postal Code"
          placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
          value={postal}
          autoCapitalize="characters"
          onChangeText={setPostal}
        />
      </View>
      <Text style={styles.header}>Your Contact Info:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {isUser == "Business" ? <Text style={[styles.subtext, styles.invis]}>
        Contact info is only to inform you if application was successful</Text> :
        <Text style={styles.subtext}>Contact info is only to inform you if application was successful</Text>}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{error}</Text>
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
    marginTop: 10,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 50,
    left: 40,
  },
  radioText: {
    textAlign: "center",
    marginTop: 7,
    marginRight: 25,
    left: -50,
  },
  input: {
    backgroundColor: "#F9F9F9",
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexHalf: {
    width: "48%",
  },
  submitButton: {
    backgroundColor: "#EE4B2B",
    borderRadius: 5,
    padding: 3,
    marginTop: 50,
    width: "40%",
    left: 110,
  },
  submitText: {
    color: "white",
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  subtext: {
    color: "gray",
    marginTop: -10,
    right: -5,
  },

  invis: {
    opacity: 0,
  },
  errorText: {
    color: "red",
    marginTop: 10,
  },
});

export default AddWashrooms;
