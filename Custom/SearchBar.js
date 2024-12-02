import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  onSubmit,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder || "Search..."}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#f88e03",
  },
});

// SearchBar.propTypes = {
//   placeholder: PropTypes.string,
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func,
//   containerStyle: PropTypes.object,
//   inputStyle: PropTypes.object,
// };

// SearchBar.defaultProps = {
//   placeholder: "Search...",
//   onSubmit: null,
//   containerStyle: {},
//   inputStyle: {},
// };

export default SearchBar;
