import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputBox from '../../components/InputBox';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {setFormData} from '../store/formSlice';
import * as Yup from 'yup';
import {useAndroidBackButton} from '../../hooks/useAndroidButton';

const ForgetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
interface Errors {
  [key: string]: string | undefined;
}

function ForgetPassword({navigation}: any) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch<AppDispatch>();

  const submitForm = async () => {
    try {
      await ForgetSchema.validate({email}, {abortEarly: false});
      if (email !== '') {
        setEmailError(false);
        Toast.show({
          type: 'info',
          text1: 'OTP Sent.',
        });
        dispatch(setFormData({inputForm: 'forgetPasswordForm'}));
        navigation.navigate('OTP');
      }
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
  useAndroidBackButton(() => {
    navigation.navigate('LogIn');
  });
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LogIn</Text>
      </View>

      <KeyboardAwareScrollView style={{width: '100%', marginTop: 125}}>
        <Text style={styles.welcomeText}>Forget Password</Text>

        <InputBox
          inputTitle="Email"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          error={!!errors.email}
          errorMessage={errors.email ? errors.email : ''}
          required={true}
        />

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Request OTP</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignSelf: 'center',
    marginTop: 25,
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
  },
  checkBoxText: {
    marginLeft: 10,
  },
  isAgreeError: {
    marginTop: 10,
    color: 'red',
  },
});

export default ForgetPassword;
