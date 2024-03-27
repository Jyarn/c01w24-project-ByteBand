import React from 'react';
import DisplayRatings from './displayRatings';
import AddRatings from './addRatings';
import { View, ScrollView } from 'react-native';

const Ratings = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <AddRatings washroomId="66039f018e73a18092a25b24"/>
                <DisplayRatings washroomId="66039f018e73a18092a25b24"/>
            </View>
        </ScrollView>
    );
};

export default Ratings;
