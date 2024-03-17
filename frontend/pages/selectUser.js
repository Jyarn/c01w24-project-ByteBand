import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageButton from "../components/imageButton";

const SelectUser = ({navigation}) => {
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

    const confirmDeletion = (name) => {
        Alert.alert('Confirm Deletion of User', 'Are you sure you want to delete ' + name + '?',
            [
                {
                    text: 'Yes',
                    onPress: () => deleteUser(name),
                },
                {
                    text: 'No',
                    onPress: () => console.log('Delete Cancelled'),
                },
            ]);
    }

    const deleteUser = async (name) => {
        try {
            if (users[name] == null) return;
            delete users[name];
            const userJSON = JSON.stringify(users);
            await AsyncStorage.setItem('users', userJSON);
            setUsers(await getUsers());
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const loadUsers = async () => {
            setUsers(await getUsers());
        }
        loadUsers();
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Donate Now</Text>
                <Text style={styles.amount_title}>Choose User</Text>
                <View style={styles.redLine} />
                <View style={styles.userList}>
                    {users == {} ? <View />
                        : Object.keys(users).map((name) => (
                            <View style={styles.userEntry}>
                                <TouchableOpacity
                                    key={name}
                                    style={[
                                        styles.userButton,
                                        {
                                            borderColor: selected === name ? "#EE4B2B" : "#F9F9F9",
                                            backgroundColor: "#F9F9F9",
                                        },
                                    ]}
                                    onPress={() => setSelected(name)}
                                >
                                    <Text style={styles.name_Text}>{name}</Text>
                                    <Image
                                        style={styles.icon}
                                        source={users[name]["company"] ?
                                            imageSource = require('../images/company.png')
                                            : require('../images/user.png')}
                                    />
                                </TouchableOpacity>
                                <ImageButton
                                    key={name + "Delete"}
                                    onPress={() => confirmDeletion(name)}
                                    imageStyle={{ height: 50, width: 50, marginTop: -15 }}
                                    imageSource={require('../images/delete.png')}
                                />
                            </View>
                        ))}
                    {Object.keys(users).length >= 4 ? <View />
                        : <TouchableOpacity onPress={() => navigation.navigate('DonatorForm')} style={styles.addButton}>
                            <Text style={styles.addText}>+</Text>
                        </TouchableOpacity>}
                </View>
            </View>
            {selected == "" ? <View />
                : <TouchableOpacity onPress={() => navigation.navigate('Donation')} style={styles.submitButton}>
                    <Text style={styles.submitText}>Pay</Text>
                </TouchableOpacity>}
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
        tintColor: '#EE4B2B',
    },
    userEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userButton: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        padding: 15,
        borderRadius: 15,
        top: -50,
        borderWidth: 2,
    },
    name_Text: {
        color: "#000000", // Set the text color
        fontSize: 25,
    },
    userList: {
        marginHorizontal: '5%',
        marginTop: '20%',
        gap: 40,
    },
    addButton: {
        backgroundColor: '#EE4B2B',
        borderRadius: 15,
        width: "20%",
        marginLeft: "40%",
        marginTop: -50,
    },
    addText: {
        color: "white",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
    },
    submitButton: {
        backgroundColor: '#EE4B2B',
        borderRadius: 15,
        width: '40%',
        marginLeft: "30%",
        marginBottom: '5%',
    },
    submitText: {
        color: "white",
        padding: 10,
        textAlign: "center",
        fontSize: 20,
    },
});

export default SelectUser;