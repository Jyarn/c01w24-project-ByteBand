import { Client } from "../prismic.js";
import * as prismic from '@prismicio/client'
import { StyleSheet, ScrollView, View, Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";
import RenderHtml from 'react-native-render-html';

const NewsArticle = ({ uid }) => {
  const [source, setSource] = useState("<h1>Loading...</h1>");
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        Client.getByUID("news_article", uid).then((doc) => {
          const temp = `<div>${prismic.asHTML(doc.data.articleheading)}</div>
            <div>${prismic.asHTML(doc.data.maintext)}</div>
            <p>----</p>`;
          setSource(temp);
        });
      } catch(err) {
        console.log(err);
        throw err;
      }
    };

    fetchArticle();
  }, []);

  return (
    <RenderHtml
    contentWidth={width}
    source={{html: source}}
    />
  );
}

export default NewsArticle;
