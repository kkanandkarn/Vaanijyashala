import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputBox from '../../components/InputBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as Yup from 'yup';
import data, {State, District} from '../../data';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';
import {useAndroidBackButton} from '../../hooks/useAndroidButton';
import {CommonActions} from '@react-navigation/native';
import images from '../../assets';

const ProfileFormSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date: Yup.string().required('Date of birth is required'),
  gender: Yup.number().required('Gender is required'),
  addressLine: Yup.string().required('Address Line is required'),
  shopCategory: Yup.string().required('Shop Type is required'),
  state: Yup.number().required('State is required'),
  district: Yup.number().required('District is required'),
  pinCode: Yup.number().required('PIN Code is required'),
});

interface Errors {
  [key: string]: string | undefined;
}

function MerchantProfileForm({navigation, route}: any) {
  const formData = useSelector((state: RootState) => state.form);
  const [name, setName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState<number | null>(null);
  const [genderName, setGenderName] = useState('');
  const [mobileNumber, setMobileNumber] = useState(null);
  const [altMobile, setAltMobile] = useState(null);
  const [addressLine, setAddressLine] = useState('');
  const [errors, setErrors] = useState<Errors>({}); // Initialize errors with the correct type
  const [state, setState] = useState<number | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState<number | null>(null);
  const [districtName, setDistrictName] = useState<string | null>('');
  const [shopCategory, setShopCategory] = useState<number | null>(null);
  const [shopCategoryName, setShopCategoryName] = useState<string | null>('');
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [gst, setGst] = useState(null);
  const [completedPer, setCompletedPer] = useState(0);
  const [photo, setPhoto] = useState<any>(null);
  const [method, setMethod] = useState<string>('ADD');
  const methodRef = useRef(method);

  useEffect(() => {
    const {method} = route.params;
    setMethod(method);
    if (method === 'EDIT') {
      setName('Anand Kumar Karn');
      setEmail('anand@gmail.com');
      setDate('20/04/2002');
      setGender(1);
      setGenderName('Male');
      setAddressLine('Madhubani');
      setShopCategory(1);
      setShopCategoryName('Electronics');
      setState(4);
      const selectedDistricts =
        data.districts[state as keyof typeof data.districts] || [];
      setDistricts(selectedDistricts);
      setStateName('Bihar');
      setDistrict(13), setDistrictName('Aurangabad');
      setPinCode('847211');
    }
  }, [route.params]);
  useEffect(() => {
    methodRef.current = method;
  }, [method]);

  useAndroidBackButton(() => {
    if (methodRef.current === 'ADD') {
      console.log('method: => ', method);
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomStack'}],
        }),
      );
    } else {
      console.log('EDIT => ', method);
      navigation.goBack();
    }
  });

  const calculateProgress = () => {
    const totalFields = 13;
    let filledFields = 0;

    // Count filled fields
    if (photo) filledFields++;
    if (name) filledFields++;
    if (email) filledFields++;
    if (date) filledFields++;
    if (mobileNumber) filledFields++;
    if (altMobile) filledFields++;
    if (gender !== null) filledFields++;
    if (addressLine) filledFields++;
    if (state !== null) filledFields++;
    if (district !== null) filledFields++;
    if (shopCategory) filledFields++;
    if (pinCode) filledFields++;
    if (gst) filledFields++;

    // Calculate progress percentage
    const completedPercentage = (filledFields / totalFields) * 100;
    setCompletedPer(Math.round(completedPercentage));
  };

  useEffect(() => {
    calculateProgress();
  }, [
    photo,
    name,
    email,
    date,
    mobileNumber,
    altMobile,
    gender,
    addressLine,
    state,
    district,
    shopCategory,
    pinCode,
    gst,
  ]);

  const dropdownValues = [
    {id: 1, label: 'Male'},
    {id: 2, label: 'Female'},
    {id: 3, label: 'Others'},
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const getMinimumDate = () => {
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return minDate;
  };
  const getDefaultDate = () => {
    const today = new Date();
    const defaultDateValue = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return defaultDateValue;
  };

  const handleConfirm = (date: any) => {
    const formattedDate = date.toLocaleDateString('en-GB');
    setDate(formattedDate);
    hideDatePicker();
  };

  const handleDropdownChange = (option: any) => {
    setGender(option.id);
  };
  const handleShopCategory = (option: any) => {
    setShopCategory(option.id);
  };
  const handleStateChange = (option: State) => {
    setState(option.id);
    const selectedDistricts =
      data.districts[option.id as keyof typeof data.districts] || [];

    setDistricts(selectedDistricts);
  };

  const handleDistrictChange = (option: any) => {
    setDistrict(option.id);
  };

  const handleLocation = () => {
    Toast.show({
      type: 'info',
      text1: 'Geolocation is not available at this time.',
      text2: 'Please enter location manually.',
    });
  };

  const handleSubmit = async () => {
    try {
      await ProfileFormSchema.validate(
        {
          name,
          email,
          date,
          gender,
          addressLine,
          shopCategory,
          state,
          district,
          pinCode,
        },
        {abortEarly: false},
      );

      console.log('Form data1:', {
        name,
        email,
        date,
        gender,
        mobileNumber,
        addressLine,
        shopCategory,
        state,
        district,
        pinCode,
        gst,
      });
      Toast.show({
        type: 'success',
        text1: 'Profile details added',
      });
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomStack'}],
        }),
      );
    } catch (err: any) {
      const validationErrors: Errors = {};
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((error: Yup.ValidationError) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={() => {
          if (method === 'ADD') {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'BottomStack'}],
              }),
            );
          } else {
            navigation.goBack();
          }
        }}>
        <Image
          source={require('../../assets/img/back_arrow.png')}
          style={styles.backArrow}
        />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Seller Details</Text>
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Progress.Bar
          progress={completedPer / 100}
          width={null}
          height={8}
          color={'#F45F20'}
          unfilledColor={'white'}
          borderWidth={1}
          borderRadius={8}
          borderColor={'#F45F20'}
        />
        <Text style={styles.completedPerText}>{completedPer}% completed</Text>
      </View>
      <KeyboardAwareScrollView
        style={{width: '100%', alignSelf: 'flex-start', marginTop: 10}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={() =>
            navigation.navigate('UploadPhoto', {
              photoData: (photoUrl: any) => {
                setPhoto(photoUrl);
              },
            })
          }>
          {photo ? (
            <Image source={{uri: photo}} style={styles.capturedImage} />
          ) : (
            <Image
              source={require('../../assets/img/camera_icon.png')}
              style={styles.cameraImage}
            />
          )}
          {photo && (
            <Image
              source={require('../../assets/img/camera_icon.png')}
              style={styles.cameraEditIcon}
            />
          )}
        </TouchableOpacity>

        <InputBox
          inputTitle="Name"
          autoComplete="name"
          keyboardType="default"
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          error={!!errors.name}
          errorMessage={errors.name ? errors.name : ''}
          required={true}
          editable={false}
        />
        <InputBox
          inputTitle="Email"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          error={!!errors.email}
          errorMessage={errors.email ? errors.email : ''}
          required={true}
          editable={false}
        />

        <View style={styles.stateContainer}>
          <Text style={styles.stateHeader}>
            Date of Birth
            <Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={[
              styles.stateTouch,
              {borderColor: errors.date ? 'red' : '#ccc'},
            ]}>
            <Text style={{color: date ? '#000' : 'gray'}}>
              {date ? date : 'Choose Date of Birth'}
            </Text>
            <Image
              source={images.Dropdown_Arrow}
              style={styles.dropdownArrow}
            />
          </TouchableOpacity>
          {errors.date && (
            <Text style={{color: 'red'}}>Date of Birth is required</Text>
          )}
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={getDefaultDate()}
          maximumDate={getMinimumDate()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <View style={styles.stateContainer}>
          <Text style={styles.stateHeader}>
            Gender<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('GenderModal', {
                gender: gender,
                genderData: (gender: any) => {
                  setGender(gender.id);
                  setGenderName(gender.label);
                },
              })
            }
            style={[
              styles.stateTouch,
              {borderColor: errors.gender ? 'red' : '#ccc'},
            ]}>
            <Text style={{color: gender ? '#000' : 'gray'}}>
              {genderName ? genderName : 'Choose Gender'}
            </Text>
            <Image
              source={images.Dropdown_Arrow}
              style={styles.dropdownArrow}
            />
          </TouchableOpacity>
          {errors.gender && (
            <Text style={{color: 'red'}}>Gender is required</Text>
          )}
        </View>

        <InputBox
          inputTitle="Mobile No."
          autoComplete="off"
          keyboardType="number-pad"
          placeholder="Enter Mobile No."
          value={mobileNumber}
          onChangeText={setMobileNumber}
          error={!!errors.mobileNumber}
          errorMessage={errors.mobileNumber ? errors.mobileNumber : ''}
        />
        <InputBox
          inputTitle="Alt. Mobile No."
          autoComplete="off"
          keyboardType="number-pad"
          placeholder="Enter Alt. Mobile Number"
          value={altMobile}
          onChangeText={setAltMobile}
          error={!!errors.altMobile}
          errorMessage={errors.altMobile ? errors.altMobile : ''}
        />

        <InputBox
          inputTitle="Shop Locality"
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter Area, Street, Landmark"
          value={addressLine}
          onChangeText={setAddressLine}
          error={!!errors.addressLine}
          errorMessage={errors.addressLine ? errors.addressLine : ''}
          required={true}
        />

        <View style={styles.stateContainer}>
          <Text style={styles.stateHeader}>
            Shop Type<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ShopCategoryModal', {
                shopCategory: shopCategory,
                shopCategoryData: (shopCategory: any) => {
                  setShopCategory(shopCategory.id);
                  setShopCategoryName(shopCategory.label);
                },
              })
            }
            style={[
              styles.stateTouch,
              {borderColor: errors.state ? 'red' : '#ccc'},
            ]}>
            <Text style={{color: shopCategory ? '#000' : 'gray'}}>
              {shopCategoryName ? shopCategoryName : 'Choose Shop Type'}
            </Text>
            <Image
              source={images.Dropdown_Arrow}
              style={styles.dropdownArrow}
            />
          </TouchableOpacity>
          {errors.shopCategory && (
            <Text style={{color: 'red'}}>Shop Type is required</Text>
          )}
        </View>

        <View style={styles.stateContainer}>
          <Text style={styles.stateHeader}>
            State<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StateModal', {
                state: state,
                stateData: (state: any) => {
                  setState(state.id);
                  setStateName(state.label);
                  setDistrict(null);
                  setDistrictName(null);
                  const selectedDistricts =
                    data.districts[state.id as keyof typeof data.districts] ||
                    [];
                  setDistricts(selectedDistricts);
                },
              })
            }
            style={[
              styles.stateTouch,
              {borderColor: errors.state ? 'red' : '#ccc'},
            ]}>
            <Text style={{color: stateName ? '#000' : 'gray'}}>
              {stateName ? stateName : 'Choose State'}
            </Text>
            <Image
              source={images.Dropdown_Arrow}
              style={styles.dropdownArrow}
            />
          </TouchableOpacity>
          {errors.state && (
            <Text style={{color: 'red'}}>State is required</Text>
          )}
        </View>

        <View style={styles.stateContainer}>
          <Text style={styles.stateHeader}>
            District<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DistrictModal', {
                district: district,
                districts: districts,
                districtData: (district: any) => {
                  setDistrict(district.id);
                  setDistrictName(district.label);
                  const selectedDistricts =
                    data.districts[state as keyof typeof data.districts] || [];
                  setDistricts(selectedDistricts);
                },
              })
            }
            style={[
              styles.stateTouch,
              {borderColor: errors.state ? 'red' : '#ccc'},
            ]}>
            <Text style={{color: districtName ? '#000' : 'gray'}}>
              {districtName ? districtName : 'Choose district'}
            </Text>
            <Image
              source={images.Dropdown_Arrow}
              style={styles.dropdownArrow}
            />
          </TouchableOpacity>
          {errors.district && (
            <Text style={{color: 'red'}}>District is required</Text>
          )}
        </View>

        <InputBox
          inputTitle="PIN Code"
          autoComplete="off"
          keyboardType="number-pad"
          placeholder="Enter PIN Code"
          value={pinCode}
          onChangeText={setPinCode}
          error={!!errors.pinCode}
          errorMessage={errors.pinCode ? errors.pinCode : ''}
          required={true}
        />

        <InputBox
          inputTitle="GST NO."
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter GST No."
          value={gst}
          onChangeText={setGst}
          error={!!errors.gst}
          errorMessage={errors.gst ? errors.gst : ''}
        />

        <TouchableOpacity style={styles.getLocation} onPress={handleLocation}>
          <Image
            source={require('../../assets/img/find_location_icon.png')}
            style={styles.locationImage}
          />
          <Text style={styles.getLocationText}>Use my current location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  backArrow: {
    position: 'absolute',
    top: 32,
    left: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  headerText: {
    color: '#E65629',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 25,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F45F20',
    width: '90%',
    height: 60,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  getLocation: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2874F0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 15,
  },
  getLocationText: {
    fontSize: 15,
    marginLeft: 5,
    fontFamily: fonts.POPPINS_LIGHT,
    color: 'white',
  },
  locationImage: {
    width: 25,
    height: 25,
  },
  completedPerText: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
  cameraButton: {
    backgroundColor: '#87CEEB',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraImage: {
    width: 40,
    height: 40,
  },
  capturedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraEditIcon: {
    position: 'absolute',
    bottom: 5,
    left: 70,
    width: 35,
    height: 35,
  },
  stateHeader: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.POPPINS_BOLD,
  },
  stateContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stateTouch: {
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dropdownArrow: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 15,
    right: 10,
  },
});

export default MerchantProfileForm;
