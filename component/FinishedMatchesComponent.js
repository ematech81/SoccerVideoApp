
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity,  } from "react-native";
import { LiveScore } from "../Database/LiveScore";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFavorites } from "../matchContext";


const groupFinishedMatchesByLeague = () => {


  const leagueData = {};
  const allScores = LiveScore.response;

  allScores.forEach((match) => {
    const leagueName = match.league.name;

    if (!leagueData[leagueName]) {
      leagueData[leagueName] = {
        league: {
          name: match.league.name,
          country: match.league.country,
          logo: match.league.logo,
          round: match.league.round,
          date: match.fixture.date,
        },
        matches: [],
      };
    }

    // Check if the match is finished
    if (match.fixture.status.short === "FT") {
      leagueData[leagueName].matches.push({
        fixtureId: match.fixture.id,
        timestamp: match.fixture.timestamp,
        venue: {
          name: match.fixture.venue.name,
          city: match.fixture.venue.city,
        },
        status: match.fixture.status.short,
        elapsedTime: match.fixture.status.elapsed,
        homeTeam: {
          id: match.teams.home.id,
          name: match.teams.home.name,
          logo: match.teams.home.logo,
          goals: match.goals.home,
          winner: match.teams.home.winner,
        },
        awayTeam: {
          id: match.teams.away.id,
          name: match.teams.away.name,
          logo: match.teams.away.logo,
          goals: match.goals.away,
          winner: match.teams.away.winner,
        },
        halftime: {
          home: match.score.halftime.home,
          away: match.score.halftime.away,
          fulltime: match.score.fulltime,
          extratime: match.score.extratime,
          penalty: match.score.penalty,
        },
      });
    }
  });

  // Return only leagues with at least one finished match
  return Object.values(leagueData).filter(
    (league) => league.matches.length > 0
  );
};

const FinishedMatchesComponent = () => {
    const [active, setActive] = useState(null);
  const { favorites, toggleFavorite } = useFavorites(); // For managing favorites
  const leagues = groupFinishedMatchesByLeague();

  const navigation = useNavigation();

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to convert timestamp to a readable time format
  const formattedTime = (timestamp) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour format, set to false for 24-hour format
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={leagues}
        keyExtractor={(item) => item.league.name}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            {/* League Header */}
            <View style={styles.leagueHeader}>
              <View style={styles.leagueInfo}>
                <Image
                  source={{ uri: item.league.logo }}
                  style={styles.leagueLogo}
                />
                <View>
                  <Text style={styles.leagueName}>{item.league.name}</Text>
                  <Text style={styles.countryName}>{item.league.country}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.roundText}>{item.league.round}</Text>
                <Text style={styles.dateText}>
                  {formattedDate(item.league.date)}
                </Text>
              </View>
            </View>

            {/* Matches */}
            {item.matches.map((match, index) => (
              <TouchableOpacity
                style={styles.matchContainer}
                key={index}
                onPress={() =>
                  navigation.navigate("MatchDetailsScreen", { stats: match })
                }
              >
                <View style={styles.teamsContainer}>
                  {/* Home Team */}
                  <View style={styles.teamWrapperHome}>
                    <Image
                      source={{ uri: match.homeTeam.logo }}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>{match.homeTeam.name}</Text>
                  </View>

                  {/* Match Info */}
                  <View style={styles.matchInfo}>
                    {match.status === "NS" ? (
                      <Text style={styles.matchTime}>
                        {formattedTime(match.timestamp)}
                      </Text>
                    ) : match.status === "1H" ||
                      match.status === "2H" ||
                      match.status === "HT" ? (
                      <View style={styles.liveContainer}>
                        <Text style={styles.elapsed}>{match.elapsedTime}'</Text>
                        <Text style={styles.matchScore}>
                          {match.homeTeam.goals} : {match.awayTeam.goals}
                        </Text>
                      </View>
                    ) : (
                      <Text style={styles.matchScore}>
                        {match.homeTeam.goals} : {match.awayTeam.goals}
                      </Text>
                    )}
                    <Text
                      style={[
                        styles.matchStatus,
                        match.status === "FT"
                          ? styles.finished
                          : match.status === "NS"
                          ? styles.notStarted
                          : styles.live,
                      ]}
                    >
                      {match.status}
                    </Text>
                  </View>

                  {/* Away Team */}
                  <View style={styles.teamWrapperAway}>
                    <Image
                      source={{ uri: match.awayTeam.logo }}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>{match.awayTeam.name}</Text>
                  </View>
                </View>

                {/* Favorite Button */}
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(match)}
                >
                  <MaterialIcons
                    name={
                      favorites.some((fav) => fav.fixtureId === match.fixtureId)
                        ? "favorite"
                        : "favorite-border"
                    }
                    size={20}
                    color={
                      favorites.some((fav) => fav.fixtureId === match.fixtureId)
                        ? "red"
                        : "#666"
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  matchCard: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leagueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  leagueInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  leagueLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  leagueName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  countryName: {
    fontSize: 12,
    color: "#ddd",
  },
  roundText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "right",
  },
  dateText: {
    fontSize: 12,
    color: "#ccc",
  },
  matchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  teamWrapperHome: {
    alignItems: "flex-end",
    justifyContent: "center",
    width: "42%",
    paddingRight: 10,
  },
  teamWrapperAway: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "42%",
    paddingLeft: 10,
  },
  teamLogo: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  teamName: {
    fontSize: 14,
    color: "#333",
  },
  matchInfo: {
    alignItems: "center",
    width: "16%",
    justifyContent: "center",
  },
  matchTime: {
    fontSize: 12,
    color: "#666",
  },
  matchScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  matchStatus: {
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginTop: 4,
  },
  finished: {
    color: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  live: {
    color: "#f44336",
    backgroundColor: "#ffebee",
  },
  notStarted: {
    color: "#666",
    backgroundColor: "#eee",
  },
  favoriteButton: {
    padding: 8,
  },
  elapsed: {
    textAlign: "center",
    color: "#f44336",
    fontSize: 12,
    fontWeight: "bold",
  },
  liveContainer: {
    alignItems: "center",

    justifyContent: "center",
  },
});





