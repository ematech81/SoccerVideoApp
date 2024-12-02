
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { predictionData } from "../db";
import { useNavigation } from "@react-navigation/native";

const Predictions = () => {
  const [prediction, setPrediction] = useState(predictionData.prediction);


  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContentContainer}
      > */}
      <View style={styles.header}>
        <Text style={{ fontWeight: "600", fontSize: 16 }}>
          Today's VIP Prediction
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("FullPredictionScreen")}
        >
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: "#f88e03",
            }}
          >
            see all
          </Text>
        </TouchableOpacity>
      </View>
      {prediction.length > 3 &&
        prediction.slice(0, 2).map((item, index) => (
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
      {/* </ScrollView> */}
    </View>
  );
};

export default Predictions;

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#1812'
  },
  scrollViewContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  predictionCard: {
    width: width - 40,
    height: height * 0.23,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 15,
    margin: 'auto',
    marginVertical: 5,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
    marginTop:30,
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
    marginVertical:10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});















// import {
//   View,
//   Text,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import { predictionData } from "../db";

// const Predictions = () => {

//   const [prediction, setPredicton] = useState(predictionData.prediction);
   


//   return (
//     <View style={{}}>
//       <ScrollView
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         horizontal
//         pagingEnabled
//       >
//         <>
//           {prediction.map((item, index) => (
//             <View style={styles.scrollViewContent} key={index}>
//               <Text style={styles.LiveText}> Today's Prediction</Text>
//               <View style={{ justifyContent: "center", alignItems: "center" }}>
//                 <Text style={{ fontWeight: "600", fontSize: 16 }}>
//                   {item.league}
//                 </Text>
//               </View>
//               <View style={styles.matchContainer}>
//                 <View>
//                   <Text style={{ fontWeight: "600" }}>{item.homeTeam}</Text>
//                 </View>
//                 <Text style={{ fontWeight: "900" }}>{":"}</Text>
//                 <View>
//                   <Text style={{ fontWeight: "600" }}>{item.awayTeam}</Text>
//                 </View>
//               </View>
//               <View
//                 style={{
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexDirection: "row",
//                 }}
//               >
//                 <Text style={{ fontWeight: "bold" }}>Prediction :</Text>
//                 <Text
//                   style={{
//                     marginHorizontal: 40,
//                     color: "#800000 ",
//                     fontWeight: "900",
//                   }}
//                 >
//                   {item.prediction}
//                 </Text>
//               </View>
//               <TouchableOpacity style={styles.touchable}>
//                 <Text
//                   style={{
//                     color: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   View Details
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           ))}
//         </>
//       </ScrollView>
//     </View>
//   );
// };

// export default Predictions;

// const { height, width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     width: width - 20,
//     height: height * 0.37,
//     backgroundColor: "white",
//     borderRadius: 15,
//     marginVertical: 20,
//     elevation: 10,
//     marginVertical: 20,
//     marginHorizontal: 10,
//     paddingVertical: 2,
//   },
//   LiveText: {
//     color: "#800000",
//     fontWeight: "bold",
//     fontSize: 17,
//     marginVertical: 10,
//     marginLeft: 25,
//   },
//   matchContainer: {
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     flexDirection: "row",
//     marginVertical: 30,
//   },
//   touchable: {
//     alignSelf: "center",
//     marginTop: 30,
//     borderRadius: 20,
//     padding: 5,
//     backgroundColor: "#f88e03",
//     width: 150,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
