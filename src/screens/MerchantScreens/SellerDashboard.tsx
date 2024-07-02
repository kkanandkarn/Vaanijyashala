import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../../assets';
import {fonts} from '../../constant';
import Header from './Header';
import {useDispatch} from 'react-redux';
import {resetFormData} from '../../store/formSlice';

function SellerDashboard({navigation}: any) {
  const [username, setUsername] = useState('Anand Kumar Karn');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetFormData());
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={{width: '100%'}}>
        <View style={styles.container}>
          <Image source={images.User1} style={styles.userImage} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Notifications');
            }}>
            <Image
              source={images.Notification}
              style={styles.notificationIcon}
            />
            <View style={styles.notificationContainer}>
              <Text style={styles.notificationCount}>10</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.usercontainer}>
          <Text style={styles.username}>
            {username.length > 20
              ? `Hi, ${username.substring(0, 20)}...`
              : `Hi, ${username}!`}
          </Text>
          <View style={styles.uniqueIdContainer}>
            <Text style={styles.uniqueId}>VSM1001</Text>
          </View>
        </View>
        <Text style={styles.headLine}>Let's earn more.</Text>
        <View style={styles.infoContainer}>
          <View style={styles.imageBackgroundWrapper}>
            <ImageBackground
              source={images.Dashboard_rectangle}
              style={styles.dashboardInfo}>
              <View style={styles.infoContainer1}>
                <Text style={styles.totalIncomeText}>Your Total Income is</Text>
                <Text style={styles.totalIncomeAmount}>&#x20B9; 15,200</Text>
                <View style={styles.todayIncomeContainer}>
                  <Text style={styles.todayIncomeText}>
                    Today's Income: &#x20B9; 2,500
                  </Text>
                </View>
              </View>
              <View style={styles.infoContainer2}>
                <View>
                  <Text style={styles.ASProductText}>Active Products</Text>
                  <Text style={styles.ASProductAmount}>14</Text>
                </View>
                <View>
                  <Text style={styles.ASProductText}>Sold Products</Text>
                  <Text style={styles.ASProductAmount}>6</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <TouchableOpacity
            style={styles.plusContainer}
            onPress={() => navigation.navigate('DashboardModal')}>
            <Text style={styles.plusIcon}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.totalProductsContainer}
          onPress={() => navigation.navigate('ProductHistory')}>
          <Text style={styles.totalProductsHeading}>Total Products</Text>
          <Text style={styles.totalProductsText}>No. of Products Added.</Text>
          <View style={styles.totalProductPress}>
            <Text style={styles.totalProductsAmount}>20</Text>
            <Image
              source={images.White_Forward_Arrow}
              style={styles.forwardArrow}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  notificationIcon: {
    height: 30,
    width: 30,
    marginTop: 5,
  },
  notificationContainer: {
    position: 'absolute',
    top: 0,
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
  usercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  username: {
    color: '#E65629',
    fontSize: 18,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  uniqueIdContainer: {
    backgroundColor: '#E65629',
    width: 'auto',
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    includeFontPadding: false,
    paddingVertical: 0,
  },
  uniqueId: {
    fontSize: 18,
    paddingTop: 3,
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
  },
  headLine: {
    paddingHorizontal: 20,
    fontSize: 15,
    color: 'gray',
    fontFamily: fonts.POPPINS_REGULAR,
  },
  infoContainer: {
    width: 400,
    height: 450,
    alignSelf: 'center',
    padding: 10,
    marginTop: 25,
  },
  imageBackgroundWrapper: {
    borderRadius: 18,
    overflow: 'hidden',
    width: '100%',
    height: '85%',
  },
  dashboardInfo: {
    width: '100%',
    height: '100%',
  },
  infoContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingVertical: 30,
    borderBottomColor: 'white',
    width: '90%',
    borderBottomWidth: 2,
  },
  totalIncomeText: {
    fontSize: 22,
    color: 'white',
    fontFamily: fonts.POPPINS_BOLD,
  },
  totalIncomeAmount: {
    fontSize: 28,
    color: '#E65629',
    fontFamily: fonts.POPPINS_BOLD,
    marginTop: 10,
  },
  todayIncomeContainer: {
    backgroundColor: '#2B2A2D',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    borderRadius: 18,
    marginTop: 10,
  },
  todayIncomeText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingTop: 2,
  },
  infoContainer2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  ASProductText: {
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 18,
  },
  ASProductAmount: {
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
    textAlign: 'center',
  },
  plusContainer: {
    position: 'absolute',
    top: 335,
    alignSelf: 'center',
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E65629',
    borderColor: 'white',
    borderWidth: 2,
  },
  plusIcon: {
    color: 'white',
    fontSize: 40,
    marginBottom: 5,
  },
  totalProductsContainer: {
    alignSelf: 'center',
    backgroundColor: '#E65629',
    width: '90%',
    height: 150,
    borderRadius: 30,
    padding: 25,
  },
  totalProductsHeading: {
    color: 'white',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 24,
  },
  totalProductsText: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  totalProductsAmount: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 22,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  forwardArrow: {
    height: 35,
    width: 35,
    alignSelf: 'flex-end',
  },
  totalProductPress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SellerDashboard;
