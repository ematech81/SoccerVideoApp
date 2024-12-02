
import React, { useEffect } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
import BackArrow from "../Custom/BackArrow";
import * as ScreenOrientation from "expo-screen-orientation";

const FullVideoScreen = ({ route, navigation }) => {
  const { embed } = route.params; // Receive embed HTML from params


  useEffect(() => {
    // Set orientation to landscape on screen load
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };
    lockLandscape();

    // Reset to portrait when exiting the screen
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <BackArrow color='white' onPress={() =>navigation.goBack()}/> */}
      <WebView source={{ html: embed }} style={styles.webView} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webView: {
    width: "100%",
    height: "100%",
  },
});

export default FullVideoScreen;
