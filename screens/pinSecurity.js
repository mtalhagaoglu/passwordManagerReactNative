import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../config';

const width = Dimensions.get('window').width;

export default class pinSecurity extends Component {
  state = {
    pin: '',
    pinFocus: false,
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
            Pin{' '}
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
            onFocus={() => this.setState({pinFocus: true})}
            onBlur={() => this.setState({pinFocus: false})}>
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
              onChangeText={text => {
                global.pin == text
                  ? this.props.navigation.navigate('App')
                  : null;
                this.setState({pin: text});
              }}
              value={this.state.pin}
              placeholder={'Pin'}
              style={{textAlign: 'center'}}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              this.state.pin == global.pin
                ? this.props.navigation.navigate('App')
                : alert('Try Again')
            }
            style={{
              backgroundColor: 'white',
              margin: 20,
              padding: 20,
              borderRadius: 20,
              alignSelf: 'center',
            }}>
            <Text>Enter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
