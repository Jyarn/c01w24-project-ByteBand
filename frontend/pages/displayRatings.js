import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DisplayRatings = ({ washroomId }) => {
  const [ratings, setRatings] = useState([]);

  const SERVER_URL = "http://localhost:4000";

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/getRating/${washroomId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch ratings');
        }
        const data = await response.json();
        setRatings(data.ratings);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRatings();
  }, [washroomId]);

  return (
    <View style={styles.container}>
    {ratings.map((rating, index) => (
        <View key={index} style={styles.rating}>
        {/* <Text style={styles.ratingText}>Rating: {rating.rating} Stars</Text> */}
        <Text style={styles.feedbackText}>Feedback: {rating.feedback}</Text>
        </View>
    ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20, // Add padding around the entire container
    backgroundColor: '#f0f0f0', // Light grey background for the container
    borderRadius: 10, // Rounded corners for the container
    margin: 10, // Margin around the container
    shadowColor: '#000', // Shadow for container
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android (shadow equivalent)
  },
  rating: {
    backgroundColor: '#fff', // White background for each rating
    padding: 10, // Padding inside each rating
    borderRadius: 5, // Rounded corners for each rating
    borderWidth: 1, // Border for each rating
    borderColor: '#ddd', // Light grey border
    marginBottom: 10, // Space between each rating
  },
  ratingText: {
    fontSize: 16, // Font size for the text
    color: '#333', // Dark grey color for text for better readability
  },
  feedbackText: {   
    marginTop: 5, // Margin top for feedback text to separate it from the rating
    fontSize: 14, // Slightly smaller font size for feedback
    color: '#666', // Lighter text color for feedback
    fontStyle: 'italic', // Italicize feedback to differentiate from rating
  },
});
  
export default DisplayRatings;
