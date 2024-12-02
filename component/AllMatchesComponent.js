




import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from "react-native";
import { LiveScore } from "../Database/LiveScore";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFavorites } from "../matchContext";





const groupMatchesByLeague = () => {
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

    // Adding all relevant data to each match object
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
  });

  return Object.values(leagueData);
};






const AllMatchesComponent = () => {
  const [active, setActive] = useState(null);
  const leagues = groupMatchesByLeague(); // Assumes this groups matches by league
  const { favorites, toggleFavorite } = useFavorites(); // For managing favorites
  const navigation = useNavigation();

  const formattedDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formattedTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

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
                    size={22}
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
  
    justifyContent:"center"
  },
});

export default AllMatchesComponent;