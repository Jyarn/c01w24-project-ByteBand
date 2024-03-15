import { Client } from "../prismic.js";
import * as prismic from '@prismicio/client'
import { WebView } from "react-native-webview";
import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";

class NewsArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "<h1>Loading...</h1>",
    }
  }

  componentDidMount() {
    try {
      Client.getByUID("news_article", this.props.uid).then((doc) => {
        this.setState({
          text: prismic.asHTML(doc.data.maintext),
          title: prismic.asHTML(doc.data.articleheading),
        })
      });

    } catch (err) {
      throw err;
    }
  }

  render() {
    console.log(this.state.text);
    let htmlacc = `<div>${this.state.title}</div>`;
    htmlacc = `${htmlacc}<div>${this.state.text}</div>`;

    return (
        <WebView
          source={{html: htmlacc}}
          scalesPageToFit={false}
        />
    );
  }
}

export default NewsArticle;
