import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import images from '../../../assets';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../../constants';
import {fonts} from '../../constant';
import {TouchableOpacity} from 'react-native-gesture-handler';

function Header({header, navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{header}</Text>
      </View>
      <TouchableOpacity
        style={{
          height: 40,
          width: 40,
          position: 'absolute',
          top: -32,
          right: 8,
        }}
        onPress={() => {
          navigation.navigate('Notifications');
        }}>
        <Image source={images.Notification} style={styles.notificationIcon} />
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationCount}>10</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
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
  },
  notificationContainer: {
    position: 'absolute',
    top: -6,
    left: 15,
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
