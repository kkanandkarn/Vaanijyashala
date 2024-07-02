import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {fonts} from '../constant';
import InputBox from '../../components/InputBox';
import Dropdown from '../../components/Dropdown';
import CheckBox from '@react-native-community/checkbox';
import {RegisterFormContext} from '../contexts/RegisterFormContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {setFormData} from '../store/formSlice';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackButton} from '../../hooks/useAndroidButton';

interface DropdownOption {
  id: number;
  label: string;
}
interface FormErrors {
  [key: string]: string;
}

const SignUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const SignUp: React.FC = ({navigation}: any) => {
  const dropdownValues = [
    // {id: 1, label: 'User'},
    {id: 2, label: 'Seller/Merchant'},
  ];

  const formData = useSelector((state: RootState) => state.form);
  const dispatch = useDispatch<AppDispatch>();

  const [referralError, setReferralError] = useState(false);
  const [isAgreeError, setIsAgreeError] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  useAndroidBackButton(() => {
    BackHandler.exitApp();
  });

  const submitForm = async () => {
    try {
      if (!formData.isChecked) {
        setIsAgreeError(true);
      }

      await SignUpSchema.validate(formData, {abortEarly: false});
      if (formData.isChecked) {
        setIsAgreeError(false);
        dispatch(setFormData({inputForm: 'registerForm'}));
        Toast.show({
          type: 'info',
          text1: 'OTP Sent',
        });
        navigation.navigate('OTP');
      }
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        // Validation failed
        const errors: FormErrors = {};
        error.inner.forEach((e: yup.ValidationError) => {
          if (e.path) {
            errors[e.path] = e.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };

  const handleCheckboxChange = (value: boolean) => {
    dispatch(setFormData({isChecked: value}));
    if (value) {
      setIsAgreeError(false); // Reset error when checked
    }
  };
  const handleDropdownChange = (option: DropdownOption) => {
    dispatch(setFormData({selectedRole: option.id}));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <KeyboardAwareScrollView
        style={{width: '100%', alignSelf: 'flex-start', marginTop: 50}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Dropdown
          data={dropdownValues}
          title={'Register as'}
          onSelectValue={handleDropdownChange}
        />

        <InputBox
          inputTitle="Name"
          autoComplete="name"
          keyboardType="default"
          placeholder="Enter Name"
          value={formData.name}
          onChangeText={(text: string) => dispatch(setFormData({name: text}))}
          error={!!formErrors.name}
          errorMessage={formErrors.name || ''}
          required={true}
        />

        <InputBox
          inputTitle="Email"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Enter email"
          value={formData.email}
          onChangeText={(text: string) => dispatch(setFormData({email: text}))}
          error={!!formErrors.email}
          errorMessage={formErrors.email || ''}
          required={true}
        />

        <InputBox
          inputTitle="Referral Code"
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter Referral Code"
          value={formData.referralCode}
          onChangeText={(text: string) =>
            dispatch(setFormData({referralCode: text}))
          }
          error={referralError}
          errorMessage={referralError ? 'Referral Code is required' : ''}
        />

        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={formData.isChecked}
            onValueChange={handleCheckboxChange}
            tintColors={{true: '#E65629', false: '#000000'}}
          />
          <Text style={styles.checkBoxText}>
            I agree to the{' '}
            <Text style={{color: '#E65629', fontWeight: 'bold'}}>
              Terms & Conditions
            </Text>{' '}
            and{' '}
            <Text style={{color: '#E65629', fontWeight: 'bold'}}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        {isAgreeError && (
          <Text style={styles.isAgreeError}>
            Please agree to our Terms & Conditions and Privacy Policy{' '}
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Request OTP</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Text style={styles.bottomText}>
        Already have an account?
        <Text
          style={{color: '#E65629', fontFamily: fonts.POPPINS_BOLD}}
          onPress={() => navigation.navigate('LogIn')}>
          {' '}
          Log in
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
  registerFormContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerForm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: fonts.POPPINS_BOLD,
    color: '#E65629',
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
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
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
  },
  checkBoxText: {
    marginLeft: 10,
  },
  isAgreeError: {
    marginTop: 10,
    color: 'red',
  },
  bottomText: {
    textAlign: 'center',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
    marginBottom: 10,
  },
});

export default SignUp;
