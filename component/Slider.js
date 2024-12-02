import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


// Video API access token
// MTQ3Mjg0XzE3MzEwODQ3MDBfZTM3MWE5NmFiMjIwMGM1NzAyZmUyYjc5MGExNDE3MWU5Y2MwYWNiZQ==

// Embed token
// MTQ3Mjg0XzE3MzEwODQ3MDBfNmM4NDVkMGRkZjEzYmNjNmNhMDY3MWI3N2E1MjhkNzgyMTU0YWViMQ==
// Usage Oct 31 - Nov 8


const Slider = () => {
  return (
    <View style={{}}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        horizontal
      >
        <View style={styles.scrollViewContent}>
          <Text style={styles.LiveText}>Live</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              England {">>"}
              <Text style={{ fontWeight: "400" }}>Premier League</Text>
            </Text>
          </View>
          <View style={styles.matchContainer}>
            {/* club name and logo */}
            <View>
              <Text style={{ fontWeight: "600" }}>Liverpool</Text>
            </View>
            <Text style={{ fontWeight: "900" }}>{":"}</Text>
            <View>
              <Text style={{ fontWeight: "600" }}>Chesea</Text>
            </View>
          </View>
          {/* scores */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text>1</Text>
            <Text style={{ marginHorizontal: 40, color: "red" }}>34'</Text>
            <Text>0</Text>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 30,
              borderRadius: 20,
              padding: 5,
              backgroundColor: "#f88e03",
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Watch
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollViewContent}>
          <Text style={styles.LiveText}>Live</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              England {">>"}
              <Text style={{ fontWeight: "400" }}>Premier League</Text>
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              marginVertical: 30,
            }}
          >
            {/* club name and logo */}
            <View>
              <Text style={{ fontWeight: "600", fontSize: 18 }}>Liverpool</Text>
            </View>
            <Text style={{ fontWeight: "900" }}>{":"}</Text>
            <View>
              <Text style={{ fontWeight: "600", fontSize: 17 }}>Chesea</Text>
            </View>
          </View>
          {/* scores */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text style={{ fontWeight: "900", fontSize: 18 }}>1</Text>
            <Text
              style={{ marginHorizontal: 40, color: "red", fontWeight: "900" }}
            >
              34'
            </Text>
            <Text style={{ fontWeight: "900", fontSize: 17 }}>0</Text>
          </View>
          <TouchableOpacity style={styles.touchable}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Watch
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const { height, width } = Dimensions.get('window');
export default Slider

const styles = StyleSheet.create({
  scrollViewContent: {
    width: width - 20,
    height: height * 0.37,
    backgroundColor: "white",
    borderRadius: 15,
    marginVertical: 20,
    elevation: 10,
    marginTop: 40,
    marginHorizontal: 10,
    paddingVertical: 2,
  },
  LiveText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 17,
    marginVertical: 10,
    marginLeft: 25,
  },
  matchContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 30,
  },
  touchable: {
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 20,
    padding: 5,
    backgroundColor: "#f88e03",
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});