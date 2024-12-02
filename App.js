


// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";

// Import Screens
import HomeScreens from "./screens/HomeScreens";
import LiveScoresScreen from "./screens/LiveScoresScreen";
import PredictionScreen from "./screens/PredictionScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FullVideoScreen from "./screens/FullVideoScreen";
import MatchesScreen from "./screens/Matches";
import PredictionDetailScreen from "./screens/PredictionDetailScreen";
import MatchDetailsScreen from "./screens/MatchDetailsScreen";
import FullPredictionScreen from "./screens/FullPredictionScreen";
import SearchPageScreen from "./screens/SearchPageScreen";
import { FavoritesProvider } from "./matchContext";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Main App
function MainStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FullVideoScreen"
        component={FullVideoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchDetailsScreen"
        component={MatchDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PredictionDetailsScreen"
        component={PredictionDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FullPredictionScreen"
        component={FullPredictionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchPageScreen"
        component={SearchPageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "LiveScoresScreen") iconName = "football-outline";
          else if (route.name === "Prediction")
            iconName = "trending-up-outline";
          else if (route.name === "Favorites") iconName = "heart-outline";
          else if (route.name === "Matches") iconName = "videocam";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          // fontSize: 12,
          fontWeight: "400",
          textTransform: "capitalize",
        },
        tabBarStyle: {
          // backgroundColor: "#fff",
          borderTopWidth: 2,
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#f88e03",
        tabBarInactiveTintColor: "gray",
        // tabBarLabelStyle: { fontWeight: "600",marginBottom: 3, height:60 },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreens}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="LiveScoresScreen"
        component={LiveScoresScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Prediction"
        component={PredictionScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}





