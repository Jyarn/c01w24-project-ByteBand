import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const SERVER_URL = "http://localhost:4000";

const BusinessAcknowledgement = () => {
  // Get acknowledged businesses from backend

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState(undefined);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        await fetch(`${SERVER_URL}/getBusinesses`).then(
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

  if (!loading) {
    return <Text>Loading...</Text>;
  }

  if (!businesses) {
    return <Text>No businesses</Text>;
  }

  return (
    <View style={styles.container}>
      {businesses.map((business) => {
        return (
          <View style={styles.businessContainer}>
            <Image style={styles.businessLogo} src={business.logo}></Image>
          </View>
        );
      })}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justififyContent: "center",
  },
  acknowledgementText: {

  },
  businessContainer: {
    width: 70,
    height: 50,
    margin: 5,
  },
  businessLogo: {
    objectFit: "contain",
    justififyContent: "center",
  },
});

export default BusinessAcknowledgement;