import { View, StyleSheet, } from "react-native";
import ImageButton from "../components/imageButton";

export default NavBar = ({ navigation }) => {
    return (
        <View style={styles.navBar}>
            <ImageButton 
                onPress={() => navigation.navigate('WashroomUpload')} 
                imageStyle={styles.icon} 
                imageSource={require('../images/add.png')}
            />
            <ImageButton 
                onPress={() => navigation.navigate('WashroomInfo')} 
                imageStyle={styles.icon} 
                imageSource={require('../images/schedule.png')} 
            />
            <ImageButton
                onPress={() => navigation.navigate('Donation')}
                imageStyle={styles.icon}
                imageSource={require('../images/donation.png')}
            />
            <ImageButton
                onPress={() => navigation.navigate('BusinessAck')}
                imageStyle={styles.icon}
                imageSource={require('../images/sponsor.png')}
            />
            <ImageButton
                onPress={() => navigation.navigate('Ratings')}
                imageStyle={styles.icon}
                imageSource={require('../images/rating.png')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 10,
        left: '5%',
        height: '10%',
        width: '90%',
        alignSelf: 'flex-end',
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 0,
    },
    icon: {
        height: 50,
        width: 50,
        tintColor: 'red',
    }
})