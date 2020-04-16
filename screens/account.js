import React, {Component} from 'react';
import {View, Text, TextInput, Alert, Clipboard, Switch} from 'react-native';
import Header from '../component/header2';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-eva-icons';
import {COLORS, networkError} from '../config';

import ModalDropdown from 'react-native-modal-dropdown';

import CryptoJS from 'react-native-crypto-js';

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

export default class profile extends Component {
  state = {
    folder: '',
    name: '',
    username: '',
    password: '',
    passwordEye: true,
    editable: false,
    customFolder: false,
    secondEncryption: false,
    secondPassword: '',
    wrongPin: false,
  };

  componentDidMount = async () => {
    let mode = await this.props.navigation.getParam('mode');
    if (mode != 1) {
      let data = await this.props.navigation.getParam('data');
      console.warn('data', data);
      this.setState({
        folder: data.folder,
        name: data.name,
        username: data.username,
        password: data.secondEncryption
          ? this.showPassword(data.password)
          : data.password,
        secondEncryption: data.secondEncryption,
        secondPassword: data.secondEncryption ? data.password : '',
      });
    } else {
      this.setState({editable: true});
    }
  };

  save = async () => {
    this.state.username != '' &&
    this.state.name != '' &&
    this.state.password != '' &&
    this.state.folder
      ? await http
          .post('/saveAccount', {
            token: global.token,
            username: this.state.username,
            accountName: this.state.name,
            password: this.state.secondEncryption
              ? this.state.secondPassword
              : this.state.password,
            folder: this.state.folder,
            secondEncryption: this.state.secondEncryption,
          })
          .then(Response =>
            Response.data.status == 'saved' ? this.response() : alert('Error'),
          )
          .catch(error => {
            networkError(error);
            console.warn('error', error);
          })
      : alert('All the boxes should be filled');
  };

  removeAccount = async () => {
    await http
      .post('/deleteAccount', {
        token: global.token,
        accountName: this.state.name,
      })
      .then(Response =>
        Response.data.status == 'deleted' ? this.response() : alert('Error'),
      )
      .catch(error => {
        networkError(error);
        console.warn('error', error);
      });
  };

  response = () => {
    alert('succesfully');
    this.props.navigation.navigate('Home');
  };

  generatePassword = () => {
    var length = 16,
      charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_?*',
      retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    this.setState({password: retVal});
  };

  encrypt = () => {
    if (global.pin != null) {
      this.setState({
        secondPassword: CryptoJS.AES.encrypt(
          this.state.password,
          global.pin,
        ).toString(),
        secondEncryption: true,
      });
    } else {
      alert('You need to set a pin.');
    }
  };

  undoEncrypt = () => {
    !this.state.wrongPin
      ? this.setState({secondEncryption: false})
      : alert("You don't know pin");
  };

  showPassword = data => {
    try {
      let bytes = CryptoJS.AES.decrypt(data, global.pin);
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      if (originalText == '') {
        alert('Wrong Pin');
        this.setState({wrongPin: true});
      }
      return originalText;
    } catch (error) {
      alert('Wrong Pin');
      this.setState({wrongPin: true});
      return '';
    }
  };

