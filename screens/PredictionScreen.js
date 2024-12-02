import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LatestPrediction } from "../Database/LatestPrediction";
import Entypo from "@expo/vector-icons/Entypo";

const PredictionScreen = () => {
  const [predictions, setPredictions] = useState(LatestPrediction.matches);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Today's Free Tips</Text>
        <View style={styles.vipContainer}>
          <Text style={styles.vipText}>VIP</Text>
        </View>
      </View>

      {/* Introductory Text */}
      <Text style={styles.introText}>
        Here are today's carefully curated free tips for{" "}
        <Text style={styles.highlightedText}>November 27th, 2024</Text>.
      </Text>

      {/* Predictions List */}
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Match Info */}
            <View style={styles.matchInfo}>
              <Text style={styles.teamText}>{item.home_team}</Text>
              <Text style={styles.vsText}>vs</Text>
              <Text style={styles.teamText}>{item.away_team}</Text>
              <TouchableOpacity style={styles.arrowButton}>
                <Entypo name="chevron-right" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Prediction Details */}
            <View style={styles.predictionTable}>
              <Text style={styles.tableHeader}>Pred</Text>
              <Text style={styles.tableHeader}>Odd</Text>
              <Text style={styles.tableHeader}>Prob</Text>
              <Text style={styles.tableHeader}>Result</Text>
              <Text style={styles.tableHeader}>Status</Text>
            </View>
            <View style={styles.predictionDetails}>
              <Text style={styles.tableText}>{item.prediction}</Text>
              <Text style={styles.tableText}>{item.prediction_odd || "-"}</Text>
              <Text style={styles.tableText}>
                {item.prediction_probability}%
              </Text>
              <Text
                style={[
                  styles.tableText,
                  {
                    color: item.is_prediction_correct ? "green" : "red",
                  },
                ]}
              >
                {item.result_score || "-"}
              </Text>
              <Text
                style={[
                  styles.tableTextP,
                  {
                    color: item.is_finished
                      ? item.is_prediction_correct
                        ? "green"
                        : "red"
                      : "#ccc",
                  },
                ]}
              >
                {item.is_finished
                  ? item.is_prediction_correct
                    ? "Won"
                    : "Lost"
                  : "Pending"}
              </Text>
            </View>
          </View>
        )}
      />
      <StatusBar barStyle="light-content" backgroundColor="#1a1d2a" />
    </SafeAreaView>
  );
};

export default PredictionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1d2a",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 30,
  },
  headerText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  vipContainer: {
    backgroundColor: "#f88e03",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  vipText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  introText: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  highlightedText: {
    color: "#ffd700",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#002a32",
    borderRadius: 10,
    marginVertical: 10,
    padding: 12,
  },
  matchInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamText: {
    color: "#ffd700",
    fontSize: 16,
    fontWeight: "bold",
  },
  vsText: {
    color: "#fff",
    fontSize: 14,
  },
  arrowButton: {
    backgroundColor: "#333",
    borderRadius: 20,
    padding: 5,
  },
  predictionTable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
    paddingBottom: 5,
  },
  tableHeader: {
    fontSize: 14,
    color: "#ddd",
    width: "20%",
    textAlign: "center",
  },
  predictionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  tableText: {
    fontSize: 14,
    color: "#fff",
    width: "20%",
    textAlign: "center",
    fontWeight:'800'
  },
  tableTextP: {
    fontSize: 13,
    color: "#fff",
    width: "20%",
    textAlign: "center",
    fontWeight:'800'
  },
});
