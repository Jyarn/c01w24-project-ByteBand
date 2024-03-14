import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import ImageButton from "../components/imageButton";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SelectUser = () => {
    const [users, setUsers] = useState({});
    const [selected, setSelected] = useState("");

    const getUsers = async () => {
        try {
            const userJSON = await AsyncStorage.getItem('users');
            return userJSON != null ? JSON.parse(userJSON) : {};
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const loadUsers = async () => {
            setUsers(await getUsers());
            console.log(users);
            console.log(Object.keys(users));
        }
        loadUsers();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={styles.title}>Donate Now</Text>
                <Text style={styles.amount_title}>Choose User</Text>
                <View style={styles.redLine} />
                <View style={styles.userList}>
                    {users == {} ? <View />
                        : Object.keys(users).map((name) => (
                            <TouchableOpacity
                                key={name}
                                style={[
                                    styles.amount_b,
                                    {
                                        borderColor: selected === name ? "#EE4B2B" : "#F9F9F9",
                                        backgroundColor: "#F9F9F9",
                                    },
                                ]}
                                onPress={() => setSelected(name)}
                            >
                                <Text style={styles.name_Text}>{name}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            </View>
            <ImageButton
                onPress={() => console.log("navigate to add page")}
                imageStyle={styles.icon}
                imageSource={require('../images/placeholderIcon.webp')}
            />
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        padding: 20,
    },
    amount_title: {
        fontSize: 17,
        color: "#000000",
        margin: 10, // Add a little space from the top and left edges
    },
    redLine: {
        width: "28%", // Or specific length you prefer
        height: 3, // Thin line
        backgroundColor: "red", // Line color
        borderRadius: 15, // Makes edges round, adjust as needed
        top: -10,
        left: 10,
    },
    title: {
        top: 10,
        left: "center", // Align to the left of the container
        fontSize: 30,
        color: "#000000",
        margin: 10, // Add a little space from the top and left edges
        alignSelf: 'center',
    },
    icon: {
        height: 50,
        width: 50,
        tintColor: 'red',
        alignSelf: 'center',
        marginBottom: 50,
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
    name_Text: {
        color: "#000000", // Set the text color
        fontSize: 20,
    },
    userList: {
        marginLeft: '15%',
        marginTop: '20%',
    }
});

export default SelectUser;