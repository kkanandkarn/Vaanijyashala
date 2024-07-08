import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../../constant';
import colors from '../../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../../assets';
import data from '../../../data';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';

function MerchantProfile({navigation, route}: any) {
  const [name, setName] = useState('Anand Kumar Karn');
  const [email, setEmail] = useState('anand@gmail.com');
  const [date, setDate] = useState('12/12/1998');
  const [genderName, setGenderName] = useState('Male');
  const [mobileNumber, setMobileNumber] = useState('9876968578');
  const [altMobile, setAltMobile] = useState(null);
  const [addressLine, setAddressLine] = useState('Madhubani');
  const [stateName, setStateName] = useState<string | null>('Bihar');
  const [districtName, setDistrictName] = useState<string | null>('Madhubani');
  const [shopCategoryName, setShopCategoryName] = useState<string | null>(
    'Electronics',
  );
  const [pinCode, setPinCode] = useState(847214);
  const [gst, setGst] = useState('');
  const [completedPer, setCompletedPer] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        padding: 15,
        height: '100%',
      }}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.Back_Arrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>Profile Details</Text>
        </View>
      </View>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        <Image source={images.User1} style={styles.userImage} />
        {/* <Text style={styles.username}>{name}</Text> */}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('OnBoarding', {
                screen: 'MerchantProfileForm',
                params: {method: 'EDIT'},
              })
            }>
            <Text style={styles.buttonText}>Edit</Text>
            <Image source={images.Edit_Icon} style={{height: 20, width: 20}} />
          </TouchableOpacity>
        </View>

        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>Name: </Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Seller ID: </Text>
            <Text style={[styles.text, {color: colors.primaryColor}]}>
              VSM1001
            </Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Gender: </Text>
            <Text style={styles.text}>{genderName}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Date of Birth: </Text>
            <Text style={styles.text}>{date}</Text>
          </View>
        </View>
        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>Mobile Number: </Text>
            <Text style={styles.text}>{mobileNumber}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Alt. Mobile No.: </Text>
            <Text style={styles.text}>{altMobile}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Email: </Text>
            <Text style={styles.text}>{email}</Text>
          </View>
        </View>
        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>Shop Category: </Text>
            <Text style={styles.text}>{shopCategoryName}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>City/Village: </Text>
            <Text style={styles.text}>{addressLine}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>District: </Text>
            <Text style={styles.text}>{districtName}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>State: </Text>
            <Text style={styles.text}>{stateName}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>PIN Code: </Text>
            <Text style={styles.text}>{pinCode}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>GST No: </Text>
            <Text style={styles.text}>{gst}</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
  userImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'gray',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingBottom: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
  },
  button: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
    color: 'black',
    marginTop: 2,
  },
  PesonalDetails: {
    paddingVertical: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  groupData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: '#5F5F61',
    fontFamily: fonts.POPPINS_REGULAR,
    marginVertical: 5,
  },
  completedPerText: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
});

export default MerchantProfile;
