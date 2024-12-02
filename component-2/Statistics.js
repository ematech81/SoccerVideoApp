import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { statData } from "../Database/statData";

const MatchStatistics = () => {

  const [matchStat, setMatchStat] = useState(statData.response);
 
  

  // Extract home and away statistics
  const homeTeam = matchStat[0];
  const awayTeam = matchStat[1];

  // Function to calculate progress width
  const calculateProgress = (homeValue, awayValue, isPercentage) => {
    const home = isPercentage ? parseFloat(homeValue) : homeValue || 0;
    const away = isPercentage ? parseFloat(awayValue) : awayValue || 0;
    const maxValue = Math.max(home, away);
    return {
      home: (home / maxValue) * 100,
      away: (away / maxValue) * 100,
    };
  };

  return (
    <ScrollView
    style={{flex: 1, backgroundColor: '#fff'}}
    >
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: homeTeam.team.logo }} style={styles.logo} />
        <Text style={styles.teamName}>{homeTeam.team.name}</Text>
        <Text style={styles.vs}>VS</Text>
        <Image source={{ uri: awayTeam.team.logo }} style={styles.logo} />
        <Text style={styles.teamName}>{awayTeam.team.name}</Text>
      </View>

      {/* Statistics */}
      <View style={styles.statisticsContainer}>
        {homeTeam.statistics.map((stat, index) => {
          const awayStat = awayTeam.statistics.find(
            (s) => s.type === stat.type
          );
          const isPercentage = typeof stat.value === "string";
          const progress = calculateProgress(
            stat.value,
            awayStat?.value,
            isPercentage
          );

          return (
            <View key={index} style={styles.statRow}>
              <Text style={styles.statType}>{stat.type}</Text>
              <View style={styles.progressContainer}>
                {/* Home Progress */}
                <View
                  style={[
                    styles.progressBar,
                    { width: `${progress.home}%`, backgroundColor: "#4CAF50" , color: '#f2f2f2'},
                  ]}
                />
                {/* Away Progress */}
                <View
                  style={[
                    styles.progressBar,
                    { width: `${progress.away}%`, backgroundColor: "#FF5722" },
                  ]}
                />
              </View>
              <View style={styles.statValues}>
                <Text>{stat.value || 0}</Text>
                <Text>{awayStat?.value || 0}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  logo: {
    width: 40,
    height: 40,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    
  },
  vs: {
    fontSize: 13,
    fontWeight: "bold",
  },
  statisticsContainer: {
    padding: 10,
    
  },
  statRow: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  statType: {
    fontSize: 14,
    marginBottom: 5,
    
  },
  progressContainer: {
    flexDirection: "row",
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
  },
  statValues: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    
  },
});

export default MatchStatistics;
