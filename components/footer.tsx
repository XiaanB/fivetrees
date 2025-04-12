import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";  // You can use other icon libraries as well

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>Follow Us:</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => alert("Redirecting to Facebook...")}>
          <FontAwesome name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Redirecting to Twitter...")}>
          <FontAwesome name="twitter" size={30} color="#00acee" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Redirecting to Instagram...")}>
          <FontAwesome name="instagram" size={30} color="#bc2a8d" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Redirecting to LinkedIn...")}>
          <FontAwesome name="linkedin" size={30} color="#0077b5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  footerText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "60%",
  },
});
