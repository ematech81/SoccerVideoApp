import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Key to store favorites in AsyncStorage
  const STORAGE_KEY = "@favorites";

  // Load favorites from AsyncStorage when the app loads
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Failed to load favorites from AsyncStorage:", error);
      }
    };
    loadFavorites();
  }, []);

  // Save favorites to AsyncStorage whenever they change
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to AsyncStorage:", error);
      }
    };
    saveFavorites();
  }, [favorites]);

  const toggleFavorite = (match) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (fav) => fav.fixtureId === match.fixtureId
      );
      if (isFavorite) {
        // Remove from favorites
        return prevFavorites.filter((fav) => fav.fixtureId !== match.fixtureId);
      } else {
        // Add to favorites
        return [...prevFavorites, match];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
