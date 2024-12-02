import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import React, { useState } from 'react'
import { VideoHighlit } from '../Database/VideoHighlit';
import WebView from "react-native-webview"; // Change here
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const MatchesScreen = ({navigation}) => {

  const [video, setVideo] = useState(VideoHighlit.videos)
  const [active, setActive] = useState(null);
  const [favorites, setFavorites] = useState([]);

  //  const navigation = useNavigation(); 

   const handleWatchVideo = (embed) => {
     navigation.navigate("FullVideoScreen", { embed }); // Pass embed HTML as a param
   };




  return (
    <SafeAreaView>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={video}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.videoCard]}>
              <View style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
                <Text style={styles.competitionText}>
                  {item.competition.name}
                </Text>
                <TouchableOpacity
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => {
                    
                  }}
                >
                  <MaterialIcons
                    name="favorite-border"
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.videoItem}>
                {/* Highlight Video or Main Video */}
                <View style={styles.embedContainer}>
                  {item.videos.length > 3 ? (
                    item.videos.slice(0, 2) && (
                      <WebView
                        source={{ html: item.videos[0].embed }}
                        style={{ width: "100%", height: "100%" }}
                      />
                    )
                  ) : (
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={styles.thumbnail}
                    />
                  )}
                </View>

                {/* Competition */}
                <View>{/* Teams */}</View>

                {/* Watch Video Button */}
                <TouchableOpacity
                  style={styles.watchButton}
                  onPress={() => handleWatchVideo(item.embed)} // Pass embed HTML
                >
                  <Text style={styles.watchButtonText}>Watch Video</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.teamsContainer}>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.side1.url)}
                >
                  <Text style={styles.teamName}>{item.side1.name}</Text>
                </TouchableOpacity>
                <Text style={styles.vs}>vs</Text>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.side2.url)}
                >
                  <Text style={styles.teamName}>{item.side2.name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default MatchesScreen


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  videoCard: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 4,
  },
  videoItem: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  thumbnail: {
    width: 200,
    height: 80,
    borderRadius: 8,
    marginBottom: 10,
    marginVertical: 5,
    overflow: 'hidden'
  },
  competitionText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 2,
    marginLeft: 7,
    fontWeight: 'bold'
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20
  },
  teamName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#007BFF",
  },
  vs: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 5,
  },
  embedContainer: {
    marginTop: 10,
    height: 80,
    width: 200,
    backgroundColor: "black",
    overflow: 'hidden'
  },
  watchButton: {
    // marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#f88e03",
    borderRadius: 5,
    alignItems: "center",
  },
  watchButtonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  favorite: {
    color: 'purple',
    fontWeight: 'bold',
  },
  normal: {
    color: 'black'
  }
});