import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import BusinessLogo from "../components/businessLogo";

const SERVER_URL = "http://localhost:4000";

const BusinessAcknowledgement = () => {
  // Get acknowledged businesses from backend

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState(undefined);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        await fetch(`${SERVER_URL}/getBusinessAcknowledgementdemo`).then(
          async (response) => {
            if (!response.ok) {
              console.log("Server failed:", response.status);
            } else {
              await response.json().then((data) => {
                getBusinessState(data.response);
              });
            }
          }
        );
      } catch (error) {
        console.log("Fetch function failed:", error);
      } finally {
        setLoading(false);
      }
    };

    getBusinesses();
  }, []);

  const getBusinessState = (data) => {
    setBusinesses(data);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!businesses) {
    return <Text>{businesses}</Text>;
  }

  let i = 0; // temporary for generating unique keys

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Acknowledgements</Text>
      <ScrollView contentContainerStyle={styles.businessList}>
        { businesses.map((business) => {
          return <BusinessLogo business={i++} logo={business.logo} />
        }) }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  heading: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingVertical: "4%",
  },

  businessList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default BusinessAcknowledgement;