import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignUpScreen({ navigation }) {
  const { state, signUp } = useContext(AuthContext);

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
  link: {
    color: "blue",
  },
});
