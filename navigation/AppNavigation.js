//AppNavigation.js
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Account from '../screens/account';
import Settings from '../screens/settings';

const AppNavigation = createStackNavigator(
  {
    Home: {screen: Home},
    Account: {screen: Account},
    Settings: {screen: Settings},
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

export default AppNavigation;
