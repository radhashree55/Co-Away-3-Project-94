import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Icon } from "react-native-elements";
import { AppTabNavigator } from "./AppTabNavigator";
import CustomSideBarMenu from "./CustomSideBarMenu";
import RegisterScreen from "../screens/RegisterScreen";
import StatusScreen from "../screens/StatusScreen";
import SettingsScreen from "../screens/SettingsScreen";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: AppTabNavigator,
      navigationOptions: {
        drawerIcon: <Icon name="home" type="fontawesome5" />,
      },
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: {
        drawerIcon: <Icon name="medkit" type="font-awesome" />,
        drawerLabel: "Register",
      },
    },
    Status: {
      screen: StatusScreen,
      navigationOptions: {
        drawerIcon: <Icon name="heartbeat" type="font-awesome" />,
        drawerLabel: "Status",
      },
    },
    Setting: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerIcon: <Icon name="settings" type="fontawesome5" />,
        drawerLabel: "Settings",
      },
    },
  },
  {
    contentComponent: CustomSideBarMenu,
  },
  {
    initialRouteName: "Home",
  }
);
