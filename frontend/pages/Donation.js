import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const handlePress = (amount) => {
    if (amount === selectedAmount) {
      setSelectedAmount(null);
    } else {
      setSelectedAmount(amount);
    }
    setCustomAmount("");
    setIsFocused(false);
  };

  const handleCustomAmountPress = () => {
    let donationAmount;
    if (selectedAmount) {
      donationAmount = selectedAmount;
    } else if (customAmount.trim() !== "") {
      donationAmount = `Custom Amount $${customAmount}`;
    } else {
      alert("Please select or enter a valid amount");
      return;
    }
    alert(`${donationAmount} Donated`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Donate Now</Text>
      <Text style={styles.amount_title}>Donation Amount</Text>
      <Text style={styles.other_title}>Other Amount</Text>
      <View style={styles.redLine}></View>

      {["$5", "$10", "$50", "$100"].map((amount, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.amount_b,
            {
              borderColor: selectedAmount === amount ? "#EE4B2B" : "#F9F9F9",
              backgroundColor: "#F9F9F9",
            },
          ]}
          onPress={() => handlePress(amount)}
        >
          <Text style={styles.amount_Text}>{amount}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={[styles.other_b, styles.other_position, styles.other_Text,{color: 'rgba(0, 0, 0, 0.5)'}]}
        placeholder="Enter Your Donation Amount"
        value={customAmount}
        onChangeText={(text) => {
          setCustomAmount(text);
          setSelectedAmount(null); // Clear selected amount when typing
        }}
        keyboardType="numeric"
        onFocus={() => {
          setIsFocused(true);
          setSelectedAmount(null); 
        }}
        onBlur={() => setIsFocused(false)}
      />
      <Text style={styles.dollar_sign}>$</Text>
      <TouchableOpacity
        style={[styles.pay_b, { backgroundColor: "#EE4B2B" }]}
        onPress={handleCustomAmountPress}
      >
        <Text style={styles.payText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  other_title: {
    position: "absolute",
    top: 650, // Align to the top of the container
    left: 70, // Align to the left of the container
    fontSize: 25,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
  },
  amount_title: {
    position: "absolute",
    top: 150, // Align to the top of the container
    left: 70, // Align to the left of the container
    fontSize: 25,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
  },
  redLine: {
    width: "29%", // Or specific length you prefer
    height: 4, // Thin line
    backgroundColor: "red", // Line color
    borderRadius: 15, // Makes edges round, adjust as needed
    position: "absolute",
    top: 200,
    left: 82,
  },
  dollar_sign: {
    position: "absolute",
    top: 725, // Align to the top of the container
    left: 98, // Align to the left of the container
    fontSize: 30,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
    fontWeight: "bold",
  },

  title: {
    position: "absolute",
    top: 20, // Align to the top of the container
    left: "center", // Align to the left of the container
    fontSize: 35,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
    fontWeight: 400,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  other_b: {
    backgroundColor: "#F9F9F9",
    width: "80%",
    padding: 20,
    marginVertical: 17,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  other_position: {
    position: "relative", // or 'absolute' based on your desired behavior
    top: 80, // Adjust the value as needed to move it down
  },
  other_Text: {
    color: "#000000", // Set the text color
    fontSize: 20,
    textAlign: "center",
  },
  focusedInput: {
    borderColor: "blue", // Keep the same color or change it as needed
  },

  amount_b: {
    width: "80%",
    padding: 20,
    marginVertical: 17,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    top: 10,
    borderWidth: 2,
  },

  pay_b: {
    width: "70%",
    padding: 15,
    top: 150,
    marginVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  payText: {
    color: "#FFFFFF", // Set the text color
    fontSize: 30,
  },
  amount_Text: {
    color: "#000000", // Set the text color
    fontSize: 20,
    fontWeight: 400, // This makes the text bold
  },

});

export default Donation;
