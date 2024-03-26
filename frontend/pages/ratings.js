import React from 'react';
import DisplayRatings from './displayRatings';
import AddRatings from './addRatings';
import { View, ScrollView } from 'react-native';

const Ratings = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <AddRatings washroomId="6603226fbfcadd5d3e3356b3"/>
                <DisplayRatings washroomId="6603226fbfcadd5d3e3356b3"/>
            </View>
        </ScrollView>
    );
};

export default Ratings;
