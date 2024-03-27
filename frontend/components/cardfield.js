// CardField.js

import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";

const validateForm = ({ cardNumber = "", expiryDate = "", zip = "", country = "" }) => {
  let errors = [];
  let isValid = true;

  if (cardNumber.replace(/\s/g, "").length !== 16) {
    isValid = false;
    errors.push("Card number is invalid.");
  }
  if (!expiryDate || !expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
    isValid = false;
    errors.push("Expiry date Format should be MM/YY.");
  }
  if (zip.length < 5) {
    isValid = false;
    errors.push("Zip code is invalid. Minimum length of 5 digits & letters.");
  }

  if (!country.match(/^[A-Z]{2}$/)) {
    isValid = false;
    errors.push("Country code is invalid. Use 2-letter code.");
  }

  return { isValid, errors };
};


const CardField = ({ onCardChange }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cvc, setCvc] = useState("");
  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);
  const [isCvcFocused, setIsCvcFocused] = useState(false);
  const handleCvcChange = (text) => {
    // Filter out non-numeric characters
    const numericOnly = text.replace(/[^0-9]/g, '');

    // Update state with filtered text
    setCvc(numericOnly);
  };

  const handleCountryChange = (text) => {
    const cleanedText = text.toUpperCase().replace(/[^A-Z]/g, "");
    setCountry(cleanedText);

    const validationResults = validateForm({
      cardNumber,
      expiryDate,
      zip,
      country: cleanedText,
    });

    onCardChange({ ...validationResults, country: cleanedText });
  };

  const handleZipChange = (text) => {
    const cleanedText = text.toUpperCase().replace(/[^0-9A-Z]/g, "");
    setZip(cleanedText);

    const validationResults = validateForm({
      cardNumber,
      expiryDate,
      zip: cleanedText,
      country,
    });

    onCardChange({ ...validationResults, zip: cleanedText });
  };

  const handleCardNumberChange = (text) => {
    const cleanedText = text
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
    setCardNumber(cleanedText);

    // Now, call validateForm with the updated state
    const validationResults = validateForm({
      cardNumber: cleanedText,
      expiryDate,
      zip,
      country,
    });

    // Pass validation results up to the parent component
    onCardChange({ ...validationResults, cardNumber: cleanedText });
  };

  const handleExpiryDateChange = (text) => {
    let cleanedText = text.replace(/[^\d]/g, "");
    if (cleanedText.length >= 3) {
      cleanedText =
        cleanedText.substring(0, 2) + "/" + cleanedText.substring(2, 4);
    }
    setExpiryDate(cleanedText);

    const validationResults = validateForm({
      cardNumber,
      expiryDate: cleanedText,
      zip,
      country,
    });

    onCardChange({ ...validationResults, expiryDate: cleanedText });
  };

  return (
    <View style={styles.cardFieldContainer}>
        <TextInput
          style={styles.cardNumberInput}
          placeholder=" Card number"
          keyboardType="numeric"
          maxLength={19}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          onFocus={() => setIsCardNumberFocused(true)}
          onBlur={() => setIsCardNumberFocused(false)}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.expirationInput}
            placeholder=" MM/YY"
            keyboardType="numeric"
            maxLength={5}
            value={expiryDate}
            onChangeText={handleExpiryDateChange}
          />
          <TextInput
            style={styles.cvcInput}
            placeholder="CVC"
            keyboardType="numeric"
            maxLength={3}
            value={cvc}
            onChangeText={handleCvcChange}
            onFocus={() => setIsCvcFocused(true)}
            onBlur={() => setIsCvcFocused(false)}
          />
          <Image
            source={require("../images/creditback.png")}
            style={[styles.backIcon, { opacity: isCvcFocused ? 0 : 0.3 }]}
          />
          <Image
            source={require("../images/creditfront.png")}
            style={[styles.frontIcon, { opacity: isCardNumberFocused ? 0 : 0.3 }]}
        />
        </View>
        <View style={styles.inputRow2}>
          <TextInput
            style={styles.countryInput}
            placeholder=" Country Code"
            maxLength={2}
            keyboardType="default"
            value={country}
            onChangeText={handleCountryChange}
          />
          <TextInput
            style={styles.zipInput}
            placeholder=" Zip Code"
            maxLength={12}
            keyboardType="default"
            value={zip}
            onChangeText={handleZipChange}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  frontIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    top:-40,
    right: -10,
  },
  
  backIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    top:10,
    right:-50,
  },
  
  
  cardFieldContainer: {
    width: "112%",
    backgroundColor: "#FFFFFF", // White background for the card field container
    borderColor: "#E6E6E6", // Light grey border matching the image
    padding: 16, // Padding around the inputs
    top: -10,
  },
  inputRow: {
    top: 10,
    flexDirection: "row", // Align inputs in a row
    justifyContent: "space-between", // Distribute space between inputs
  },

  inputRow2: {
    top: 80,
    flexDirection: "row", // Align inputs in a row
    justifyContent: "space-between", // Distribute space between inputs
  },
  cardNumberInput: {
    width: "100%",
    height: 40, // Fixed height for the input
    borderBottomWidth: 1, // Bottom border to separate inputs visually
    borderBottomColor: "#C0C0C0", // Light gray for the bottom border
    fontSize: 13, // Size of the input text
  },
  expirationInput: {
    flex:1, // Allows the input to grow with the container
    width:"70%",
    height: 40, // Fixed height for the input
    borderBottomWidth: 1, // Bottom border to separate inputs visually
    borderBottomColor: "#C0C0C0", // Light gray for the bottom border
    marginRight: -70, // Space between this input and the next
    fontSize: 12, // Size of the input text
  },
  countryInput: {
    flex: 1, // Allows the input to grow with the container
    height: 40, // Fixed height for the input
    borderBottomWidth: 1, // Bottom border to separate inputs visually
    borderColor: "#C0C0C0", // Light gray for the bottom border
    marginRight: -20, // Space between this input and the next
    fontSize: 13, // Size of the input text
  },
  zipInput: {
    width: "40%", // Width is determined by content typically, adjust as needed
    height: 40, // Fixed height for the input
    borderBottomWidth: 1, // Bottom border to separate inputs visually
    borderBottomColor: "#C0C0C0", // Light gray for the bottom border
    fontSize: 13, // Size of the input text
    marginRight: 30,
    left: 30,
  },
  cvcInput: {
    width: "30%", // Width is determined by content typically, adjust as needed
    height: 40, // Fixed height for the input
    borderBottomWidth: 1, // Bottom border to separate inputs visually
    borderBottomColor: "#C0C0C0", // Light gray for the bottom border
    fontSize: 12, // Size of the input text
    left: 80,
  },
});

export default CardField;
