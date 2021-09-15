import React, { useContext, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

export default function TrackScreenScreen() {
  const isFocused = useIsFocused();
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );

  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView>
      <Text h3>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services.</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
