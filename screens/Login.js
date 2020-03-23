import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../config';

import axios from 'axios';
const serverURL = 'https://agaoglutalha.me/api2';
const http = axios.create({
  timeout: 1000,
  baseURL: serverURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;

export default class Login extends React.Component {
  state = {
    loading: false,
    email: 'agaoglutalha@gmail.com',
    password: '123',
    emailFocus: false,
    passwordFocus: false,
    secureEntry: true,
  };

  login = async () => {
    await http
      .post('/login', {email: this.state.email, password: this.state.password})
      .then(Response => this.response(Response.data))
      .catch(error => console.warn('error', error));
  };

  response = async data => {
    console.warn('response', data);
    if (data.status == 'successful') {
      global.token = data.token;
      await AsyncStorage.setItem('token', data.token);
      this.props.navigation.navigate('App');
    } else {
      alert('wrong');
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: global.darkMode
            ? COLORS.darkModeColor
            : COLORS.mainColor,
        }}>
        <View style={{justifyContent: 'center', alignSelf: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 40,
              textAlign: 'center',
              marginBottom: 10,
            }}>
            {' '}
            LOGIN{' '}
          </Text>
          <View
            style={{
              borderRadius: 50 / 2,
              justifyContent: 'center',
              padding: 5,
              margin: 5,
              width: (width * 3) / 4,
              height: 50,
              backgroundColor: 'white',
            }}
            onFocus={() => this.setState({emailFocus: true})}
            onBlur={() => this.setState({emailFocus: false})}>
            {/* {this.state.email != '' ? (
              <Text
                style={{
                  marginLeft: 10,
                  paddingTop: 5,
                  fontSize: 10,
                }}>
                Phone number, email or email
              </Text>
            ) : null} */}
            <TextInput
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
              placeholder={'email'}
            />
          </View>
          <View
            style={{
              borderRadius: 50 / 2,
              justifyContent: 'space-between',
              width: (width * 3) / 4,
              height: 50,
              alignItems: 'center',
              flexDirection: 'row',
              padding: 5,
              margin: 5,
              backgroundColor: 'white',
            }}
            onFocus={() => this.setState({passwordFocus: true})}
            onBlur={() => this.setState({passwordFocus: false})}>
            <View style={{flex: 3}}>
              {/* {this.state.password != '' ? (
                <Text
                  style={{
                    marginLeft: 10,
                    paddingTop: 5,
                    fontSize: 10,
                  }}>
                  Password
                </Text>
              ) : null} */}
              <TextInput
                secureTextEntry={this.state.secureEntry}
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                style={{justifyContent: 'flex-start'}}
                placeholder={'Password'}
              />
            </View>
            {this.state.password != '' ? (
              <TouchableOpacity
                onPress={() =>
                  this.setState({secureEntry: !this.state.secureEntry})
                }
                style={{justifyContent: 'flex-end', flex: 1}}>
                <Text
                  style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: 5,
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  {this.state.secureEntry ? 'Show' : 'Hide'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              margin: 5,
              marginTop: 10,
              borderRadius: 3,
              borderColor: 'black',
              borderWidth: 1,
              backgroundColor: 'white',
              borderRadius: 20,
            }}
            onPress={() => this.login()}>
            <Text style={{fontSize: 15}}>Log In</Text>
            {this.state.loading ? (
              <ActivityIndicator style={{marginLeft: 10}} size="small" />
            ) : null}
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 10,

              borderBottomWidth: 1,
            }}
          />
          <TouchableOpacity style={{marginVertical: 10}}>
            <Text style={{textAlign: 'center'}}>Forgot Password?</Text>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}
              style={{marginHorizontal: 5}}>
              <Text>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
