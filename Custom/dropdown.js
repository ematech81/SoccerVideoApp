
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from "react-native";

const CustomDropdown = ({
  data,
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue ? selectedValue : placeholder || "Select an option"}
        </Text>
      </TouchableOpacity>

      {/* Modal for List */}
      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <ScrollView>
              {data.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.dropdownItemText}>{item.league.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownContainer: {
    width: "80%",
    maxHeight: "50%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#333",
  },
});
