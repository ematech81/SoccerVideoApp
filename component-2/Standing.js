

// import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
// import React, { useState } from "react";
// import { StandingData } from "../Database/standingsData";

// const Standing = () => {
//   const [standings, setStandings] = useState(StandingData.response);

//   return (
//     <View style={styles.container}>
//       {standings.map((item, index) => (
//         <View key={index}>
//           {/* League Header */}
//           <View style={styles.headerContainer}>
//             <View style={styles.leagLogo}>
//               <Image
//                 source={{ uri: item.league.logo }}
//                 style={{ width: 40, height: 40 }}
//               />
//               <Text style={styles.leagSeason}>{item.league.name}</Text>
//             </View>
//             <Text style={styles.leagSeason}>{item.league.season}</Text>
//           </View>

//           {/* Table Header */}
//           <View style={styles.standingDetailContainer}>
//             <View style={styles.teamRankContainer}>
//               <Text style={styles.teamRankText}>#</Text>
//               <Text style={styles.teamRankText}>Team</Text>
//               <Text style={styles.teamRankText}>P</Text>
//               <Text style={styles.teamRankText}>W</Text>
//               <Text style={styles.teamRankText}>D</Text>
//               <Text style={styles.teamRankText}>L</Text>
//               <Text style={styles.teamRankText}>GD</Text>
//               <Text style={styles.teamRankText}>Pts</Text>
//             </View>
//           </View>

//           {/* Standings Data */}
//           {item.league.standings[0].map((info) => (
//             <View style={styles.standingDetailItems} key={info.rank}>
//               {/* Team Info Row */}
//               <View style={styles.teamRankItem}>
//                 <Text style={styles.teamRankText}>{info.rank}</Text>
//                 <View style={styles.teamInfo}>
//                   <Image
//                     source={{ uri: info.team.logo }}
//                     style={styles.teamLogo}
//                   />
//                   <Text style={styles.teamName}>
//                     {info.team.name.length > 14
//                       ? info.team.name.slice(0, 12) + "..."
//                       : info.team.name}
//                   </Text>
//                 </View>
//               </View>

//               {/* Performance Data */}
//               <View style={styles.performanceData}>
//                 <Text style={styles.teamRankText}>{info.all.played}</Text>
//                 <Text style={styles.teamRankText}>{info.all.win}</Text>
//                 <Text style={styles.teamRankText}>{info.all.draw}</Text>
//                 <Text style={styles.teamRankText}>{info.all.lose}</Text>
//                 <Text style={styles.teamRankText}>{info.goalsDiff}</Text>
//                 <Text style={styles.teamRankText}>{info.points}</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       ))}
//     </View>
//   );
// };

// export default Standing;

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//     backgroundColor: "#fff",
//   },
//   headerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   leagLogo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   leagSeason: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginLeft: 8,
//   },
//   standingDetailContainer: {
//     flexDirection: "row",
//     backgroundColor: "#f0f0f0",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   teamRankContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//   },
//   teamRankText: {
//     fontSize: 14,
//     fontWeight: "600",
//     textAlign: "center",
//     marginHorizontal: 8,
//   },
//   standingDetailItems: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   teamRankItem: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   teamInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 10,
//   },
//   teamLogo: {
//     width: 20,
//     height: 20,
//     marginRight: 8,
//   },
//   teamName: {
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   performanceData: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "50%",
//   },
// });













































import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StandingData } from '../Database/standingsData'

const Standing = () => {

  const [standings, setStandings] = useState(StandingData.response)
  return (
    <View style={{flex: 1}}>
      {standings.map((item, index) => (
        <View key={index}>
          <View style={styles.headerContainer}>
            {/* league name and logo */}
            <View style={styles.leagLogo}>
              <Image
                source={{ uri: item.league.logo }}
                style={{ width: 40, height: 40 }}
              />
              <Text style={styles.leagSeason}>{item.league.name}</Text>
            </View>
            <Text style={styles.leagSeason}>{item.league.season}</Text>
          </View>

          {/* standing details */}
          <View style={styles.standingDetailContainer}>
            {/* rang and team row */}
            <View style={styles.teamRankContainer}>
              <Text style={styles.teamRankText}>#</Text>
              <Text style={styles.teamRankText}>Team</Text>
            </View>

            {/* standing data with 6 rows */}
            <View style={styles.standingsRowContainer}>
              <Text style={styles.teamRankText}>P</Text>
              <Text style={styles.teamRankText}>W</Text>
              <Text style={styles.teamRankText}>D</Text>
              <Text style={styles.teamRankText}>L</Text>
              <Text style={styles.teamRankText}>GD</Text>
              <Text style={styles.teamRankText}>Pts</Text>
            </View>
          </View>


          <ScrollView
          contentContainerStyle={{paddingBottom: 50}}
          >
            {/* standing data mapping */}
            {item.league.standings[0].map((info) => (
              <View style={styles.standingDetailItems} key={info.rank}>
                {/* rank and team row */}
                <View style={styles.teamRankItem}>
                  <Text style={styles.teamRankText}>{info.rank}</Text>
                  <View style={styles.teamInfo}>
                    <Image
                      source={{ uri: info.team.logo }}
                      style={styles.teamLogo}
                    />
                    <Text style={styles.teamName}>
                      {info.team.name.length > 4
                        ? info.team.name.slice(0, 3).toUpperCase()
                        : info.team.name}
                    </Text>
                  </View>
                </View>

                {/* standing table */}
                <View style={styles.standingsRowTable}>
                  <Text style={styles.teamRankText}>{info.all.played}</Text>
                  <Text style={styles.teamRankText}>{info.all.win}</Text>
                  <Text style={styles.teamRankText}>{info.all.draw}</Text>
                  <Text style={styles.teamRankText}>{info.all.lose}</Text>
                  <Text style={styles.teamRankText}>{info.goalsDiff}</Text>
                  <Text style={styles.teamRankText}>{info.points}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
 }

 export default Standing;



const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  leagLogo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  leagSeason: {
    fontWeight: "bold",
    color: "#555",
    fontSize: 14,
  },
  standingDetailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f44336",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  standingDetailItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    borderBottomColor: "#aaa",
  },
  teamRankContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25%",
  },
  teamRankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "25%",
    marginTop: 10,
  },
  teamRankText: {
    color: "#fff",
    fontWeight: "700",
    paddingHorizontal: 8,
  },
  standingsRowContainer: {
    width: "60%",
    padding: 5,
  flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  standingsRowTable: {
    width: "60%",
    padding: 5,
  flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  teamInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  teamLogo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
});