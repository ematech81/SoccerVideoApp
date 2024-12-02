












// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import Icon from "react-native-vector-icons/Ionicons"; // Ensure you have this import
// import HomeScreens from "./screens/HomeScreens";
// import LiveScoresScreen from "./screens/LiveScoresScreen";
// import PredictionScreen from "./screens/PredictionScreen";
// import FavoritesScreen from "./screens/FavoritesScreen"; // Corrected spelling

// // Create the required navigators
// const Stack = createNativeStackNavigator();
// // const Stack = createStackNavigator();
// const BottomTab = createBottomTabNavigator();

// // Bottom Tab Navigator
// function BottomTabNavigator() {
//   return (
//     <BottomTab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === "Home") {
//             iconName = "home-outline";
//           } else if (route.name === "LiveScores") {
//             iconName = "football-outline";
//           } else if (route.name === "Prediction") {
//             iconName = "trending-up-outline";
//           } else if (route.name === "Favorites") {
//             iconName = "heart-outline";
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarLabelStyle: {
//           fontSize: 13,
//           fontWeight: "700",
//           textTransform: "capitalize",
//         },
//         
//         tabBarActiveTintColor: "#173",
//         tabBarInactiveTintColor: "gray",
//       })}
//     >
//       <BottomTab.Screen
//         name="Home"
//         component={HomeScreens}
//         options={{
//           headerShown: false,
//         }}
//       />
//       <BottomTab.Screen
//         name="LiveScores"
//         component={LiveScoresScreen}
//         options={{ headerShown: false }}
//       />
//       <BottomTab.Screen
//         name="Prediction"
//         component={PredictionScreen}
//         options={{ headerShown: false }}
//       />
//       <BottomTab.Screen
//         name="Favorites"
//         component={FavoritesScreen} // Corrected spelling here
//         options={{ headerShown: false }}
//       />
//     </BottomTab.Navigator>
//   );
// }

// // App Navigator
// function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="MainApp"
//           component={BottomTabNavigator}
//           options={{ headerShown: false }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default AppNavigator;
