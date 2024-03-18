import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import BusinessLogo from "../components/businessLogo";
import { Client } from "../prismic.js";

const BusinessAcknowledgement = () => {

  const [loading, setLoading] = useState(true);
  const [businesses, setBusinesses] = useState(undefined);

  useEffect(() => {
    const getBusinesses = async () => {
      try {
        Client.getSingle("business_acknowledgement").then((doc) => {
          let businesses = [];
          for (const business of doc.data.businesses) {
            businesses.push({ id: business.logo.id, logo: business.logo.url })
          }
          getBusinessState(businesses);
        });
      } catch (error) {
        console.log("Could not find document");
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
    return <Text>No businesses found</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Acknowledgements</Text>
      <ScrollView contentContainerStyle={styles.businessList}>
        { businesses.map((business) => {
          return <BusinessLogo key={business.id} logo={business.logo} />
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
    fontSize: 25,
    paddingVertical: "4%",
  },

  businessList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

export default BusinessAcknowledgement;