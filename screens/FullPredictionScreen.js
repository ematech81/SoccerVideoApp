
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import { predictionData } from "../db";
import { useNavigation } from "@react-navigation/native";
import BackArrow from "../Custom/BackArrow";

const FullPredictionScreen = ({navigation, route}) => {

const [prediction, setPrediction] = useState(predictionData.prediction);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackArrow onPress={() => navigation.goBack()} />
      <View style={styles.container}>
         <ScrollView
        // horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      > 
        <View style={styles.header}>
          <Text style={{ fontWeight: "600", fontSize: 18 }}>
            Today's VJP Prediction
          </Text>
        </View>
        {prediction.map((item, index) => (
          <View style={styles.predictionCard} key={index}>
            {/* <Text style={styles.titleText}>Today's Prediction</Text> */}

            <View style={styles.leagueContainer}>
              <Text style={styles.leagueText}>{item.league}</Text>
            </View>
            <View style={styles.matchContainer}>
              <Text style={styles.teamText}>{item.homeTeam}</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.teamText}>{item.awayTeam}</Text>
            </View>
            <View style={styles.predictionContainer}>
              <Text style={styles.predictionLabel}>Prediction:</Text>
              <Text style={styles.predictionText}>{item.prediction}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() =>
                navigation.navigate("PredictionDetailsScreen", { match: item })
              }
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ))}
        </ScrollView>
      </View>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
    </SafeAreaView>
  );
}

export default FullPredictionScreen;



const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: "#1812",
  },
  scrollViewContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  predictionCard: {
    width: width - 40,
    height: height * 0.25,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    margin: "auto",
    marginVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 10,
    marginTop: 40,
  },
  titleText: {
    color: "#d9534f",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  leagueContainer: {
    alignItems: "center",
    marginVertical: 6,
  },
  leagueText: {
    fontSize: 14,
    fontWeight: "800",
    color: "purple",
  },
  matchContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 5,
  },
  teamText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#555",
  },
  colon: {
    fontSize: 16,
    fontWeight: "900",
    color: "#d9534f",
  },
  predictionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  predictionLabel: {
    fontWeight: "700",
    fontSize: 16,
    color: "#333",
  },
  predictionText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#d9534f",
    marginLeft: 8,
  },
  detailsButton: {
    backgroundColor: "#f88e03",
    borderRadius: 25,
    paddingVertical: 4,
    paddingHorizontal: 15,
    alignSelf: "center",
    marginVertical: 20,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
