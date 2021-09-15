import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context as AuthContext } from "../context/AuthContext";

export default function SignInScreen({ navigation }) {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      clearErrorMessage();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signIn}
        submitBtnText="Sign In"
      />
      <NavLink
        routeName="SignUp"
        text="Don't have an account? Sign up instead"
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
