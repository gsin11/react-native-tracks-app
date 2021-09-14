import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountScreen from "./src/screens/AccountScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/RootNavigator";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginFlowScreen() {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainFlowScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Track List" }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{ title: "Create Track" }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "My Account" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginFlow"
            component={LoginFlowScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="MainFlow" component={MainFlowScreen} />
          <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
