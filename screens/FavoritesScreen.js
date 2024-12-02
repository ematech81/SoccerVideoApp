
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useFavorites } from "../matchContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const FavoritesScreen = ({ navigation }) => {
  const { favorites, toggleFavorite, setFavorites } = useFavorites();
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // Function to remove a specific match from favorites
  const removeMatch = () => {
    toggleFavorite(selectedMatch);
    setMenuVisible(false);
  };

  // Function to clear all favorites
  const clearAllFavorites = () => {
    setFavorites([]);
    setMenuVisible(false);
  };

  // Function to enable notifications for a match
  const enableNotification = () => {
    console.log(`Notifications enabled for: ${selectedMatch.fixtureId}`);
    setMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            All your favorites matches will appear here
          </Text>
          <View style={styles.addMatches}>
            <Text style={styles.addMatchesText}>Add Matches</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LiveScoresScreen")}
              style={styles.addButton}
            >
              <FontAwesome6 name="add" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favorites}
          keyExtractor={(item) => item.fixtureId}
          renderItem={({ item }) => (
            <View style={styles.matchCard}>
              <TouchableOpacity
                style={styles.matchContainer}
                onPress={() =>
                  navigation.navigate("MatchDetailsScreen", { stats: item })
                }
              >
                <View style={styles.teamsContainer}>
                  {/* Home Team */}
                  <View style={styles.teamWrapperHome}>
                    <Image
                      source={{ uri: item.homeTeam.logo }}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>{item.homeTeam.name}</Text>
                  </View>

                  {/* Match Info */}
                  <View style={styles.matchInfo}>
                    {item.status === "NS" ? (
                      <Text style={styles.matchTime}>
                        {formattedTime(item.timestamp)}
                      </Text>
                    ) : item.status === "1H" ||
                      item.status === "2H" ||
                      item.status === "HT" ? (
                      <View style={styles.liveContainer}>
                        <Text style={styles.elapsed}>{item.elapsedTime}'</Text>
                        <Text style={styles.matchScore}>
                          {item.homeTeam.goals} : {item.awayTeam.goals}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.matchScore}>
                        {item.homeTeam.goals} : {item.awayTeam.goals}
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.matchStatus,
                        item.status === "FT"
                          ? styles.finished
                          : item.status === "NS"
                          ? styles.notStarted
                          : styles.live,
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>

                  {/* Away Team */}
                  <View style={styles.teamWrapperAway}>
                    <Image
                      source={{ uri: item.awayTeam.logo }}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>{item.awayTeam.name}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedMatch(item);
                    setMenuVisible(true);
                  }}
                >
                  <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Modal for Options */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Options</Text>
            <TouchableOpacity onPress={removeMatch} style={styles.modalOption}>
              <Text>Remove</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={clearAllFavorites}
              style={styles.modalOption}
            >
              <Text>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={enableNotification}
              style={styles.modalOption}
            >
              <Text>Enable Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={styles.modalCancel}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  emptyText: { fontSize: 16, textAlign: "center", opacity: 0.2 },
  addMatches: { marginTop: 20, alignItems: "center" },
  addMatchesText: { fontSize: 20, textAlign: "center", opacity: 0.2 },
  addButton: { marginTop: 20, opacity: 0.6 },
  matchCard: { margin: 10, backgroundColor: "#f0f0f0", borderRadius: 10 },
  matchContainer: { flexDirection: "row", justifyContent: "space-between" },
  teamsContainer: { flexDirection: "row", justifyContent: "space-between" },
  teamWrapperHome: { alignItems: "center" },
  teamLogo: { width: 40, height: 40 },
  teamName: { fontSize: 14 },
  matchInfo: { alignItems: "center" },
  matchTime: { fontSize: 12 },
  liveContainer: { flexDirection: "row", alignItems: "center" },
  elapsed: { color: "red" },
  matchScore: { fontSize: 16 },
  matchStatus: { fontSize: 12 },
  finished: { color: "green" },
  notStarted: { color: "blue" },
  live: { color: "red" },
  teamWrapperAway: { alignItems: "center" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalOption: { padding: 10 },
  modalCancel: { marginTop: 20, padding: 10, color: "red" },
});










// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
// import React from 'react'
// import { useFavorites } from '../matchContext';
// import { FlatList } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
// import Entypo from "@expo/vector-icons/Entypo";



// const FavoritesScreen = ({ route, navigation }) => {
//   const { favorites } = useFavorites();
//   console.log(favorites)
 

//   const formattedDate = (date) =>
//     new Date(date).toLocaleDateString("en-US", {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });

//   const formattedTime = (timestamp) =>
//     new Date(timestamp * 1000).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: false,
//     });

