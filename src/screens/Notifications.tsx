import React from 'react';
import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../constant';
import colors from '../../constants';
import images from '../../assets';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import data from '../../data';

function Notifications({navigation}: any) {
  const renderItem = ({item}: any) => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => item.screen && navigation.navigate(item.screen)}
          style={styles.notificationContainer}>
          <Text
            style={[
              styles.notification,
              {fontWeight: !item.isRead ? 'bold' : 'normal'},
            ]}>
            {item.notification}
          </Text>
          <Text
            style={[
              styles.notificationTime,
              {fontWeight: !item.isRead ? 'bold' : 'normal'},
            ]}>
            {item.dateTime}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', padding: 20}}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.Back_Arrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
      </View>

      {data.Notifications.length ? (
        <FlatList
          data={data.Notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>No data found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    fontSize: 18,
    textAlign: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    height: 15,
    width: 15,
  },
  notificationContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#EEEDED',
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
  },
  notification: {
    fontFamily: fonts.POPPINS_REGULAR,
    color: '#464545',
    fontSize: 14,
  },
  notificationTime: {
    fontFamily: fonts.POPPINS_REGULAR,
    color: '#444241',
    fontSize: 14,
  },
});

export default Notifications;
