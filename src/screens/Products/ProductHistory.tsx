import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';

import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import All from './All';
import Active from './Active';
import Sold from './Sold';
import {fonts} from '../../constant';
import Header from './Header';
import colors from '../../../constants';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';

const ProductHistory = ({navigation}: any) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  useAndroidBackButton(() => {
    navigation.goBack();
  });

  const handleSegmentChange = (index: number) => {
    setSelectedIndex(index);
    switch (index) {
      case 0:
        navigation.navigate('All');
        break;
      case 1:
        navigation.navigate('Active');
        break;
      case 2:
        navigation.navigate('Sold');
        break;
      default:
        break;
    }
  };

  const Stack = createNativeStackNavigator();

  const renderScreen = () => {
    return (
      <View style={{flex: 1}}>
        <Stack.Navigator>
          <Stack.Screen
            name="All"
            component={All}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Active"
            component={Active}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Sold"
            component={Sold}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 10}}>
        <Header navigation={navigation} />
      </View>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />
      <View style={styles.segmentView}>
        <SegmentedControl
          fontStyle={styles.segmentFontStyle}
          activeFontStyle={styles.segmentActiveFontStyle}
          tintColor={colors.primaryColor}
          values={['All', 'Active', 'Sold']}
          selectedIndex={selectedIndex}
          onChange={event =>
            handleSegmentChange(event.nativeEvent.selectedSegmentIndex)
          }
          style={styles.segmentContainer}
        />
      </View>
      {renderScreen()}
    </SafeAreaView>
  );
};

export default ProductHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },

  segmentView: {
    marginTop: 10,
    marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  segmentFontStyle: {
    color: colors.primaryColor,
    fontSize: 14,
    fontFamily: fonts.POPPINS_BOLD,
  },
  segmentActiveFontStyle: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  segmentContainer: {
    width: '100%',
    height: 44,
    borderColor: 'green',
    borderRadius: 8,
  },
});