//   return (
//     <View style={styles.container}>
//       {favorites.length === 0 ? (
//         <View
//           style={{
//             flex: 1,
//             alignItems: "center",
//             justifyContent: "center",
//             padding: 16,
//           }}
//         >
//           <Text style={{ fontSize: 16, textAlign: "center", opacity: 0.2 }}>
//             All your favorites matches will appear here
//           </Text>
//           <View style={styles.addMatches}>
//             <Text style={{ fontSize: 20, textAlign: "center", opacity: 0.2 }}>
//               Add Matches
//             </Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate("LiveScoresScreen")}
//               style={{ marginTop: 20, opacity: 0.6 }}
//             >
//               <FontAwesome6 name="add" size={30} color="black" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       ) : (
//         <FlatList
//           showsVerticalScrollIndicator={false}
//           data={favorites}
//           keyExtractor={(item) => item.fixtureId}
//           renderItem={({ item }) => (
//             <View style={styles.matchCard}>
//               <TouchableOpacity
//                 style={styles.matchContainer}
//                 onPress={() =>
//                   navigation.navigate("MatchDetailsScreen", { stats: item })
//                 }
//               >
//                 <View style={styles.teamsContainer}>
//                   {/* Home Team */}
//                   <View style={styles.teamWrapperHome}>
//                     <Image
//                       source={{ uri: item.homeTeam.logo }}
//                       style={styles.teamLogo}
//                     />
//                     <Text style={styles.teamName}>{item.homeTeam.name}</Text>
//                   </View>

//                   {/* Match Info */}
//                   <View style={styles.matchInfo}>
//                     {item.status === "NS" ? (
//                       <Text style={styles.matchTime}>
//                         {formattedTime(item.timestamp)}
//                       </Text>
//                     ) : item.status === "1H" ||
//                       item.status === "2H" ||
//                       item.status === "HT" ? (
//                       <View style={styles.liveContainer}>
//                         <Text style={styles.elapsed}>{item.elapsedTime}'</Text>
//                         <Text style={styles.matchScore}>
//                           {item.homeTeam.goals} : {item.awayTeam.goals}
//                         </Text>
//                       </View>
//                     ) : (
//                       <Text style={styles.matchScore}>
//                         {item.homeTeam.goals} : {item.awayTeam.goals}
//                       </Text>
//                     )}
//                     <Text
//                       style={[
//                         styles.matchStatus,
//                         item.status === "FT"
//                           ? styles.finished
//                           : item.status === "NS"
//                           ? styles.notStarted
//                           : styles.live,
//                       ]}
//                     >
//                       {item.status}
//                     </Text>
//                   </View>

//                   {/* Away Team */}
//                   <View style={styles.teamWrapperAway}>
//                     <Image
//                       source={{ uri: item.awayTeam.logo }}
//                       style={styles.teamLogo}
//                     />
//                     <Text style={styles.teamName}>{item.awayTeam.name}</Text>
//                   </View>
//                 </View>
//                 <TouchableOpacity>
//                   <Entypo name="dots-three-vertical" size={20} color="black" />
//                 </TouchableOpacity>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f9f9f9",
//   },
//   matchCard: {
//     marginVertical: 12,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },

//   matchContainer: {
//     paddingVertical: 10,
//     paddingHorizontal:5,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   teamsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flex: 1,
//   },
//   teamWrapperHome: {
//     alignItems: "flex-end",
//     justifyContent: "center",
//     width: "42%",
//     paddingRight: 10,
//   },
//   teamWrapperAway: {
//     alignItems: "flex-start",
//     justifyContent: "center",
//     width: "42%",
//     paddingLeft: 10,
//   },
//   teamLogo: {
//     width: 24,
//     height: 24,
//     marginHorizontal: 6,
//   },
//   teamName: {
//     fontSize: 14,
//     color: "#333",
//   },
//   matchInfo: {
//     alignItems: "center",
//     width: "16%",
//     justifyContent: "center",
//   },
//   matchTime: {
//     fontSize: 12,
//     color: "#666",
//   },
//   matchScore: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   matchStatus: {
//     fontSize: 12,
//     fontWeight: "bold",
//     borderRadius: 4,
//     paddingVertical: 2,
//     paddingHorizontal: 6,
//     marginTop: 4,
//   },
//   finished: {
//     color: "#4caf50",
//     backgroundColor: "#e8f5e9",
//   },
//   live: {
//     color: "#f44336",
//     backgroundColor: "#ffebee",
//   },
//   notStarted: {
//     color: "#666",
//     backgroundColor: "#eee",
//   },
//   favoriteButton: {
//     padding: 8,
//   },
//   elapsed: {
//     textAlign: "center",
//     color: "#f44336",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
//   liveContainer: {
//     alignItems: "center",

//     justifyContent: "center",
//   },
//   addMatches: {
//     marginTop: 30,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default FavoritesScreen