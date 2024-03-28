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
                onPress={() => navigation.navigate('SelectUser')}
                imageStyle={styles.icon}
                imageSource={require('../images/donation.png')}
            />
            <ImageButton
                onPress={() => navigation.navigate('BusinessAck')}
                imageStyle={styles.icon}
                imageSource={require('../images/sponsor.png')}
            />
            <ImageButton
                onPress={() => navigation.navigate('News')}
                imageStyle={styles.icon}
                imageSource={require('../images/news.png')}
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
        bottom: 30,
        left: '10%',
        height: '10%',
        width: '80%',
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