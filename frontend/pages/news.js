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
    //console.log(res);

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
  const [uid, setuid] = useState(null);

  useEffect(() => {
    const getNewsFromPrismic = async () => {
      const newsData = await fetchNewsUpdatesFromPrismic();
      setNewsUpdates(newsData);
      setLoading(false);
    };

    getNewsFromPrismic();
  }, []);

  const handlePress = (news) => {
    setuid(news.uid);
  };

  const renderItem = ({ item }) => (
    <NewsCard news={item} onPress={() => handlePress(item)} />
  );

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    uid === null ?
    <FlatList
      data={newsUpdates}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.container}
    />
    :
    <View style={styles.container}>
      <TouchableOpacity
        style={newsStyles.goBackButton}
        onPress={() => setuid(null)}>
        <Text style={newsStyles.goBackText}>Go Back</Text>
      </TouchableOpacity>
      <ScrollView style={newsStyles.newscontainer}>
        <NewsViewer uid={uid}/>
      </ScrollView>
    </View>
  );
};

const newsStyles = StyleSheet.create({
  newscontainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    paddingTop: 4,
    marginTop: 5,
    marginBottom: 8,
    marginHorizontal: 8,
  },
  goBackButton: {
    marginTop: 8,
    marginLeft: 15,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 5,
    width: 80,
  },
  goBackText: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
