import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { LineUp } from "../Database/lineUpData";

const LineUpPage = () => {
  const [lineUpInfo, setLineUpInfo] = useState(LineUp.response);

  return (
    <ScrollView>
      {/* Header */}
      <View style={{ borderBottomWidth: 1, padding: 10, marginTop: 0 }}>
        <Text style={{ textAlign: "center", fontSize: 18, color: '#f2f2f2',
         }}>Line Up</Text>
      </View>

      {/* Line Up Info Wrapper */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {/* Home Team */}
        <View style={{ width: "50%", padding: 10 }}>
          {lineUpInfo[0] && (
            <View>
              {/* Team Information */}
              <View
                style={styles.teamContainer}
              >
                <Image
                  source={{ uri: lineUpInfo[0].team.logo }}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
                <Text
                  style={styles.teamName}
                >
                  {lineUpInfo[0].team.name}
                </Text>
              </View>
              <Text style={styles.coach}>
                Coach: {lineUpInfo[0].coach.name}
              </Text>
              <Text style={styles.formation}>
                Formation: {lineUpInfo[0].formation}
              </Text>

              {/* Starting XI */}
              <Text style={styles.lineUp}>
                Lineup
              </Text>
              {lineUpInfo[0].startXI.map((p, index) => (
                <View key={index} style={{ marginBottom: 5, marginLeft: 20 }}>
                  <Text style={{color: '#f5f5f5'}}>
                    {p.player.name} - {p.player.number}
                  </Text>
                </View>
              ))}

              {/* Substitutes */}
              <Text style={styles.lineUp}>
                Substitutes:
              </Text>
              {lineUpInfo[0].substitutes.map((sub, index) => (
                <View key={index} style={{ marginBottom: 5 ,marginLeft:20}}>
                  <Text style={{color: '#f2f2f2'}}>
                    {sub.player.name} - {sub.player.number}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Away Team */}
        <View style={{ width: "50%", padding: 10 }}>
          {lineUpInfo[1] && (
            <View>
              {/* Team Information */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: lineUpInfo[1].team.logo }}
                  style={{ width: 30, height: 30, marginRight: 5 }}
                />
                <Text
                  style={styles.teamName}
                >
                  {lineUpInfo[1].team.name}
                </Text>
              </View>
              <Text style={styles.coach}>
                Coach: {lineUpInfo[1].coach.name}
              </Text>
              <Text style={styles.formation}>
                Formation: {lineUpInfo[1].formation}
              </Text>

              {/* Starting XI */}
              <Text style={styles.lineUp}>
                Lineup
              </Text>
              {lineUpInfo[1].startXI.map((p, index) => (
                <View key={index} style={{ marginBottom: 5, marginLeft: 20 }}>
                  <Text style={{color: '#f5f5f5'}}>
                    {p.player.name} - {p.player.number}
                  </Text>
                </View>
              ))}

              {/* Substitutes */}
              <Text style={styles.lineUp}>
                Substitutes:
              </Text>
              {lineUpInfo[1].substitutes.map((sub, index) => (
                <View key={index} style={{ marginBottom: 5, marginLeft:20 }}>
                  <Text style={{color: '#f5f5f5'}} >
                    {sub.player.name} - {sub.player.number}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default LineUpPage;


const styles = StyleSheet.create({
  teamContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 8
  },
  teamName: {
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "capitalize",
    color: "#f2f2f2",
  },
  coach: { fontSize: 12, textTransform: "capitalize", color: "#f2f2f2" },
  formation: { marginBottom: 15, fontWeight: "bold", color: "#f5f5f5" },
  lineUp: {
    fontWeight: "bold",
    marginVertical: 15,
    color: "#fff",
    fontSize: 18,
    fontStyle: 'italic',
    paddingLeft: 10
  },
});