import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import Header from '../component/header2';
import Footer from '../component/footer';

import {Icon} from 'react-native-eva-icons';

import AsyncStorage from '@react-native-community/async-storage';

import ModalDropdown from 'react-native-modal-dropdown';

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

export default class Home extends Component {
  componentDidMount = async () => {
    let data = await AsyncStorage.getItem('accounts');
    data != undefined ? this.responseOffline(JSON.parse(data)) : null;
    this.props.navigation.addListener('didFocus', () => {
      this.getAccounts();
    });
    this.getAccounts();
  };

  getAccounts = async () => {
    await http
      .post('/getData', {
        token: global.token,
      })
      .then(Response => this.response(Response.data))
      .catch(error => console.warn('error', error));
  };

  responseOffline = data => {
    let folders = ['All'];
    this.setState({data: data, selectedData: data});
    data.map(item =>
      folders.includes(item.folder) ? null : folders.push(item.folder),
    );
    this.setState({folders: folders});
  };

  response = async data => {
    console.warn('response', data);
    let folders = ['All'];
    if (data.status == 'succesfully') {
      this.setState({data: data.data, selectedData: data.data});
      await AsyncStorage.setItem('accounts', JSON.stringify(data.data));
      data.data.map(item =>
        folders.includes(item.folder) ? null : folders.push(item.folder),
      );
      this.setState({folders: folders});
    }
  };

  state = {
    data: [],
    folders: [],
    selectedData: [],
    selectedFolder: 'all',
  };

  selectedData = folderName => {
    this.setState({selectedFolder: folderName});
    if (folderName == 'All') {
      this.setState({selectedData: this.state.data});
    } else {
      let tempData = [];
      this.state.data.map(item =>
        item.folder == folderName ? tempData.push(item) : null,
      );
      this.setState({selectedData: tempData});
    }
  };

  renderIcon = data => {
    return (
      <Icon
        name={'question-mark-circle-outline'}
        width={48}
        height={48}
        fill="black"
      />
    );
  };

  renderAccount = data => {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 8,
          marginTop: 8,
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-around',
        }}>
        {this.renderIcon(data.name)}
        <Text style={{padding: 8}}>{data.name}</Text>
        <Text style={{padding: 8}}>{data.username}</Text>
        <TouchableOpacity
          onPress={() => {
            let folders = this.state.folders;
            folders.push('Custom');
            this.props.navigation.navigate('Account', {
              data: data,
              folders: folders,
            });
          }}>
          <Icon
            name={'chevron-right-outline'}
            width={48}
            height={48}
            fill="black"
          />
        </TouchableOpacity>
      </View>
    );
  };

  addAccount = async () => {
    await http
      .post('/saveAccount', {
        token: global.token,
        username: this.state.username,
        accountName: this.state.name,
        password: this.state.password,
        folder: this.state.folder,
      })
      .then(Response =>
        Response.data.status == 'saved' ? this.response() : alert('Error'),
      )
      .catch(error => console.warn('error', error));
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'Home'}
          renderRight={() => {
            return <Icon name={'plus'} width={24} height={24} fill="white" />;
          }}
          onPressRight={() => {
            let folders = this.state.folders;
            folders.push('Custom');
            this.props.navigation.navigate('Account', {
              mode: 1,
              folders: folders,
            });
          }}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 16,
              borderBottomWidth: 0.5,
            }}>
            <Text style={{alignSelf: 'center'}}>Folder:</Text>
            <ModalDropdown
              style={{
                padding: 8,
                borderWidth: 1,
                alignSelf: 'center',
                width: 100,
              }}
              defaultValue={'All'}
              textStyle={{fontSize: 15, textAlign: 'center'}}
              dropdownTextStyle={{fontSize: 15, textAlign: 'center'}}
              defaultIndex={0}
              onSelect={item => this.selectedData(this.state.folders[item])}
              options={this.state.folders}
            />
          </View>
          <FlatList
            data={this.state.selectedData}
            renderItem={({item}) => this.renderAccount(item)}
            keyExtractor={item => item.name}
          />
        </View>
        <Footer
          mode={1}
          selected={'home'}
          onPress={this.props.navigation.navigate}
        />
      </View>
    );
  }
}