  render() {
    const props = this.props;
    return (
      <View style={{flex: 1}}>
        <Header
          title={
            this.props.navigation.getParam('mode') == 1
              ? 'Add Account'
              : 'Account Info'
          }
          renderLeft={() => {
            return (
              <Icon name={'chevron-left'} width={36} height={36} fill="white" />
            );
          }}
          onPressLeft={() => this.props.navigation.goBack()}
          renderRight={() => {
            return this.props.navigation.getParam('mode') != 1 ? (
              !this.state.editable ? (
                <Icon name={'edit-2'} width={24} height={24} fill="white" />
              ) : null
            ) : null;
          }}
          onPressRightSecond={() =>
            this.props.navigation.getParam('mode') != 1
              ? !this.state.editable
                ? Alert.alert(
                    'Do you want to remove this account?',
                    'This action cannot be undone.',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => this.removeAccount()},
                    ],
                    {cancelable: false},
                  )
                : null
              : null
          }
          renderRightSecond={() => {
            return this.props.navigation.getParam('mode') != 1 ? (
              !this.state.editable ? (
                <Icon name={'trash-2'} width={24} height={24} fill="white" />
              ) : null
            ) : null;
          }}
          onPressRight={() =>
            this.props.navigation.getParam('mode') != 1
              ? !this.state.editable
                ? this.setState({editable: true})
                : null
              : null
          }
        />
        <View
          style={{
            flex: 1,
            backgroundColor: global.darkMode
              ? COLORS.darkModeSecondColor
              : null,
          }}>
          <View
            style={{
              borderWidth: global.darkMode ? 0 : 0.5,
              borderColor: 'black',
              marginTop: 16,
              marginHorizontal: 8,
              padding: 8,
              backgroundColor: global.darkMode ? COLORS.darkModeColor3 : null,
              borderRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <Text style={{color: global.darkMode ? 'white' : null}}>
                Folder:
              </Text>
              {this.state.editable && !this.state.customFolder ? (
                <ModalDropdown
                  style={{
                    padding: 8,
                    borderWidth: 1,
                    alignSelf: 'center',
                    width: 'auto',
                    borderColor: global.darkMode ? 'white' : null,
                  }}
                  textStyle={{
                    fontSize: 15,
                    textAlign: 'center',
                    color: global.darkMode ? 'white' : null,
                  }}
                  dropdownTextStyle={{fontSize: 15, textAlign: 'center'}}
                  onSelect={item => {
                    this.props.navigation.getParam('folders').slice(1)[item] ==
                    'Custom'
                      ? this.setState({customFolder: true})
                      : this.setState({
                          folder: this.props.navigation
                            .getParam('folders')
                            .slice(1)[item],
                        });
                  }}
                  options={this.props.navigation.getParam('folders').slice(1)}
                />
              ) : (
                <TextInput
                  value={this.state.folder}
                  onChangeText={text => this.setState({folder: text})}
                  placeholder={'ex: Social'}
                  editable={this.state.customFolder}
                  style={{color: global.darkMode ? 'white' : null}}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <Text style={{color: global.darkMode ? 'white' : null}}>
                Platform:
              </Text>
              <TextInput
                value={this.state.name}
                onChangeText={text => this.setState({name: text})}
                placeholder={'ex: Twitter'}
                editable={this.state.editable}
                style={{color: global.darkMode ? 'white' : null}}
                placeholderTextColor={global.darkMode ? 'grey' : null}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: global.darkMode ? 'white' : null}}>
                  Username:
                </Text>
                <TextInput
                  value={this.state.username}
                  onChangeText={text => this.setState({username: text})}
                  placeholder={'ex: crayzboy'}
                  editable={this.state.editable}
                  style={{color: global.darkMode ? 'white' : null}}
                  placeholderTextColor={global.darkMode ? 'grey' : null}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(this.state.username);
                  alert('Copied');
                }}>
                <Icon
                  name={'clipboard'}
                  width={24}
                  height={24}
                  fill={global.darkMode ? 'white' : 'black'}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}>
                <Text style={{color: global.darkMode ? 'white' : null}}>
                  Password:
                </Text>
                <TextInput
                  value={this.state.password}
                  onChangeText={text => this.setState({password: text})}
                  placeholder={'not ex: 1234'}
                  editable={this.state.editable}
                  secureTextEntry={this.state.passwordEye}
                  style={{color: global.darkMode ? 'white' : null}}
                  placeholderTextColor={global.darkMode ? 'grey' : null}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                {this.state.editable ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.generatePassword();
                    }}>
                    <Icon
                      name={'refresh'}
                      width={24}
                      height={24}
                      fill={global.darkMode ? 'white' : 'black'}
                    />
                  </TouchableOpacity>
                ) : null}
                <TouchableOpacity
                  style={{marginHorizontal: 16}}
                  onPress={() => {
                    Clipboard.setString(this.state.password);
                    alert('Copied');
                  }}>
                  <Icon
                    name={'clipboard'}
                    width={24}
                    height={24}
                    fill={global.darkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({passwordEye: !this.state.passwordEye})
                  }>
                  <Icon
                    name={this.state.passwordEye ? 'eye' : 'eye-off'}
                    width={24}
                    height={24}
                    fill={global.darkMode ? 'white' : 'black'}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {this.state.editable ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                  justifyContent: 'space-between',
                }}>
                <Text style={{color: global.darkMode ? 'white' : null}}>
                  Second Encryption:
                </Text>
                <Switch
                  trackColor={{true: COLORS.darkModeOrange, false: 'grey'}}
                  onValueChange={() => {
                    !this.state.secondEncryption
                      ? Alert.alert(
                          'Do you want to encrypt password with your pin?',
                          "If you forget your pin somehow, you can't restore back.",
                          [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: () => this.encrypt()},
                          ],
                          {cancelable: false},
                        )
                      : this.undoEncrypt();
                  }}
                  value={this.state.secondEncryption}
                />
              </View>
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: 32,
            }}>
            <TouchableOpacity
              onPress={() =>
                this.state.editable
                  ? this.save()
                  : this.props.navigation.goBack()
              }
              style={{
                backgroundColor: global.darkMode
                  ? COLORS.darkModeColor3
                  : COLORS.mainColor,
                borderRadius: 20,
                padding: 16,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
                {this.state.editable ? 'Save' : 'OK'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
