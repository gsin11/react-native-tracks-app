import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function TrackListScreen({ navigation }) {
  return (
    <View>
      <Text style={{ fontSize: 48 }}>TrackList Screen</Text>
      <Button
        title="Got to Track Detail"
        onPress={() => navigation.navigate("TrackDetail")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
