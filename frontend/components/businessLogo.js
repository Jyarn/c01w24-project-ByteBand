import {
  View,
  Image,
  StyleSheet,
} from "react-native";

const BusinessLogo = ({ business, logo }) => {
  return (
    <View key={business} style={styles.businessContainer}>
      <Image style={styles.businessLogo} source={{ uri: logo }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  businessContainer: {
    aspectRatio: 3/2,
    width: "30%",
    height: "30%",
    margin: 4,
  },
  
  businessLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default BusinessLogo;