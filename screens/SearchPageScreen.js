import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import SearchBar from "../Custom/SearchBar";
import { leagueByCountry } from "../Database/country";


const SearchPageScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchLeagues = async (query) => {
    setSearchQuery(query);

    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    const results = leagueByCountry.response.filter((item) => {
      const leagueName = item.league.name.toLowerCase();
      const countryName = item.country.name.toLowerCase();
      const leagueLogo = item.league.logo;
      console.log(results)

      return (
        leagueName.includes(query.toLowerCase()) ||
        countryName.includes(query.toLowerCase()) ||
        leagueLogo.includes(query)
      );
    });

    setSearchResults(results);

    //     const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?search=${query}`;
    //     const options = {
    //       method: "GET",
    //       headers: {
    //         "x-rapidapi-key": "a8fbcfa433msh7bbb4f7c2509480p186f56jsna70182c698bf",
    //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    //       },
    //     };

    //     try {
    //       const response = await fetch(url, options);
    //       const data = await response.json();
    //       setSearchResults(data.response);
    //     } catch (error) {
    //       console.error("Error fetching leagues:", error);
    //     }
    //   };

    // const fetchMatchesByLeague = async (leagueId) => {
    //   const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueId}&season=2024`;
    //   try {
    //     const response = await fetch(url, options);
    //     const data = await response.json();
    //     // Process and display the matches
    //     setMatches(data.response);
    //   } catch (error) {
    //     console.error("Error fetching matches:", error);
    // }
  };

  return (
    <SafeAreaView>
      <View style={{ padding: 1, marginTop: 40 }}>
        <SearchBar
          placeholder="Search leagues..."
          // style={styles.searchInput}
          value={searchQuery}
          onChangeText={searchLeagues}
        />
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.league.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => fetchMatchesByLeague(item.league.id)}
              // style={styles.searchResult}
            >
              <View
                style={{
                  borderRadius: 10,
                  marginVertical: 7,
                  padding: 16,
                  border: 2,
                  backgroundColor: "#1812",
                  marginHorizontal: 5,
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <Image
                    source={{ uri: item.league.logo }}
                    style={{ width: 35, height: 35 }}
                  />
                  <Text style={{ padding: 5, fontWeight:'bold',lineHeight:25 }}>
                    {item.league.name} ({item.league.type})
                  </Text>
                </View>
                <Text>{item.country.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchPageScreen