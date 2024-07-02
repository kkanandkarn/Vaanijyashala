import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../../assets';
import {fonts} from '../../constant';
import colors from '../../../constants';

function Profile({navigation}: any) {
  const handleLogOut = () => {
    AsyncStorage.removeItem('login');
    navigation.navigate('OnBoarding', {screen: 'LogIn'});
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.parent}>
        <View style={styles.child}>
          <Image
            source={images.Profile_Background}
            style={styles.backgroundImg}
          />
        </View>
        <Image source={images.User1} style={styles.userImage} />
        <Text style={styles.username}>Anand Kumar Karn</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.LinkContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MerchantProfile')}
            style={[
              styles.Links,
              {borderBottomColor: '#EB7854', borderBottomWidth: 1},
            ]}>
            <Text style={styles.LinksText}>Profile Details</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </TouchableOpacity>
          <View
            style={[
              styles.Links,
              {borderBottomColor: '#EB7854', borderBottomWidth: 1},
            ]}>
            <Text style={styles.LinksText}>Become a Partner</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </View>
          <TouchableOpacity
            style={styles.Links}
            onPress={() => navigation.navigate('Notifications')}>
            <Text style={styles.LinksText}>Notifications</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </TouchableOpacity>
        </View>

        <View style={styles.LinkContainer}>
          <View
            style={[
              styles.Links,
              {borderBottomColor: '#EB7854', borderBottomWidth: 1},
            ]}>
            <Text style={styles.LinksText}>Setting</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </View>
          <View
            style={[
              styles.Links,
              {borderBottomColor: '#EB7854', borderBottomWidth: 1},
            ]}>
            <Text style={styles.LinksText}>Privacy Policy</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </View>
          <View style={styles.Links}>
            <Text style={styles.LinksText}>Help & Support</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </View>
        </View>

        <View style={styles.LinkContainer}>
          <View style={styles.Links}>
            <Text style={styles.LinksText}>Refer & Earn</Text>
            <Image source={images.Right_Half_Arrow} style={styles.rightArrow} />
          </View>
        </View>
      </View>
      <Text style={styles.version}>Version: v1.1.2</Text>
      <TouchableOpacity onPress={handleLogOut} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parent: {
    height: 250,
    objectFit: 'cover',
  },
  child: {
    width: '100%',
    height: '65%',
  },
  backgroundImg: {
    height: '100%',
    width: '100%',
  },
  userImage: {
    height: 90,
    width: 90,
    borderRadius: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: 110,
  },
  username: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'gray',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
  },
  container: {
    marginTop: 20,
  },
  LinkContainer: {
    backgroundColor: '#FADDD4',
    borderColor: '#EB7854',
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    width: '90%',
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  Links: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  LinksText: {
    fontSize: 16,
    fontFamily: fonts.POPPINS_REGULAR,
    color: 'black',
  },
  rightArrow: {
    height: 25,
    width: 25,
  },
  version: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.primaryColor,
    marginTop: 20,
    fontFamily: fonts.POPPINS_BOLD,
  },
  logoutButton: {
    width: '90%',
    height: 50,
    borderColor: colors.primaryColor,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 8,
  },
  logoutText: {
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    fontSize: 16,
  },
});

export default Profile;
