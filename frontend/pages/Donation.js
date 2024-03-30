import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import ImageButton from "../components/imageButton";
import CardField from "../components/cardfield";
import { SERVER_URL } from "../constants/constants";
const Donation = ({ route, navigation }) => {
  const { userName } = route.params;
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isPaymentSheetVisible, setPaymentSheetVisible] = useState(false);
  const [isThankYouModalVisible, setThankYouModalVisible] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [isFocused, setIsFocused] = useState(false);


  const handleCardChange = (cardData) => {
    setFormIsValid(cardData.isValid);
    setFormErrors(cardData.errors);
  };

  const handlePaymentSuccess = async () => {
    setAttemptedSubmit(true);
    if (!formIsValid) {
      return;
    }
    const donationData = {
      donatorName: userName,
      donatedAmount: selectedAmount || customAmount,
    };
    await fetch(`${SERVER_URL}/submitDonation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setPaymentSheetVisible(false);
        setThankYouModalVisible(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handlePress = (amount) => {
    setSelectedAmount(amount === selectedAmount ? null : amount);
    setCustomAmount("");
  };

  const handleCustomAmountPress = () => {
    if (!selectedAmount && customAmount.trim() === "") {
      alert("Please select or enter a valid amount");
      return;
    }
    setPaymentSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop: 40,
          marginRight: "25%",
        }}
      >
        <ImageButton
          onPress={() => navigation.navigate("SelectUser")}
          imageStyle={{ height: 30, width: 30 }}
          imageSource={require("../images/back.png")}
        />
        <Text style={styles.title}>Donate Now</Text>
      </View>
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
        style={[
          styles.other_b,
          styles.other_position,
          styles.other_Text,
          { color: "rgba(0, 0, 0, 0.5)" },
        ]}
        placeholder="Enter Your Donation Amount"
        value={customAmount}
        onChangeText={(text) => {
          const cleanedText = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
          setCustomAmount(cleanedText);
          setSelectedAmount(null);
        }}
        onFocus={() => {
          setIsFocused(true);
          setCustomAmount("");
          setSelectedAmount(null);
        }}
        onBlur={() => setIsFocused(false)}
        keyboardType="numeric"
      />

      <Text style={styles.dollar_sign}>$</Text>
      <TouchableOpacity
        style={[styles.next_b, { backgroundColor: "#EE4B2B" }]}
        onPress={handleCustomAmountPress}
      >
        <Text style={styles.nextText}>next</Text>
      </TouchableOpacity>

      <Modal
        visible={isPaymentSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPaymentSheetVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.CardText}>Card information</Text>
            <CardField onCardChange={handleCardChange} />
            <Text style={styles.CRText}>Country or region</Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setPaymentSheetVisible(false);
                setAttemptedSubmit(false);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePaymentSuccess}
              style={[styles.pButton, !formIsValid]}
            >
              <Text style={styles.pButtonText}>Pay</Text>
            </TouchableOpacity>
            {attemptedSubmit && formErrors.length > 0 && (
              <View>
                {formErrors.map((error, index) => (
                  <Text key={index} style={styles.errorMessages}>
                    {error}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>

      <Modal
        visible={isThankYouModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setThankYouModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.thankYouText}>
              Thank you for your donation!
            </Text>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => navigation.navigate("SelectUser")}
            >
              <Text style={styles.homeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessages: {
    color: "red",
    marginVertical: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  thankYouText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#FF3B30",
    top: 10,
  },

  CardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "flex-start",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF3B30",
    right: 8,
  },
  CRText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "flex-start",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FF3B30",
    top: -45,
    right: 8,
  },
  pButton: {
    backgroundColor: "#FF3B30",
    marginTop: 40,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
    top: -40,
  },
  pButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    top: -1,
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    marginTop: 40,
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 6,
    elevation: 2,
    top: -310,
    left: 150,
  },
  homeButton: {
    backgroundColor: "#FF3B30",
    marginTop: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 2,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    top: -1,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    top: -1,
  },

  other_title: {
    top: 280, // Align to the top of the container
    left: -110, // Align to the left of the container
    fontSize: 17,
    color: "#000000",
    margin: 10,
  },
  amount_title: {
    top: 0, // Align to the top of the container
    left: -100, // Align to the left of the container
    fontSize: 17,
    color: "#000000",
    margin: 10,
  },
  redLine: {
    width: "40%",
    height: 3,
    backgroundColor: "red",
    borderRadius: 15,
    position: "relative",
    top: -55,
    left: -100,
  },
  dollar_sign: {
    top: -104,
    left: -130,
    fontSize: 23,
    color: "#000000",
    margin: 10,
    fontWeight: "bold",
  },

  title: {
    top: 10,
    left: "center", // Align to the left of the container
    fontSize: 30,
    color: "#000000",
    marginLeft: "20%",
    marginBottom: 15,
    alignSelf: "center",
    textAlignVertical: "center",
  },
  container: {
    flex: 1,
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
    position: "relative",
    top: -40,
  },
  other_Text: {
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
  },
  focusedInput: {
    borderColor: "blue",
  },

  amount_b: {
    width: "80%",
    padding: 5,
    marginVertical: 17,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    top: -50,
    borderWidth: 2,
  },

  next_b: {
    width: "60%",
    padding: 3,
    top: -60,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 30,
    top: -2,
  },
  amount_Text: {
    color: "#000000",
    fontSize: 20,
  },
});

export default Donation;
