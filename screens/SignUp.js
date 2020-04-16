import React from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../config';

const width = Dimensions.get('window').width;

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

export default class SignUp extends React.Component {
  state = {
    loading: false,
    username: '',
    password: '',
    email: '',
    emailFocus: false,
    usernameFocus: false,
    passwordFocus: false,
    secureEntry: true,
  };

  signIn = async () => {
    await http
      .post('/signIn', {email: this.state.email, password: this.state.password})
      .then(Response => this.response(Response.data))
      .catch(error => console.warn('error', error));
  };

  response = data => {
    console.warn('Response', data);
    if (data.status == 'created') {
      global.token = data.token;
      global.id = data.id;
      this.props.navigation.navigate('Home');
    } else if (data.status == 'exist') {
      alert('This email is already in use');
    } else {
      alert('Try again');
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: global.darkMode
            ? COLORS.darkModeSecondColor
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
            SIGN UP{' '}
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
            {/* {this.state.username != '' ? (
              <Text
                style={{
                  marginLeft: 10,
                  paddingTop: 5,
                  fontSize: 10,
                }}>
                Phone number, email or username
              </Text>
            ) : null} */}
            <TextInput
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
              placeholder={'Email'}
            />
          </View>
          {/* <View
            style={{
              borderRadius: 50 / 2,
              justifyContent: 'center',
              padding: 5,
              margin: 5,
              width: (width * 3) / 4,
              height: 50,
              backgroundColor: 'white',
            }}
            onFocus={() => this.setState({usernameFocus: true})}
            onBlur={() => this.setState({usernameFocus: false})}>
            {this.state.username != '' ? (
              <Text
                style={{
                  marginLeft: 10,
                  paddingTop: 5,
                  fontSize: 10,
                }}>
                Phone number, email or username
              </Text>
            ) : null}
            <TextInput
              onChangeText={text => this.setState({username: text})}
              value={this.state.username}
              placeholder={'Phone number, email or username'}
            />
          </View> */}
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
            onPress={() => this.signIn()}>
            <Text style={{fontSize: 15}}>Sign Up</Text>
            {this.state.loading ? (
              <ActivityIndicator style={{marginLeft: 10}} size="small" />
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
