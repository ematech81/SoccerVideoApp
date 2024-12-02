
import { View, Text, Dimensions, SafeAreaView, StatusBar, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Platform } from "react-native";
import Event from "../component-2/Event";
import ScoreEvent from "../component-2/Event";
import Statistics from "../component-2/Statistics";
import Standing from "../component-2/Standing";
import LineUp from "../component-2/LineUp";
import Head2Head from "../component-2/Head2Head";
  import BackArrow from "../Custom/BackArrow";

const MatchDetailsScreen = ({navigation}) => {

  const [activeState, setActiveState] = useState('stand');
  const [event, setEvent] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [standing, setStanding] = useState(true);
  const [lineUp, setLineUp] = useState(false);
  const [head2Head, setHead2Head] = useState(false);



  const { params } = useRoute();
  const { stats } = params;

  // console.log(stats);

  var { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#313540" }}>
      <View
        style={{
          height: height * 0.39,
          backgroundColor: "#0d2331",
        }}
      >
        <BackArrow  onPress={() =>navigation.goBack()}/>
        <View style={{  marginBottom: 20 }}>
          <Text
            style={{ color: "#ccc", fontWeight: "bold", textAlign: "center" }}
          >
            Premier Leauge {"|"} <Text>Round 22</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            source={{ uri: stats.homeTeam.logo }}
            style={{ width: 60, height: 60 }}
          />
          <Image
            source={{ uri: stats.awayTeam.logo }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        {/* team container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#ccc" }}>{stats.homeTeam.name}</Text>
          {/* scores wrapper */}
          <View style={{ alignItems: "center" }}>
            {/* scores */}
            <View style={styles.scoreWrapper}>
              {stats.status === "NS" ? (
                <View style={styles.scoreContainer}>
                  <Text style={{ fontSize: 10, fontWeight: "500" }}>
                    {formattedTime(stats.timestamp)}
                  </Text>
                </View>
              ) : stats.status === "FT" ? (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>{stats.homeTeam.goals}</Text>

                  <Text style={styles.separator}>:</Text>

                  <Text style={styles.scoreText}>{stats.awayTeam.goals}</Text>
                </View>
              ) : stats.status === "1H" ||
                stats.status === "2H" ||
                stats.status === "HT" ||
                stats.status === "CANC" ? (
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#f44336",
                      fontSize: 10,
                      padding: 3,
                    }}
                  >
                    {stats.elapsedTime}'
                  </Text>
                  <View style={styles.scoreContainer}>
                    <Text style={[styles.scoreText, styles.liveColor]}>
                      {stats.homeTeam.goals}
                    </Text>

                    <Text style={styles.separator}>:</Text>

                    <Text style={[styles.scoreText, styles.liveColor]}>
                      {stats.awayTeam.goals}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.separator}>:</Text>
              )}
            </View>

            {/* status */}
            <View style={{ alignSelf: "center", marginTop: 10 }}>
              {stats.status === "FT" ? (
                <Text style={[styles.status, styles.finished]}>
                  {stats.status}
                </Text>
              ) : stats.status === "1H" ||
                stats.status === "2H" ||
                stats.status === "HT" ? (
                <Text style={[styles.status, styles.live]}>
                  {stats.status}'
                </Text>
              ) : stats.status === "NS" ? (
                <Text style={[styles.status, styles.notStarted]}>
                  {stats.status}
                </Text>
              ) : (
                <Text style={[styles.status, styles.posCancel]}>
                  {stats.status}
                </Text>
              )}
            </View>
            {stats.status === '2H' ||
              stats.status === 'FT'
              ? (
               <Text style={{ color: "#ccc" }}>
              ({stats.halftime.home}-{stats.halftime.away})
            </Text>
            ) : null}
          </View>

          <Text style={{ color: "#ccc" }}>{stats.awayTeam.name}</Text>
        </View>
      </View>
      {/* match detail headers */}
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#888",
          backgroundColor: "#f5f5f5",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          horizontal
          style={{
            width: "100%",
          }}
        >
          <View style={styles.infoWrapper}>
            {/* Statistics */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setActiveState("stat")} // Set the active state
            >
              <Text
                style={[
                  styles.infoTitle,
                  activeState === "stat" ? styles.active : null,
                ]}
              >
                Statistics
              </Text>
            </TouchableOpacity>

            {/* Event */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setActiveState("event")} // Set the active state
            >
              <Text
                style={[
                  styles.infoTitle,
                  activeState === "event" ? styles.active : null,
                ]}
              >
                Event
              </Text>
            </TouchableOpacity>

            {/* Line-Up */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setActiveState("line")} // Set the active state
            >
              <Text
                style={[
                  styles.infoTitle,
                  activeState === "line" ? styles.active : null,
                ]}
              >
                Line-Up
              </Text>
            </TouchableOpacity>

            {/* Standings */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setActiveState("stand")} // Set the active state
            >
              <Text
                style={[
                  styles.infoTitle,
                  activeState === "stand" ? styles.active : null,
                ]}
              >
                Standings
              </Text>
            </TouchableOpacity>

            {/* Head2Head */}
            <TouchableOpacity
              style={styles.infoContainer}
              onPress={() => setActiveState("head")} // Set the active state
            >
              <Text
                style={[
                  styles.infoTitle,
                  activeState === "head" ? styles.active : null,
                ]}
              >
                Head2Head
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* Match Details Content */}
      {activeState === "event" && <ScoreEvent />}
      {activeState === "stat" && <Statistics />}
      {activeState === "stand" && <Standing />}
      {activeState === "line" && <LineUp />}
      {activeState === "head" && <Head2Head />}
      <StatusBar barStyle="light-content"/>
    </SafeAreaView>
  );
};

export default MatchDetailsScreen;

const styles = StyleSheet.create({
  roundWrapper: {
    // marginLeft: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  roundText: {
    fontSize: 10,
    color: "#000",
  },
  dateText: {
    fontSize: 12,
    color: "#aaa",
    fontWeight: "900",
  },
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
    flexWrap: "wrap",
    // overflow: "hidden",
  },
  teamLogo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  teamName: {
    fontSize: 12,
    fontWeight: "800",
    color: "#333",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    borderRadius: 6,
    width: 100,
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },
  separator: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  status: {
    fontSize: 10,
    fontWeight: "bold",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    overflow: "hidden",
  },
  finished: {
    color: "#ccc",
    fontSize: 17,
  },
  live: {
    color: "#fff",
    backgroundColor: "#f44336",
  },
  notStarted: {
    color: "#000",
    backgroundColor: "#ccc",
  },
  liveColor: {
    color: "red",
  },
  posCancel: {
    color: "red",
    fontWeight: "bold",
    fontSize: 10,
  },
  infoContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    marginVertical: 10,
  },
  infoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  infoTitle: {
    padding: 2,
    fontSize:14
  },
  active: {
    fontWeight: "bold",
    color: "#f88e03",
  },
});


