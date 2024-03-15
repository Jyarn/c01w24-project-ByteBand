import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.businessList}>
        { businesses.map((business) => {
              return (
                <View key={i++} style={styles.businessContainer}>
                  <Image style={styles.businessLogo} source={{ uri: business.logo }}/>
                </View>
              );
        }) }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
  },

  businessList: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  businessContainer: {
    aspectRatio: 3/2,
    width: "30%",
    height: "30%",
    margin: 4,
    backgroundColor: "blue"
  },
  
  businessLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default BusinessAcknowledgement;