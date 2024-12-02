
import React from 'react'
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import VideoHighlights from '../component/Video';
import Predictions from '../component/Prediction';

const HomeScreens = ({navigation}) => {


 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.appName1}>
          Soccer<Text style={{ color: "#f88e03" }}>Sphere</Text>
        </Text>
        <View style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Entypo name="menu" size={30} color="#f88e03" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VideoHighlights />
        <Predictions/>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export default HomeScreens;


const Margin = Platform.OS === "ios" ? "3" : "";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginTop: Margin,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 50,
    flexDirection: "row",
    // borderBottomColor: "#ccc",
    // borderBottomWidth: 2,
    backgroundColor: "#181727",
  },
  appName1: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    color: "#fff"
  },
});
