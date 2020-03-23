import React, {Component} from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../component/header2';
import Footer from '../component/footer';
import {COLORS} from '../config';

import Modal from 'react-native-modal';
import {TextInput} from 'react-native-gesture-handler';

export default class settings extends Component {
  state = {
    darkMode: false,
    isPin: false,
    option3: false,
    option4: false,
    pinModal: false,
    pin: '',
  };

  componentDidMount = () => {
    this.setState({darkMode: global.darkMode});
    this.setState({isPin: global.isPin});
    this.setState({pin: global.pin});
  };

  pinFunction = async () => {
    await AsyncStorage.setItem('pin', this.state.pin);
    this.setState({pinModal: false});
    this.setState({isPin: true});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'Settings'}
          renderLeft={() => {
            return (
              <Icon name={'chevron-left'} width={36} height={36} fill="white" />
            );
          }}
          onPressLeft={() => this.props.navigation.goBack()}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              marginHorizontal: 8,
              borderBottomWidth: 0.5,
              alignItems: 'center',
            }}>
            <Text>Dark Mode:</Text>
            <Switch
              onValueChange={async () => {
                this.setState({darkMode: !this.state.darkMode});
                await AsyncStorage.setItem(
                  'darkMode',
                  JSON.stringify(!this.state.darkMode),
                );
                global.darkMode = this.state.darkMode;
                BackHandler.exitApp();
              }}
              value={this.state.darkMode}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              marginHorizontal: 8,
              borderBottomWidth: 0.5,
              alignItems: 'center',
            }}>
            <Text>Pin Security:</Text>
            <Switch
              onValueChange={() => {
                this.state.isPin
                  ? Alert.alert(
                      'Do you want to remove pin?',
                      ':(',
                      [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            AsyncStorage.removeItem('pin');
                            this.setState({isPin: false});
                            this.setState({pin: ''});
                            global.isPin = false;
                            global.pin = '';
                          },
                        },
                      ],
                      {cancelable: false},
                    )
                  : this.setState({pinModal: true});
              }}
              value={this.state.isPin}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              marginHorizontal: 8,
              borderBottomWidth: 0.5,
              alignItems: 'center',
            }}>
            <Text>Option3:</Text>
            <Switch
              onValueChange={() =>
                this.setState({option3: !this.state.option3})
              }
              value={this.state.option3}
            />
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              padding: 8,
              marginHorizontal: 8,
              borderBottomWidth: 0.5,
              alignItems: 'center',
            }}>
            <Text>Log Out</Text>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Do you want to logout?',
                  ':(',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: () => {
                        AsyncStorage.clear();
                        this.props.navigation.navigate('Auth');
                      },
                    },
                  ],
                  {cancelable: false},
                )
              }
              style={{marginRight: 10}}>
              <Icon name={'log-out'} width={24} height={24} fill={'grey'} />
            </TouchableOpacity>
          </View>
        </View>
        <Footer
          mode={1}
          selected={'settings'}
          onPress={this.props.navigation.navigate}
        />
        <Modal isVisible={this.state.pinModal}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 16,
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text style={{textAlign: 'center', fontSize: 20, padding: 8}}>
              Pin
            </Text>
            <View style={{borderWidth: 0.5}}>
              <TextInput
                placeholder={'You will enter everytime you launch application.'}
                value={this.state.pin}
                onChangeText={e => this.setState({pin: e})}
                style={{textAlign: 'center'}}
              />
            </View>
            <TouchableOpacity
              onPress={() => this.pinFunction()}
              style={{
                backgroundColor: global.darkMode
                  ? COLORS.darkModeColor
                  : COLORS.mainColor,
                padding: 16,
                alignSelf: 'center',
                borderRadius: 20,
                margin: 20,
              }}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
