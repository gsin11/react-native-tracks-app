import createDataContext from "./createDataContext";
import trackerAPI from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationRef from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "signup":
      return {
        errorMessage: "",
        token: action.payload,
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
      dispatch({ type: "signup", payload: response.data.token });
      NavigationRef.navigate("MainFlow");
    } catch (error) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up!",
      });
    }
  };

const signIn = () => {
  return ({ email, password }) => {};
};

const signOut = () => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, signUp, signOut },
  { token: null, errorMessage: "" }
);
