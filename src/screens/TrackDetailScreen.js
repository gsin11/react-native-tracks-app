import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";

export default function TrackDetailScreen({ route, navigation }) {
  const { state } = useContext(TrackContext);
  const { _id } = route.params;

  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 48 }}>TrackDetail Screen</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialCoords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});
