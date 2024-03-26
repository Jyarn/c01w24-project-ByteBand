import React from 'react';
import DisplayRatings from './displayRatings';
import AddRatings from './addRatings';
import { View } from 'react-native';

const Ratings = ({ navigation }) => {
    return (
        <View>
            <DisplayRatings washroomId="660257370f2aac98ca9ea591"/>
            {/* <AddRatings washroomId="66023e88a4f820767f43a8db"/> */}
        </View>
    );
};

export default Ratings;