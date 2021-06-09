import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import StatusScreen from "../screens/StatusScreen";
import DetailsScreen from "../screens/DetailsScreen";

export const AppStackNavigator = createStackNavigator(
  {
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Details: {
      screen: DetailsScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: "Status",
  }
);
