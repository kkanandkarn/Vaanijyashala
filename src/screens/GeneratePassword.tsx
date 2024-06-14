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

function GeneratePassword({navigation}: any) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const formData = useSelector((state: RootState) => state.form);

  const submitForm = () => {
    if (password == '') {
      setPasswordError(true);
    }
    if (confirmPassword == '') {
      setConfirmPasswordError(true);
    }

    if (password !== '' && confirmPassword !== '') {
      setPasswordError(false);
      setConfirmPasswordError(false);
      console.log(password, confirmPassword);
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
        } else {
          Toast.show({
            type: 'success',
            text1: 'Password Saved.',
          });
          navigation.navigate('LogIn');
        }
      }
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
          onBlur={() => setPasswordError(password === '')}
          error={passwordError}
          errorMessage={passwordError ? 'Password is required' : ''}
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
          onBlur={() => setConfirmPasswordError(confirmPassword === '')}
          error={confirmPasswordError}
          errorMessage={
            confirmPasswordError ? 'Confirm Password is required' : ''
          }
          secureTextEntry={true}
          required={true}
        />

        <TouchableOpacity style={styles.button} onPress={submitForm}>
          <Text style={styles.buttonText}>Submit</Text>
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

export default GeneratePassword;
