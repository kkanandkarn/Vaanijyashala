import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {fonts} from '../../constant';
import colors from '../../../constants';

function Header({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={images.Back_Arrow} style={styles.backArrow} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Products</Text>

      <Image source={images.Notification} style={styles.notificationIcon} />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationCount}>10</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backArrow: {
    height: 15,
    width: 15,
  },
  notificationIcon: {
    height: 30,
    width: 30,
  },
  notificationContainer: {
    position: 'absolute',
    top: 3,
    right: -10,
    height: 25,
    width: 25,
    backgroundColor: '#E65629',
    padding: 5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10,
  },
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    fontSize: 18,
  },
});

export default Header;
