import React from 'react';
import DisplayRatings from './displayRatings';
import AddRatings from './addRatings';
import { View } from 'react-native';

const Ratings = ({ navigation }) => {
    return (
        <View>
            <DisplayRatings washroomId="65f9e3b27d8146a5049b2f77"/>
            <AddRatings washroomId="65f9e3b27d8146a5049b2f77"/>
        </View>
    );
};

export default Ratings;