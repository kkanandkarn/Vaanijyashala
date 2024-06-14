/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen';

import HomeScreen from './src/screens/HomeScreen';
import SignUp from './src/screens/SignUp';

import OtpScreen from './src/screens/OtpScreen';
import GeneratePassword from './src/screens/GeneratePassword';
import {Provider} from 'react-redux';
import store from './src/store';
import {ToastComponent} from './components/ToastComponent';
import LogIn from './src/screens/LogIn';
import ForgetPassword from './src/screens/ForgetPassword';
import RegisterSuccessfull from './src/screens/RegisterSuccessfull';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
          <Stack.Screen name="OTP" component={OtpScreen} />
          <Stack.Screen name="GeneratePassword" component={GeneratePassword} />
          <Stack.Screen name="RegisterSuccessfull" component={RegisterSuccessfull} />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastComponent />
    </Provider>
  );
}

export default App;
