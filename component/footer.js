import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-eva-icons';
import {COLORS} from '../config';

export default class footer extends Component {
  firstMode = selected => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => this.props.onPress('Home')}>
          <Icon
            animation={'shake'}
            name={'home'}
            width={36}
            height={36}
            fill={
              this.props.selected == 'home'
                ? global.darkMode
                  ? COLORS.darkModeColor
                  : COLORS.mainColor
                : 'grey'
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.onPress('Settings')}>
          <Icon
            name={'settings'}
            width={36}
            height={36}
            fill={
              this.props.selected == 'settings'
                ? global.darkMode
                  ? COLORS.darkModeColor
                  : COLORS.mainColor
                : 'grey'
            }
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <View
        style={{
          height: 50,
          borderTopWidth: 0.5,
        }}>
        {this.props.mode == 1 ? this.firstMode(this.props.selected) : null}
      </View>
    );
  }
}
