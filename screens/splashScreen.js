import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../config';
import AsyncStorage from '@react-native-community/async-storage';

export default class splashScreen extends Component {
  componentDidMount = async () => {
    let token = await AsyncStorage.getItem('token');
    let darkMode = await AsyncStorage.getItem('darkMode');
    let pin = await AsyncStorage.getItem('pin');
    if (token != null) {
      global.token = token;
      pin == null
        ? this.props.navigation.navigate('App')
        : this.props.navigation.navigate('pinSecurity');
    } else {
      this.props.navigation.navigate('Login');
    }
    if (darkMode != null) {
      global.darkMode = JSON.parse(darkMode);
    } else {
      global.darkMode = false;
    }
    if (pin != null) {
      global.isPin = true;
      global.pin = pin;
    } else {
      global.isPin = false;
      global.pin = '';
    }
    // alert(global.darkMode ? COLORS.darkModeColor : COLORS.mainColor);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: global.darkMode
            ? COLORS.darkModeColor
            : COLORS.mainColor,
          justifyContent: 'center',
        }}>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            Password Manager
          </Text>
          <ActivityIndicator style={{margin: 64}} color="white" size="large" />
        </View>
      </View>
    );
  }
}
