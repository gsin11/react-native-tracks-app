import React, { useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import { ListItem } from "react-native-elements";

export default function TrackListScreen({ navigation }) {
  const { state, fetchTracks } = useContext(TrackContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchTracks();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
