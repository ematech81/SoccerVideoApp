
import React, { useState } from 'react'
import { VideoHighlit } from '../Database/VideoHighlit'
import { View, FlatList, Dimensions, StyleSheet, Text } from "react-native";
import { WebView } from "react-native-webview";


const Highlight = () => {
  const [videoMatches, setVideoMatches] = useState(VideoHighlit.videos);
  const { width } = Dimensions.get("window");
  

  // Render each item (match video) using WebView
  const renderMatchVideo = ({ item }) => (
    <View style={[styles.videoContainer, { width }]}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: item.embed }}
        style={{ height: 300 }} // Adjust height as needed
      />
    </View>
  );

  return (
    <View>
      <FlatList
      horizontal
        data={videoMatches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMatchVideo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    marginBottom: 20,
    marginTop: 20
  },
});

export default Highlight





