import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from "react-native";

import * as prismic from '@prismicio/client'
import { Client } from "../prismic.js"; // Adjust this import to  Prismic configuration file's actual path
import NewsViewer from "../components/newsArticle"

// Function to fetch news updates from Prismic
const fetchNewsUpdatesFromPrismic = async () => {
  try {
    const res = await Client.getByType('summarypage');
    console.log(res);

    if (res) {
      return res.results.map((doc) => ({
        id: doc.id,
        headline: prismic.asText(doc.data.title),
        summary: prismic.asText(doc.data.summary),
        timestamp: doc.first_publication_date,
        uid: doc.data.article.uid,
      }));
    }
  } catch (error) {
    console.error("Error fetching news from Prismic:", error);
    return []; // Return an empty array as a fallback
  }
};


const NewsCard = ({ news, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.headline}>{news.headline}</Text>
    <Text style={styles.summary}>{news.summary}</Text>
    <Text style={styles.timestamp}>
      {new Date(news.timestamp).toLocaleString()}
    </Text>
  </TouchableOpacity>
);

const News = () => {
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNewsFromPrismic = async () => {
      const newsData = await fetchNewsUpdatesFromPrismic();
      setNewsUpdates(newsData);
      setLoading(false);
    };

    getNewsFromPrismic();
  }, []);

  const handlePress = (news) => {
    alert(news.content); // Replace with your navigation logic 
  };

  const renderItem = ({ item }) => (
    <NewsCard news={item} onPress={() => handlePress(item)} />
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <FlatList
      data={newsUpdates}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headline: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summary: {
    fontSize: 14,
    color: "gray",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
    marginTop: 10,
  },
  loader: {
    marginTop: 50,
  },
});

export default News;