//   return (
//     <View style={styles.container}>
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         data={leagues}
//         keyExtractor={(item) => item.league.name}
//         renderItem={({ item }) => (
//           <View style={styles.matchCard}>
//             <View style={styles.leagueContainer}>
//               <View style={{ flexDirection: "row", alignSelf: "flex-start" }}>
//                 <Image
//                   source={{ uri: item.league.logo }}
//                   style={styles.leagueLogo}
//                 />
//                 <Text style={styles.countryName}>
//                   {item.league.country} {" > "}
//                 </Text>
//                 <Text style={styles.leagueName}>{item.league.name}</Text>
//               </View>
//               <View style={styles.roundWrapper}>
//                 <Text style={styles.roundText}>{item.league.round}</Text>
//                 <Text style={styles.dateText}>
//                   {formattedDate(item.league.date)}
//                 </Text>
//               </View>
//             </View>
//             {/* matches */}
//             {item.matches.map((match, index) => (
//               <TouchableOpacity
//                 style={styles.matchContainer}
//                 key={index}
//                 onPress={() =>
//                   navigation.navigate("MatchDetailsScreen", { stats: match })
//                 }
//               >
//                 {/* team name and logo */}
//                 <View
//                   style={{
//                     justifyContent: "space-evenly",
//                     alignItems: "center",
//                     flexDirection: "row",
//                     padding: 6,
//                   }}
//                 >
//                   <View style={styles.teamContainer1}>
//                     <Text style={[styles.teamName, styles.homeTeamName]}>
//                       {match.homeTeam.name.length > 14
//                         ? match.homeTeam.name.slice(0, 10) + "..."
//                         : match.homeTeam.name}
//                     </Text>
//                     <Image
//                       source={{ uri: match.homeTeam.logo }}
//                       style={[styles.teamLogo]}
//                     />
//                   </View>
//                   <View style={styles.teamContainer2}>
//                     <Image
//                       source={{ uri: match.awayTeam.logo }}
//                       style={styles.teamLogo}
//                     />
//                     <Text style={styles.teamName}>
//                       {match.awayTeam.name.length > 14
//                         ? match.awayTeam.name.slice(0, 10) + "..."
//                         : match.awayTeam.name}
//                     </Text>
//                   </View>
//                 </View>

//                 <View
//                   style={{
//                     flexDirection: "row",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <View style={{}}>
//                     {/* status */}
//                     {match.status === "FT" ? (
//                       <Text style={[styles.status, styles.finished]}>
//                         {match.status}
//                       </Text>
//                     ) : match.status === "1H" ||
//                       match.status === "2H" ||
//                       match.status === "HT" ? (
//                       <Text style={[styles.status, styles.live]}>
//                         {match.status}'
//                       </Text>
//                     ) : match.status === "NS" ? (
//                       <Text style={[styles.status, styles.notStarted]}>
//                         {match.status}
//                       </Text>
//                     ) : (
//                       <Text style={[styles.status, styles.posCancel]}>
//                         {match.status}
//                       </Text>
//                     )}
//                   </View>

