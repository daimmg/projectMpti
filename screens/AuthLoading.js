import React, { Component } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import User from '../config/User';
import AsyncStorage from '@react-native-community/async-storage';
import { Ip } from '../config/Ip';

export default class AuthLoading extends Component {

  constructor(props) {
    super(props);
    this.state = {
        notif: 0,
    };
}

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
    fetch(`http://${Ip}:3000/jumlahNotif`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (user) {
          let data = JSON.parse(user);
          User.id_satpam = data.id_satpam;
          User.nama = data.nama;
          User.username = data.username;
          User.password = data.password;
          User.email = data.email;
          User.foto = data.foto;
          User.notif = responseJson;
          this.props.navigation.navigate('Tab');
        } else {
          this.props.navigation.navigate('Login');
        }
        //alert(responseJson);

      })
      .catch(error => alert(error))

      //console.log(this.state.notif)


    
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}