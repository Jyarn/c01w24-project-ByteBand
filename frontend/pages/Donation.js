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
    
    top: 340, // Align to the top of the container
    left: -120, // Align to the left of the container
    fontSize: 17,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
  },
  amount_title: {
   
    top: 40, // Align to the top of the container
    left:-100, // Align to the left of the container
    fontSize: 17,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
  },
  redLine: {
    width: "36%", // Or specific length you prefer
    height: 4, // Thin line
    backgroundColor: "red", // Line color
    borderRadius: 15, // Makes edges round, adjust as needed
    position: "absolute",
    top: 158,
    left: 40,
  },
  dollar_sign: {
    top: -42, // Align to the top of the container
    left: -130, // Align to the left of the container
    fontSize: 23,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
    fontWeight: "bold",
  },

  title: {
    top: 40, // Align to the top of the container
    left: "center", // Align to the left of the container
    fontSize: 30,
    color: "#000000",
    margin: 10, // Add a little space from the top and left edges
    
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
    padding: 5,
    marginVertical: 17,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  other_position: {
    position: "relative", // or 'absolute' based on your desired behavior
    top: 20, // Adjust the value as needed to move it down
  },
  other_Text: {
    color: "#000000", // Set the text color
    fontSize: 15,
    textAlign: "center",
  },
  focusedInput: {
    borderColor: "blue", // Keep the same color or change it as needed
  },

  amount_b: {
    width: "80%",
    padding: 5,
    marginVertical: 17,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    borderWidth: 2,
  },

  pay_b: {
    width: "70%",
    padding: 2,
    top: -10,
    marginVertical: 10,
    borderRadius: 10,
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
    fontWeight: "bold", // This makes the text bold
  },

});

export default Donation;
