import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputBox from '../../components/InputBox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import GenderDropdown from '../../components/GenderDropdown';
import * as Yup from 'yup';
import SearchableDropdown from '../../components/SearchableDropdown';
import data, {State, District} from '../../data';
import Toast from 'react-native-toast-message';

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

function MerchantProfileForm() {
  const formData = useSelector((state: RootState) => state.form);
  const [name, setName] = useState(formData.name);
  const [email, setEmail] = useState(formData.email);
  const [date, setDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [gender, setGender] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [altMobile, setAltMobile] = useState(null);
  const [addressLine, setAddressLine] = useState('');
  const [errors, setErrors] = useState<Errors>({}); // Initialize errors with the correct type
  const [state, setState] = useState<number | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [district, setDistrict] = useState<number | null>(null);
  const [shopCategory, setShopCategory] = useState<number | null>(null);
  const [pinCode, setPinCode] = useState(null);
  const [gst, setGst] = useState('');

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
    const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return minDate;
  };
  const getDefaultDate = () => {
    const today = new Date();
    const defaultDateValue = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
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

  const handleSubmit = async () => {
    try {
      await ProfileFormSchema.validate(
        {name, email, date, gender, addressLine,shopCategory, state, district, pinCode},
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
        gst
      });
     Toast.show({
        type: 'success',
        text1: "Profile details added"
     })
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
      <Image
        source={require('../../assets/img/back_arrow.png')}
        style={styles.backArrow}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Merchant Details</Text>
      </View>
      <KeyboardAwareScrollView
        style={{width: '100%', alignSelf: 'center', marginTop: 10}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
        <TouchableOpacity onPress={showDatePicker} style={{width: '100%'}}>
          <InputBox
            inputTitle="Date of Birth"
            autoComplete="off"
            keyboardType="default"
            placeholder="Choose date of birth"
            value={date}
            onChangeText={setDate}
            error={!!errors.date}
            errorMessage={errors.date ? errors.date : ''}
            required={true}
            editable={false}
          />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          date={getDefaultDate()}
          maximumDate={getMinimumDate()}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <GenderDropdown
          data={dropdownValues}
          title={'Choose Gender'}
          onSelectValue={handleDropdownChange}
          error={!!errors.gender}
          errorMessage={errors.gender ? errors.gender : ''}
        />

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
         
       
        <SearchableDropdown
            data={data.shopCategories}
            title={'Shop Type'}
            onSelectValue={handleShopCategory}
            error={!!errors.shopCategory}
            errorMessage={errors.shopCategory ? errors.shopCategory : ''}
            placeholder="Choose Shop Type"
          />
     
       

        <SearchableDropdown
          data={data.states}
          title={'State'}
          onSelectValue={handleStateChange}
          error={!!errors.state}
          errorMessage={errors.state ? errors.state : ''}
          placeholder="Choose State"
        />
        <SearchableDropdown
          data={districts}
          title={'District'}
          onSelectValue={(option: District) => handleDistrictChange(option)}
          error={!!errors.district}
          errorMessage={errors.district ? errors.district : ''}
          placeholder="Choose district"
        />

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
    

    <TouchableOpacity style={styles.getLocation}>
            <Image source={require('../../assets/img/find_location_icon.png')} style={styles.locationImage}/>
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
    color: 'white'
  },
  locationImage: {
    width: 25,
    height: 25,
  }
});

export default MerchantProfileForm;
