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

const SERVER_URL = "http://localhost:4000";

const AddRatings = ({ washroomId }) => {
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
        setSubmitMessage("Rating and feedback added successfully!");
        // Optionally reset the form here
        setRating(null);
        setFeedback('');
      }
    } catch (error) {
        console.error('Error submitting rating:', error);
        setSubmitMessage('Failed to submit rating.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{rating ? `${rating}` : 'Tap to rate'}</Text>
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
    backgroundColor: '#fff',
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
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#FF0000',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FF0000', // Example button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitMessage: {
    marginTop: 20,
    color: 'green', // Or change based on success or error
    fontSize: 16,
  },
});

export default AddRatings;