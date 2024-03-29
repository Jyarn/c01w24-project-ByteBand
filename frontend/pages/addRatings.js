import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { SERVER_URL } from '../constants/constants';

const AddRatings = ({ setRatingsCallback, washroomId }) => {
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/postRating/${washroomId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: rating, feedback: feedback }),
      });
      if (!response.ok) {
        console.log("Server failed:", response.status);
      } else {
        setRating(null);
        setFeedback('');
        const doc = await response.json();
        setSubmitMessage(doc.message);
        setRatingsCallback(doc.ratings);
        console.log(doc.ratings);
      }
    } catch (error) {
        console.error('Error submitting rating:', error);
        setSubmitMessage('Failed to submit rating.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.heading}>{rating ? `${rating}` : 'Tap to rate'}</Text> */}
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => setRating(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                  name={rating >= option ? 'star' : 'star-border'}
                  size={32}
                  style={rating >= option ? styles.starSelected : styles.starUnselected}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TextInput
            style={styles.input}
            placeholder='Leave us a feedback!'
            value = {feedback}
            onChangeText={setFeedback}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        {submitMessage !== '' && (
            <Text style={styles.submitMessage}>
            {submitMessage}
            </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginHorizontal: -2,
  },
  starUnselected: {
    color: '#aaa',
    margin: 2,
  },
  starSelected: {
    color: '#FF0000',
    margin: 2,
  },
  input: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '60%',
    alignSelf: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitMessage: {
    marginTop: 20,
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
});


export default AddRatings;
