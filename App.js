import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import User from './config/User';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from './screens/Home';
import Notif2 from './screens/Notif2';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import AuthLoading from './screens/AuthLoading';
import Notifikasi from './screens/Notifikasi';
import Icon from 'react-native-vector-icons/Ionicons';
import Keterangan from './screens/Keterangan';
import Camera from './screens/Camera';
import Validasi from './screens/Validasi';

const HomeStack = createStackNavigator({
  Home: Home,
  Camera: Camera,
  Validasi: Validasi
});



const ProfilStack = createStackNavigator({
  Profile: Profile,
});

const NotifikasiStack = createStackNavigator({
  Notifikasi: Notifikasi,
  Notif2: Notif2,

});

const KeteranganStack = createStackNavigator({
  Keterangan: Keterangan

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

NotifikasiStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarBadge: 4,
    tabBarLabel: 'Notifikasi',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <Icon size={24} name='ios-notifications' color={tintColor} />;
    }
  };
};

KeteranganStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Keluar Masuk',
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      return <Icon2 size={24} name='currency-eth' color={tintColor} />;
    }
  };
};

const Tab = createMaterialBottomTabNavigator(
  {
    HomeStack: HomeStack,
    NotifikasiStack: NotifikasiStack,
    KeteranganStack: KeteranganStack,
    ProfilStack: ProfilStack
  }, {

  initialRouteName: 'HomeStack',
  activeColor: '#2C5364',
  inactiveColor: '#dcdcdc',
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
      Register: Register,
      Tab: Tab
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);