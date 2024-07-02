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
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAndroidBackButton} from '../../hooks/useAndroidButton';

const passwordValidation = Yup.string()
  .required('Password is required')
  .min(8, 'Password should be at least 8 characters long')
  .matches(/[0-9]/, 'Password must include at least one number')
  .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
  .matches(/[a-z]/, 'Password must include at least one lowercase letter')
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    'Password must include at least one special character',
  );

const ProfileFormSchema = Yup.object().shape({
  password: passwordValidation,
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match Confirm Password'),
});
interface Errors {
  [key: string]: string | undefined;
}

function GeneratePassword({navigation}: any) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const formData = useSelector((state: RootState) => state.form);
  useAndroidBackButton(() => {});

  const submitForm = async () => {
    try {
      await ProfileFormSchema.validate(
        {password, confirmPassword},
        {abortEarly: false},
      );
      if (password !== confirmPassword) {
        Toast.show({
          type: 'error',
          text1: 'confirm password does not match.',
        });
      } else {
        if (formData.inputForm === 'registerForm') {
          Toast.show({
            type: 'success',
            text1: 'Password Saved.',
          });
          navigation.navigate('RegisterSuccessfull');
          await AsyncStorage.setItem('login', 'true');
        } else {
          Toast.show({
            type: 'success',
            text1: 'Password Saved.',
          });
          navigation.navigate('LogIn');
        }
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <KeyboardAwareScrollView style={{width: '100%', marginTop: 200}}>
        <Text style={styles.welcomeText}>
          {formData.inputForm === 'registerForm'
            ? 'Generate Password'
            : 'Update Password'}
        </Text>

        <InputBox
          inputTitle="Password"
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          error={!!errors.password}
          errorMessage={errors.password ? errors.password : ''}
          secureTextEntry={true}
          required={true}
        />
        <InputBox
          inputTitle="Confirm Password"
          autoComplete="off"
          keyboardType="default"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword ? errors.confirmPassword : ''}
          secureTextEntry={true}
          required={true}
        />

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.suggestions}>
          <Text style={styles.suggestionText}>
            - Password should be at least 8 characters long
          </Text>
          <Text style={styles.suggestionText}>
            - Password must include at least one uppercase letter
          </Text>
          <Text style={styles.suggestionText}>
            - Password must include at least one lowercase letter
          </Text>
          <Text style={styles.suggestionText}>
            - Password must include at least one special character
          </Text>
          <Text style={styles.suggestionText}>
            - Password must include at least one number
          </Text>
          <Text style={styles.suggestionText}>
            - Passwords must match Confirm Password
          </Text>
          <Text style={styles.suggestionText}>- For example: Abc@1234</Text>
        </View>
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
  suggestions: {
    padding: 20,
  },
  suggestionText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 13,
    color: '#2F2C2A',
  },
});

export default GeneratePassword;
