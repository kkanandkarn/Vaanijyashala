import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import {fonts} from '../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputBox from '../../components/InputBox';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackButton} from '../../hooks/useAndroidButton';

const LoginSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});
interface Errors {
  [key: string]: string | undefined;
}

function LogIn({navigation}: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await AsyncStorage.getItem('login');
      if (auth) {
        navigation.navigate('BottomStack');
      }
    };

    checkAuth();
  }, []);

  useAndroidBackButton(() => {
    BackHandler.exitApp();
  });
  const submitForm = async () => {
    try {
      await LoginSchema.validate({email, password}, {abortEarly: false});
      Toast.show({
        type: 'success',
        text1: 'Login successfull',
      });
      await AsyncStorage.setItem('login', 'true');
      navigation.navigate('BottomStack');
    } catch (err: any) {
      const validationErrors: Errors = {};
      if (err.inner && err.inner.length > 0) {
        err.inner.forEach((error: yup.ValidationError) => {
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
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LogIn</Text>
      </View>

      <KeyboardAwareScrollView style={{width: '100%', marginTop: 125}}>
        <Text style={styles.welcomeText}>Welcome Back</Text>

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
        <InputBox
          inputTitle="Password"
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          error={!!errors.password}
          errorMessage={errors.password ? errors.password : ''}
          required={true}
          secureTextEntry={true}
          isPassword={true}
        />

        <Text
          style={styles.forgetPasswordText}
          onPress={() => navigation.navigate('ForgetPassword')}>
          Forget Password ?
        </Text>

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <Text style={{textAlign: 'center', marginBottom: 10}}>
        Don't have an account?
        <Text
          style={{color: '#E65629', fontFamily: fonts.POPPINS_BOLD}}
          onPress={() => navigation.navigate('SignUp')}>
          {' '}
          Sign up Now
        </Text>
      </Text>
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

  forgetPasswordText: {
    width: '95%',
    textAlign: 'right',
    marginTop: 5,
    color: '#E65629',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 15,
  },
});

export default LogIn;