//                   {/* scores wrapper */}
//                   <View style={styles.scoreWrapper}>
//                     {match.status === "NS" ? (
//                       <View style={[styles.scoreContainer, styles.datePadding]}>
//                         <Text style={{ fontSize: 12, fontWeight: "500" }}>
//                           {formattedTime(match.timestamp)}
//                         </Text>
//                       </View>
//                     ) : match.status === "FT" ? (
//                       <View style={styles.scoreContainer}>
//                         <Text style={[styles.scoreText, styles.ftSore]}>
//                           {match.homeTeam.goals}
//                         </Text>

//                         <Text style={styles.separator}>:</Text>

//                         <Text style={[styles.scoreText, styles.ftSore]}>
//                           {match.awayTeam.goals}
//                         </Text>
//                       </View>
//                     ) : match.status === "1H" ||
//                       match.status === "2H" ||
//                       match.status === "HT" ||
//                       match.status === "CANC" ? (
//                       <View>
//                         <Text
//                           style={{
//                             textAlign: "center",
//                             color: "#f44336",
//                             fontSize: 12,
//                             padding: 3,
//                             fontWeight: "bold",
//                             marginRight: 30,
//                           }}
//                         >
//                           {match.elapsedTime}'
//                         </Text>
//                         <View style={styles.scoreContainer}>
//                           <Text style={[styles.scoreText, styles.liveColor]}>
//                             {match.homeTeam.goals}
//                           </Text>

//                           <Text style={styles.separator}>:</Text>

//                           <Text style={[styles.scoreText, styles.liveColor]}>
//                             {match.awayTeam.goals}
//                           </Text>
//                         </View>
//                       </View>
//                     ) : (
//                       <Text style={[styles.separator, styles.seperator2]}>
//                         :
//                       </Text>
//                     )}
//                   </View>
//                   <TouchableOpacity
//                     style={{ alignSelf: "flex-end" }}
//                     onPress={() => {}}
//                   >
//                     <MaterialIcons
//                       name="favorite-border"
//                       size={20}
//                       color="black"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: "#f2f2f2",
//   },
//   matchCard: {
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     borderRadius: 8,

//     // paddingHorizontal: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 4,
//   },
//   leagueContainer: {
//     marginBottom: 10,
//     backgroundColor: "#ddd",
//     padding: 3,
//     overflow: "hidden",
//   },
//   leagueLogo: {
//     width: 30,
//     height: 30,
//     marginRight: 5,
//   },
//   countryName: {
//     fontSize: 12,
//     color: "#666",
//     fontWeight: "600",
//   },
//   leagueName: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   roundWrapper: {
//     // marginLeft: "auto",
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexDirection: "row",
//   },
//   roundText: {
//     fontSize: 10,
//     color: "#000",
//   },
//   dateText: {
//     fontSize: 12,
//     color: "#aaa",
//     fontWeight: "900",
//   },
//   matchContainer: {
//     paddingVertical: 5,
//     paddingHorizontal: 5,
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },
//   teamContainer1: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "50%",
//     justifyContent: "flex-end",

//     paddingRight: 20,
//   },
//   teamContainer2: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "50%",
//     justifyContent: "flex-start",

//     paddingLeft: 20,
//   },
//   teamLogo: {
//     width: 25,
//     height: 25,
//     marginRight: 5,
//   },
//   teamName: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#333",
//   },
//   scoreContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#eee",
//     paddingHorizontal: 8,
//     borderRadius: 6,
//     width: 60,
//     marginRight: 30,
//   },
//   scoreWrapper: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   scoreText: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#333",
//   },
//   separator: {
//     fontSize: 14,
//     marginHorizontal: 4,
//   },
//   status: {
//     fontSize: 10,
//     fontWeight: "bold",
//     paddingVertical: 3,
//     paddingHorizontal: 6,
//     borderRadius: 5,
//     overflow: "hidden",
//   },
//   finished: {
//     color: "blue",
//     // backgroundColor: "#4caf50",
//     fontSize: 12,
//   },
//   live: {
//     color: "#fff",
//     backgroundColor: "#f44336",
//   },
//   notStarted: {
//     color: "#000",
//     backgroundColor: "#ccc",
//   },
//   liveColor: {
//     color: "red",
//   },
//   posCancel: {
//     color: "red",
//     fontWeight: "900",
//     fontSize: 10,
//   },
//   datePadding: {
//     paddingVertical: 5,
//   },
//   seperator2: {
//     marginRight: 30,
//     fontWeight: "900",
//   },
//   homeTeamName: {
//     marginRight: 3,
//   },
//   ftSore: {
//     color: "blue",
//     fontWeight: "800",
//   },
// });

export default FinishedMatchesComponent;



