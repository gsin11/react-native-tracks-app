import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationRef from "../RootNavigator";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "signin":
      return {
        errorMessage: "",
        token: action.payload,
      };
    case "clear_error_message":
      return {
        ...state,
        errorMessage: "",
      };
    case "sign_out":
      return {
        token: null,
        errorMessage: "",
      };
    default:
      return state;
  }
};

const signUp =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      NavigationRef.navigate("MainFlow");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up!",
      });
    }
  };

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await trackerAPI.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: response.data.token });
      NavigationRef.navigate("MainFlow");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign in!",
      });
    }
  };

const signOut = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "sign_out" });
  NavigationRef.navigate("LoginFlow");
};

const tryLocalSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      NavigationRef.navigate("MainFlow");
    } else {
      NavigationRef.navigate("LoginFlow");
    }
  };
};

const clearErrorMessage = (dispatch) => {
  return () => dispatch({ type: "clear_error_message" });
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signUp, signOut, clearErrorMessage, tryLocalSignIn },
  { token: null, errorMessage: "" }
);
