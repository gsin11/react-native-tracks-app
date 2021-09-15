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
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { navigationRef } from "./src/RootNavigator";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoginFlowScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainFlowScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconColor = focused ? "dodgerblue" : "black";
          switch (route.name) {
            case "TrackList":
              return <FontAwesome name="th-list" size={24} color={iconColor} />;
            case "TrackCreate":
              return <FontAwesome name="plus" size={24} color={iconColor} />;
            default:
              return <FontAwesome name="gear" size={24} color={iconColor} />;
          }
        },
        tabBarActiveTintColor: "dodgerblue",
        tabBarInactiveTintColor: "black",
      })}
    >
      <Tab.Screen
        name="TrackList"
        component={TrackListScreen}
        options={{ title: "Tracks" }}
      />
      <Tab.Screen
        name="TrackCreate"
        component={TrackCreateScreen}
        options={{ title: "Create Track", headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "My Account", headerShown: false }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="ResolveAuth">
              <Stack.Screen
                name="ResolveAuth"
                component={ResolveAuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginFlow"
                component={LoginFlowScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MainFlow"
                component={MainFlowScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
}
