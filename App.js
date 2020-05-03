import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import User from './config/User';

import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import AuthLoading from './screens/AuthLoading';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator({
  Home: Home,
});



const ProfilStack = createStackNavigator({
  Profile: Profile,
});



//seting tab
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }


  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='md-home' color={tintColor} />;
    },
  };
};



ProfilStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Profil',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      return <Icon size={24} name='ios-contact' color={tintColor} />;
    }
  };
};

const Tab = createMaterialBottomTabNavigator(
  {
    HomeStack: HomeStack,
    ProfilStack: ProfilStack,
  }, {

  initialRouteName: 'HomeStack',
  activeColor: '#ff4500',
  inactiveColor: '#000000',
  resetOnBlur: true,
  shifting: true,
  labeled: true,
  barStyle: { backgroundColor: '#fff', paddingBottom: 10 }
})



export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      Login: Login,
      Tab: Tab
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);