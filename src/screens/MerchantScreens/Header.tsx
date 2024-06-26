import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '../../../assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../constants';
import {fonts} from '../../constant';

function Header({header}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <Image source={images.Notification} style={styles.notificationIcon} />
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationCount}>10</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  notificationIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  notificationContainer: {
    position: 'absolute',
    top: 4,
    right: 8,
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
    color: colors.primaryColor,
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 18,
  },
});

export default Header;
