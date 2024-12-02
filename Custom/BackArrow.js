import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";


const BackArrow = ({onPress, color, style}) => {
  return (
    <View style={{ padding: 10}}>
      <TouchableOpacity onPress={onPress}>
        <Ionicons name="arrow-back" size={30} color={color} />
      </TouchableOpacity>
    </View>
  );
}

export default BackArrow