import { View, Text, SafeAreaView, StyleSheet, StatusBar, ScrollView } from 'react-native'
import React from 'react'
import Predictions from '../component/Prediction';
import { useRoute } from '@react-navigation/native';
import BackArrow from '../Custom/BackArrow';

const PredictionDetailScreen = ({navigation}) => {

  const {params} = useRoute();
  const { match } = params;
  console.log(match)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1812" }}>
      <BackArrow onPress={() => navigation.goBack()} />
      <View style={styles.header}>
        <Text style={{ color: "white" }}>Today's VIP Prediction</Text>
      </View>

      {/* body content */}
      <ScrollView style={{ padding: 2 }}>
        {/* prediction wrapper */}
        <View
          style={{ backgroundColor: "white", marginTop: 40, paddingBottom: 25 }}
        >
          {/* prediction header */}
          <View style={styles.predictionHeader}>
            <Text style={{ fontWeight: "600", fontSize: 14 }}>
              {match.league}
            </Text>
            <Text style={{ fontWeight: "400", fontSize: 12 }}>
              {match.eventDate}
            </Text>
          </View>
          <Text style={{ padding: 10, fontWeight: "bold" }}>
            {match.eventTime}
          </Text>

          {/* teams */}
          <View style={styles.teamHeader}>
            <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 27 }}>
              {match.homeTeam}
            </Text>
            <Text>vs</Text>
            <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 27 }}>
              {match.awayTeam}
            </Text>
          </View>

          {/* prediction */}
          <View style={styles.PredictionContent}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: "purple" }}>
              Prediction
            </Text>
            <Text>:</Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: "purple",
                fontWeight: "bold",
                lineHeight: 27,
              }}
            >
              {match.prediction}
            </Text>
          </View>
          {/* prediction info */}
          <View
            style={{
              padding: 10,
              marginVertical: 2,
            }}
          >
            <View style={styles.predictionInfoWrapper}>
              {/* home border */}
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "purple",
                  width: 100,
                }}
              ></View>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                Home Team Info
              </Text>
              {/* away border */}
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "purple",
                  width: 100,
                }}
              ></View>
            </View>

            {/* info display container */}
            <View style={{ padding: 3 }}>
              <Text style={{ paddingVertical: 4 }}>
                <Text style={styles.matchKeyPoint}> home Trends {" : "}</Text>
                <Text style={styles.info}>{match.homeTrends}</Text>
              </Text>
              {/*  */}
              <Text style={{ paddingVertical: 4 }}>
                <Text style={styles.matchKeyPoint}>
                  home Goal Per Match {" : "}
                </Text>
                <Text style={styles.info}>{match.homeGoalPerMatch}</Text>
              </Text>
              <Text style={{ paddingVertical: 4 }}>
                <Text style={styles.matchKeyPoint}>
                  home Conceded Per Match {" : "}
                </Text>
                <Text style={styles.info}>{match.homeConcededPerMatch}</Text>
              </Text>
              <Text style={{ paddingVertical: 4 }}>
                <Text style={styles.matchKeyPoint}>
                  home Previous Match Overs {" : "}
                </Text>
                <Text style={styles.info}>{match.homePreviousMatchOvers}</Text>
              </Text>
            </View>
            {/*  away team info*/}
            <View style={styles.predictionInfoWrapper}>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "purple",
                  width: 100,
                }}
              ></View>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                Away Team Info
              </Text>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: "purple",
                  width: 100,
                }}
              ></View>
            </View>
            {/* info display container */}
            <View style={{ padding: 3 }}>
              <Text style={{ padding: 3 }}>
                <Text style={styles.matchKeyPoint}> Away Trends {" : "}</Text>
                <Text style={styles.info}>{match.awayTrends}</Text>
              </Text>
              {/*  */}
              <Text style={{ paddingVertical: 1 }}>
                <Text style={styles.matchKeyPoint}>
                  Away Goal Per Match {" : "}
                </Text>
                <Text style={styles.info}>{match.awayGoalPerMatch}</Text>
              </Text>
              <Text style={{ paddingVertical: 1 }}>
                <Text style={styles.matchKeyPoint}>
                  Away Conceded Per Match {" : "}
                </Text>
                <Text style={styles.info}>{match.AwayConcededPerMatch}</Text>
              </Text>
              <Text style={{ paddingVertical: 1 }}>
                <Text style={styles.matchKeyPoint}>
                  Away Previous Match Overs {" : "}
                </Text>
                <Text style={styles.info}>{match.wayPreviousMatchOvers}</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar  barStyle="dark-content" backgroundColor='#1812' />
    </SafeAreaView>
  );
}

export default PredictionDetailScreen;



const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    // marginTop: 20,
    padding: 5,
    flexDirection: "row",
    backgroundColor: "#181727",
    marginHorizontal: 10,
  },
  predictionHeader: {
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
  },
  teamHeader: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    // backgroundColor: "#eee",
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 2,
    gap: 15,
  },
  PredictionContent: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    flexDirection: "row",
    borderRadius: 15,
    marginTop: 2,
    gap: 15,
  },
  predictionInfoWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 15,
    gap: 15,
  },
  matchKeyPoint: {
    fontWeight: '700',
    color: "blue",
    opacity: 0.8,
    lineHeight: 25,
    fontSize: 14,
  },
  info: {
    lineHeight: 25,
    fontSize: 14,
  },
});