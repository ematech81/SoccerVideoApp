
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiveMatchesComponent from '../component/LiveMatchesComponent';
import AllMatchesComponent from '../component/AllMatchesComponent';
import FinishedMatchesComponent from '../component/FinishedMatchesComponent';
import { Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import RNPickerSelect from "react-native-picker-select";
import { leagueByCountry } from "../Database/country";
import AntDesign from "@expo/vector-icons/AntDesign";
import CustomDropdown from "../Custom/dropdown";




const LiveScoresScreen = ({ navigation }) => {
  const [live, setLive] = useState(false);
  const [all, setAll] = useState(true); // "all" is active by default
  const [finished, setFinished] = useState(false);
  const [activeState, setActiveState] = useState("All"); // Default to "live"
  const [majorLeagues, setMajorLeagues] = useState(leagueByCountry.response);
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "a8fbcfa433msh7bbb4f7c2509480p186f56jsna70182c698bf",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  const handleSelect = (value) => {
    setSelectedLeague(value); // Update the selected value
    setIsVisible(false); // Close the dropdown
  };

  const margin = Platform.OS === "ios" ? 3 : "";

  return (
    <SafeAreaView style={{ flex: 1, marginTop: margin }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          marginTop: 40,
        }}
      >
        <Text style={styles.title}>Live Scores</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            width: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchPageScreen")}
          >
            <Feather name="search" size={24} color="#000" strokeWidth="20" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Fontisto name="date" size={24} color="#000" strokeWidth="20" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Header Content */}
      <View style={styles.header}>
        {/* Dropdown */}
        <View>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>
              {selectedLeague
                ? selectedLeague.length > 10
                  ? `${selectedLeague.slice(0, 7)}...`
                  : selectedLeague
                : "League"}
            </Text>
            <AntDesign name="caretdown" size={14} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            setLive(true);
            setActiveState("live");
            setAll(false);
            setFinished(false);
          }}
        >
          <Text
            style={[
              styles.matches,
              activeState === "live" ? styles.Live : styles.normal,
            ]}
          >
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            setLive(false);
            setAll(true);
            setActiveState("All");
            setFinished(false);
          }}
        >
          <Text
            style={[
              styles.matches,
              activeState === "All" ? styles.selected : null,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            setLive(false);
            setAll(false);
            setFinished(true);
            setActiveState("finish");
          }}
        >
          <Text
            style={[
              styles.matches,
              activeState === "finish" ? styles.selected : styles.normal,
            ]}
          >
            Finished
          </Text>
        </TouchableOpacity>
      </View>

      {/* Body Content */}
      {live && <LiveMatchesComponent />}
      {all && <AllMatchesComponent />}
      {finished && <FinishedMatchesComponent />}

      {/* Dropdown */}
      {isVisible && (
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView
              style={{ maxHeight: 500 }} // Set a maximum height for scrolling
              contentContainerStyle={{ flexGrow: 1 }}
            >
              {majorLeagues.length > 12 &&
                majorLeagues.slice(0, 10).map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelect(item.league.name)}
                  >
                    <Text style={styles.dropdownItemText}>
                      {item.league.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default LiveScoresScreen;


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#181727",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    paddingVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  matches: {
    color: "#ccc",
    fontWeight: "bold",
  },
  matches1: {
    color: "#f88e03",
    fontWeight: "bold",
  },
  touchable: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  Live: {
    color: "#ff0f50",
    fontWeight: "bold",
    borderBottomWidth: 2,
   
  },
  selected: {
    color: "#000",
    fontWeight: "bold",
    backgroundColor: "#f88e03",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  normal: {
    color: "#ccc",
  },
  dropdownButton: {
    // padding: 10,
    flexDirection: "row",
    // backgroundColor: "#f88e03",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 110,
    overflow: "hidden",
  },
  dropdownButtonText: {
    fontSize: 15,
    color: "#ccc",
    fontWeight: 'bold'
  },
  modalOverlay: {
    backgroundColor: "#fff",
    position: "absolute",
    top: "21%",
    zIndex: 10,
    left: "5%",
    width: "60%",
    elevation: 5,
  },
  dropdownContainer: {
    padding: 10,
  },
  leagueListWrapper: {},
  dropdownItem: {
    paddingHorizontal: 10,
  },
  dropdownItemText: {
    color: "blue",
    paddingVertical: 8,
    fontWeight: "600",
    lineHeight: 27,
    fontSize: 16,
    opacity: 0.6
  },
  dropdownItem: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
  },
});



  
//    const fetchMajorLeagues = async () => {
//      const leagues = [39, 78, 140]; // IDs for Premier League, Bundesliga, Serie A, etc.
//      const fetchedLeagues = [];

//      for (const id of leagues) {
//        const url = `https://api-football-v1.p.rapidapi.com/v3/leagues?id=${id}`;
//        try {
//          const response = await fetch(url, options);
//          const data = await response.json();
//          fetchedLeagues.push(data.response[0]);
//        } catch (error) {
//          console.error(`Error fetching league ${id}:`, error);
//        }
//      }

//      setMajorLeagues(fetchedLeagues);
//    };


// useEffect(() => {
//   // fetchMajorLeagues();
// }, []);


