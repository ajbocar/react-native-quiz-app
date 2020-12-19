import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/HomeScreen";
import { DetailsScreen } from "../screens/DetailsScreen";
import { QuizScreen } from "../screens/QuizScreen";
import { QuizSettingsScreen } from "../screens/QuizSettingsScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none">
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Details" component={DetailsScreen} />
    <Screen name="Quiz" component={QuizScreen} />
    <Screen name="QuizSettings" component={QuizSettingsScreen} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);
