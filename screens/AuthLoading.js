import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../config/User';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoading extends Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  static navigationOptions = {
    header: null
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('user');


    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //this.props.navigation.navigate(user ? 'LoginStack' : 'Tab');
    if (user) {
      
      this.props.navigation.navigate('Tab');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}