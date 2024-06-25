import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';

function Ledger({navigation}: any) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>Ledger</Text>
    </SafeAreaView>
  );
}

export default Ledger;
