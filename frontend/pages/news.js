import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// this is a placeholder and can be replaced with prismic

const fetchNewsUpdates = async () => {
 
  return [
    {
      id: "1",
      headline: "News Item 1",
      summary: "Summary of news item 1...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 1...",
    },
    {
      id: "2",
      headline: "News Item 2",
      summary: "Summary of news item 2...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 2...",
    },

    {
      id: "3",
      headline: "News Item 3",
      summary: "Summary of news item 3...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 3...",
    },
    {
      id: "4",
      headline: "News Item 4",
      summary: "Summary of news item 4...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 4...",
    },
    {
      id: "5",
      headline: "News Item 5",
      summary: "Summary of news item 5...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 5...",
    },

    {
      id: "6",
      headline: "News Item 6",
      summary: "Summary of news item 6...",
      timestamp: "2024-03-15T12:00:00Z",
      content: "Full content of news item 6...",
    },
    // Add more news items here...
  ];
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

  useEffect(() => {
    const getNews = async () => {
      const newsData = await fetchNewsUpdates();
      setNewsUpdates(newsData);
    };
    getNews();
  }, []);

  const handlePress = (news) => {
    
    alert(news.content); // Replace with  navigation logic 
  };

  const renderItem = ({ item }) => (
    <NewsCard news={item} onPress={() => handlePress(item)} />
  );

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
});

export default News;
