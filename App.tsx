/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';

import SplashScreenS from 'react-native-splash-screen';

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
import ProfileForm from './src/screens/ProfileForm';
import MerchantProfileForm from './src/screens/MerchantProfileForm';
import Dashboard from './src/screens/Dashboard';
import SellerDashboard from './src/screens/MerchantScreens/SellerDashboard';
import BottomStack from './src/screens/BottomStack/BottomStack';
import SplashScreen from './src/screens/SplashScreen';
import DashboardModal from './components/DashboardModal';
import ProductHistory from './src/screens/Products/ProductHistory';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreenS.hide();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const OnBoardingStack = createNativeStackNavigator();
  const OnBoarding = () => (
    <OnBoardingStack.Navigator screenOptions={{headerShown: false}}>
      <OnBoardingStack.Screen name="HomeScreen" component={HomeScreen} />
      <OnBoardingStack.Screen name="SignUp" component={SignUp} />
      <OnBoardingStack.Screen name="LogIn" component={LogIn} />
      <OnBoardingStack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <OnBoardingStack.Screen name="OTP" component={OtpScreen} />
      <OnBoardingStack.Screen
        name="GeneratePassword"
        component={GeneratePassword}
      />
      <OnBoardingStack.Screen
        name="RegisterSuccessfull"
        component={RegisterSuccessfull}
      />
      <OnBoardingStack.Screen name="ProfileForm" component={ProfileForm} />
      <OnBoardingStack.Screen
        name="MerchantProfileForm"
        component={MerchantProfileForm}
      />
    </OnBoardingStack.Navigator>
  );
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Group>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="BottomStack" component={BottomStack} />
            <Stack.Screen name="ProductHistory" component={ProductHistory} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen
              name="DashboardModal"
              component={DashboardModal}
              options={{
                animation: 'slide_from_bottom',
                headerShown: false,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <ToastComponent />
    </Provider>
  );
}

export default App;
