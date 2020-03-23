import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../config';

export default class Header extends Component {
  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      styleRightSecond,
      title,
      subTitle,
      onPressLeft,
      onPressRight,
      onPressRightSecond,
    } = this.props;

    return (
      <View
        style={[
          styles.contain,
          {
            backgroundColor: global.darkMode
              ? COLORS.darkModeColor
              : COLORS.mainColor,
          },
        ]}>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={[styles.contentLeft, styleLeft]}
            onPress={onPressLeft}>
            {this.props.renderLeft()}
          </TouchableOpacity>
        </View>
        <View style={[styles.contentCenter, styleCenter]}>
          <Text style={styles.title}>{title}</Text>
          {subTitle != '' && <Text>{subTitle}</Text>}
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            style={[styles.contentRightSecond, styleRightSecond]}
            onPress={onPressRightSecond}>
            {this.props.renderRightSecond()}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentRight, styleRight]}
            onPress={onPressRight}>
            {this.props.renderRight()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: 'Title',
  subTitle: '',
  barStyle: 'default',
};

styles = StyleSheet.create({
  contain: {
    height: 45,
    flexDirection: 'row',
  },
  contentLeft: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    width: 60,
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 20},
  contentCenter: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  contentRightSecond: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    height: '100%',
  },
  right: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
