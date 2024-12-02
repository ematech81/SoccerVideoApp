import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import WebView from "react-native-webview"; // Change here
import { VideoHighlit } from "../Database/VideoHighlit";
import { useNavigation } from "@react-navigation/native";
// import { VideoHighlit } from "../db";





const { width } = Dimensions.get("window");

const VideoHighlights = () => {

    const [videoHighlit, setVideoHighlit] = useState(VideoHighlit.videos);

  // Function to handle watch video button click
  const handleWatchVideo = (embed) => {
    navigation.navigate("FullVideoScreen", { embed }); // Pass embed HTML as a param
  };

  const navigation = useNavigation(); 

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        // horizontal
        // pagingEnabled
        // showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {videoHighlit.length > 3 &&
          videoHighlit.slice(0, 4).map((videoItem, index) => (
            <View key={index} style={[styles.videoCard, { width }]}>
              {/* Video Title */}
              <Text style={styles.title}>{videoItem.title}</Text>

              {/* Highlight Video or Main Video */}
              <View style={styles.embedContainer}>
                {videoItem.videos.length > 3 ? (
                  videoItem.videos.slice(0, 2) && (
                    <WebView
                      source={{ html: videoItem.videos[0].embed }}
                      style={{ width: "100%", height: "100%" }}
                    />
                  )
                ) : (
                  <Image
                    source={{ uri: videoItem.thumbnail }}
                    style={styles.thumbnail}
                  />
                )}
              </View>

              {/* Competition */}
              <Text style={styles.competitionText}>
                {videoItem.competition.name}
              </Text>

              {/* Teams */}
              <View style={styles.teamsContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(videoItem.side1.url)}
                >
                  <Text style={styles.teamName}>{videoItem.side1.name}</Text>
                </TouchableOpacity>
                <Text style={styles.vs}>vs</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(videoItem.side2.url)}
                >
                  <Text style={styles.teamName}>{videoItem.side2.name}</Text>
                </TouchableOpacity>
              </View>

              {/* Watch Video Button */}
              <TouchableOpacity
                style={styles.watchButton}
                onPress={() => handleWatchVideo(videoItem.embed)} // Pass embed HTML
              >
                <Text style={styles.watchButtonText}>Watch Video</Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default VideoHighlights;




const styles = StyleSheet.create({
  container: {

  },
  videoCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    // marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  competitionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007BFF",
  },
  vs: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10
  },
  embedContainer: {
    marginTop: 10,
    height: 200,
  },
  watchButton: {
    marginTop: 10,
    paddingVertical: 7,
    backgroundColor: "#f88e03",
    borderRadius: 5,
    alignItems: "center",
  },
  watchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});