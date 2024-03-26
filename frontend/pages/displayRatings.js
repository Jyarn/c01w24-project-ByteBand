import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SERVER_URL } from "../constants/constants";

const DisplayRatings = ({ washroomId }) => {
  const [ratings, setRatings] = useState([]);

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

  const calculateAverageRating = () => {
    if (ratings.length === 0) return "No ratings";
    const sum = ratings.reduce((acc, curr) => acc + Number(curr.rating), 0);
    const average = sum / ratings.length;
    return `${average.toFixed(1)}/5`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.averageRatingText}>Average Rating: {calculateAverageRating()}</Text>
      {ratings.map((rating, index) => (
        <View key={index} style={styles.rating}>
          <Text style={styles.ratingText}>Rating: {rating.rating} Stars</Text>
          <Text style={styles.feedbackText}>Feedback: {rating.feedback}</Text>
          <Text style={styles.feedbackText}>Date: {rating.date}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10, 
    margin: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rating: {
    backgroundColor: '#fff', 
    padding: 10, 
    borderRadius: 5, 
    borderWidth: 1, 
    borderColor: '#ddd',
    marginBottom: 10, 
  },
  averageRatingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  feedbackText: {   
    marginTop: 5, 
    fontSize: 14, 
    color: '#666',
    fontStyle: 'italic', 
  },
});

export default DisplayRatings;
