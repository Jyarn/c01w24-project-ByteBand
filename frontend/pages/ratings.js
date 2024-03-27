import React from 'react';
import DisplayRatings from './displayRatings';
import AddRatings from './addRatings';
import { View, ScrollView } from 'react-native';

const Ratings = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1 }}>
                <AddRatings washroomId="66038e852abfe3207ba688a5"/>
                <DisplayRatings washroomId="66038e852abfe3207ba688a5"/>
            </View>
        </ScrollView>
    );
};

export default Ratings;
