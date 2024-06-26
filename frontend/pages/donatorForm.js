import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { RadioButton } from 'react-native-paper';
import ProvinceSelector from '../components/provinceSelector'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageButton from "../components/imageButton";

const DonatorForm = ({ navigation }) => {
    const [isCompany, setIsCompany] = useState(false);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [postal, setPostal] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const getUsers = async () => {
        try {
            const userJSON = await AsyncStorage.getItem('users');
            return userJSON != null ? JSON.parse(userJSON) : {};
        } catch (e) {
            console.log(e);
        }
    }

    const storeUsers = async (users) => {
        try {
            const userJSON = JSON.stringify(users);
            await AsyncStorage.setItem('users', userJSON);
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = async () => {
        // check if any fields are left empty
        if (name == "" || address == "" || city == "" || province == ""
            || postal == "" || email == "") {
            setError("Please Fill in All Fields");
            return;
        }

        const userJSON = await AsyncStorage.getItem('users');
        const userList = Object.keys(JSON.parse(userJSON));
        // check name isn't already a user
        if (userList.includes(name)) {
            setError("User with this name is already registered");
            return;
        }
        
        // check if address starts with number
        if (!address.match(/^\d+(\s\w+){2,}/)) {
            setError("Please Enter Address as number street name");
            return;
        }

        // check for valid postal codes
        if (!postal.match(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)) {
            setError("Please Enter a valid Postal Code");
            return;
        }

        // check if email is of valid format
        if (!email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setError("Please Enter a valid Email Address");
            return;
        }

        setError("");

        const user = {
            "company": isCompany,
            "address": address,
            "city": city,
            "province": province,
            "postal": postal.replace(/\s/g, ""),
            "email": email
        }
        const users = await getUsers();
        users[name] = user;
        await storeUsers(users);
        navigation.navigate('SelectUser')
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginVertical: 20 }}>
                <ImageButton
                    onPress={() => navigation.navigate('SelectUser')}
                    imageStyle={{ height: 30, width: 30 }}
                    imageSource={require('../images/back.png')}
                />
                <Text style={styles.title}>Donate Now</Text>
            </View>
            <Text style={styles.amount_title}>Add User</Text>
            <View style={styles.redLine} />
            <View style={styles.radioContainer}>
                <RadioButton
                    value="Individual"
                    status={isCompany ? 'unchecked' : 'checked'}
                    color="red"
                    onPress={() => setIsCompany(false)}
                />
                <Text style={styles.radioText}>Individual</Text>
                <RadioButton
                    value="Corporation"
                    status={isCompany ? 'checked' : 'unchecked'}
                    color="red"
                    onPress={() => setIsCompany(true)}
                />
                <Text style={styles.radioText}>Corporation</Text>
            </View>
            {isCompany ?
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    placeholder="Corporation Name"
                    value={name}
                    autoCapitalize="words"
                    onChangeText={setName}
                /> :
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    placeholder="Name"
                    value={name}
                    autoCapitalize="words"
                    onChangeText={setName}
                />}

            <TextInput
                style={styles.input}
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                placeholder="Address"
                value={address}
                autoCapitalize="words"
                onChangeText={setAddress}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                placeholder="City"
                value={city}
                autoCapitalize="words"
                onChangeText={setCity}
            />
            <View style={styles.row}>
                <ProvinceSelector province={province} setProvince={setProvince} />
                <TextInput
                    style={[styles.input, styles.flexHalf]}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    placeholder="Postal Code"
                    value={postal}
                    autoCapitalize="characters"
                    onChangeText={setPostal}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>+</Text>
            </TouchableOpacity>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 20,
    },
    amount_title: {
        fontSize: 17,
        color: "#000000",
        margin: 10, // Add a little space from the top and left edges
    },
    redLine: {
        width: "20%", // Or specific length you prefer
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
        marginLeft: '15%',
        marginBottom: 15,
        alignSelf: 'center',
        textAlignVertical: 'center',
    },
    radioContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 50,
        left: 10,
    },
    radioText: {
        textAlign: "center",
        marginTop: 7,
        marginRight: 25,
        left: -50,
    },
    input: {
        backgroundColor: "#F9F9F9",
        marginBottom: 20,
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 15,
        fontSize: 13,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    flexHalf: {
        width: "48%",
    },
    submitButton: {
        backgroundColor: "#EE4B2B",
        borderRadius: 15,
        marginTop: 50,
        width: "20%",
        marginLeft: "40%",
    },
    submitText: {
        color: "white",
        padding: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30,
    },
    subtext: {
        color: "gray",
        marginTop: -20,
    },
    invis: {
        color: "white",
    },
    errorText: {
        color: "red",
        marginTop: -120,
        marginLeft: 5,
    },
});

export default DonatorForm;