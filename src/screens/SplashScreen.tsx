import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function SplashScreen({navigation}: any) {
  const letsConnect = async () => {
    const auth = await AsyncStorage.getItem('login');
    if (auth) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomStack'}],
        }),
      );
      console.log('Auth available');
    } else {
      // navigation.navigate('OnBoarding');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'OnBoarding'}],
        }),
      );
    }
  };
  useEffect(() => {
    letsConnect();
  }, []);

  return <SafeAreaView></SafeAreaView>;
}

export default SplashScreen;
