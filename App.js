import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import Homepage from "./src/screens/Homepage";

export default function App() {
  let [isLoaded] = useFonts({
    Avenir: require("./assets/fonts/Metropolis-SemiBold.otf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return <Homepage style={{ fontFamily: "Avenir" }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
