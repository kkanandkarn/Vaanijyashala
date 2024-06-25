import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({navigation}: any) {
  const handleLogOut = () => {
    AsyncStorage.removeItem('login');
    navigation.navigate('OnBoarding', {screen: 'LogIn'});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity onPress={handleLogOut}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Profile;
