import {createStackNavigator} from 'react-navigation-stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import SplashScreen from '../screens/splashScreen';
import pinSecurity from '../screens/pinSecurity';

const AuthNavigation = createStackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    pinSecurity: {screen: pinSecurity},
    Login: {screen: Login},
    SignUp: {screen: SignUp},
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  },
);

export default AuthNavigation;
