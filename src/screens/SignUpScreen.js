import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const { state, signUp, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        onSubmit={signUp}
        submitBtnText="Sign Up"
      />
      <NavLink
        routeName="SignIn"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
});
