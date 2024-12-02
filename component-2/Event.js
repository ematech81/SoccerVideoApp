import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { eventData } from "../Database/eventData";


const MatchEvents = () => {
  const [events, setEvents] = useState(eventData.response);

  // Filter events by team
  const homeTeamEvents = events.filter((event) => event.team.id === 463);
  const awayTeamEvents = events.filter((event) => event.team.id === 442);

  return (
    <ScrollView>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "#f2f2f2",
            borderBottomWidth: 0.3,
            paddingBottom: 10,
          }}
        >
          Events
        </Text>
      </View>
      <View style={styles.teamWrapper}>
        <View style={styles.teamContainer}>
          {homeTeamEvents.map((event, index) => (
            <View key={index} style={styles.teamContainer2}>
              {/* image and team name */}

              <Text style={[styles.textCol]}>⏱ {event.time.elapsed} min</Text>
              {event.type === "Goal" ? (
                <View>
                  <Text style={[styles.textCol]}>⚽ {event.detail}...</Text>
                  <Text style={[styles.textCol]}>{event.player.name}</Text>
                </View>
              ) : event.detail === "Yellow Card" ? (
                <View>
                  <Text style={[styles.textCol]}>🟨 {event.player.name}</Text>
                </View>
              ) : event.detail === "Red Card" ? (
                <View>
                  <Text style={[styles.textCol]}>🟥 {event.player.name}</Text>
                </View>
              ) : event.type === "subst" ? (
                <View>
                  <Text style={[styles.textCol]}>
                    {event.detail} {" > "} <Text>{event.player.name}</Text>
                  </Text>
                </View>
              ) : (
                <Text style={[styles.textCol]}>
                  {event.type}: <Text>{event.detail}</Text>
                </Text>
              )}
              {event.assist.name && (
                <Text style={[styles.textCol, styles.italics]}>
                  {event.assist.name}
                </Text>
              )}
            </View>
          ))}
        </View>
        {/* Away Team Events */}

        <View style={styles.teamContainer}>
          {awayTeamEvents.map((event, index) => (
            <View key={index} style={styles.teamContainer2}>
              {/* image and team name */}

              <Text style={[styles.textCol]}>⏱ {event.time.elapsed} min</Text>
              {event.type === "Goal" ? (
                <View>
                  <Text style={[styles.textCol]}>⚽ {event.detail}...</Text>
                  <Text style={[styles.textCol]}>{event.player.name}</Text>
                </View>
              ) : event.detail === "Yellow Card" ? (
                <View>
                  <Text style={[styles.textCol]}>🟨 {event.player.name}</Text>
                </View>
              ) : event.detail === "Red Card" ? (
                <View>
                  <Text style={[styles.textCol]}>🟥 {event.player.name}</Text>
                </View>
              ) : event.type === "subst" ? (
                <View>
                  <Text style={[styles.textCol]}>
                    {event.detail} {" > "} <Text>{event.player.name}</Text>
                  </Text>
                </View>
              ) : (
                <Text style={[styles.textCol]}>
                  {event.type}: <Text>{event.detail}</Text>
                </Text>
              )}
              {event.assist.name && (
                <Text style={[styles.textCol, styles.italics]}>
                  {event.assist.name}
                </Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default MatchEvents;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 30,
    height: "100%",
  },
  teamWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 8,
  },
  imageContainer: {
    borderRadius: "100%",
    width: 30,
    height: 30,
  },
  hometeam: {
    color: "white",
  },
  textCol: {
    color: "#f2f2f2",
    fontSize: 11,
    marginVertical: 1,
  },
  TeamName: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#f2f2f2",
  },
  teamContainer: {
    width: "50%",
    paddingLeft: 16,
  },
  teamContainer2: {
    marginVertical: 10,
    
  },
  italics: {
    fontStyle: "italic",
  },
});
