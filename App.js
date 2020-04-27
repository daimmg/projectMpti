import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Haloo daim ini baru gua perbarui</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
