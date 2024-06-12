import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../constant';
import InputBox from '../../components/InputBox';
import Dropdown from '../../components/Dropdown';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp() {
  const dropdownValues = [
    { id: 1, label: 'User', value: 1 },
    { id: 2, label: 'Seller/Merchant', value: 2 },
  ];

  const [selectedRole, setSelectedRole] = useState<number | null>(1); // Default to "User"
  const [email, setEmail] = useState('');
  const [name, setName] = useState('')
  const [referralCode, setReferralCode] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [referralError, setReferralError] = useState(false)


  const submitForm = async () => {
   
   
    console.log({
      selectedRole,
      name,
      email,
      referralCode,
      isChecked,
    });
    if(name === '') {        
        setNameError(true)
    }
    if(email === '') {
        setEmailError(true)
    }

    if(name !== '' && email !== '') {
        setNameError(false)
        setEmailError(false)
    }
  
    const registerFormData = JSON.stringify({selectedRole: selectedRole, email: email, referralCode:referralCode, isChecked: isChecked})
    await AsyncStorage.setItem("registerFormData", registerFormData)
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>
      <View style={styles.registerFormContainer}>
        <View style={styles.registerForm}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Dropdown
            dropdownTitle="Register as"
            values={dropdownValues}
            value={selectedRole}
            onChangeValue={setSelectedRole}
          />
         <InputBox
  inputTitle="Name"
  autoComplete="name"
  keyboardType="name"
  placeholder="Enter Name"
  value={name}
  onChangeText={setName}
  onBlur={() => {
    if (name === '') {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }}
  error={nameError}
  errorMessage={nameError ? 'Name is required' : ''}
/>

          <InputBox
            inputTitle="Email"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => {
                if (email === '') {
                  setEmailError(true);
                } else {
                  setEmailError(false);
                }
              }}
              error={emailError}
              errorMessage={emailError ? 'Email is required' : ''}
          />
          
          <InputBox
            inputTitle="Referral Code"
            autoComplete="Text"
            keyboardType="text"
            placeholder="Enter Referral Code"
            value={referralCode}
            onChangeText={setReferralCode}
            onBlur={() => {
               setReferralError(false)
              }}
              error={referralError}
              errorMessage={referralError ? 'Referral Code is required' : ''}
          />

          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onValueChange={setIsChecked}
              tintColors={{ true: '#E65629', false: '#000000' }}
            />
            <Text style={styles.checkBoxText}>I agree to the <Text style={{color: "#E65629", fontWeight: 'bold'}}>Terms & Conditions</Text> and <Text style={{color: "#E65629", fontWeight: 'bold'}}>Privacy Policy</Text></Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={submitForm}>
            <Text style={styles.buttonText}>Request OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerForm: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '99%',
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: fonts.POPPINS_BOLD,
    color: '#E65629',
    marginBottom: 5,
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
  },
  checkBoxText: {
    marginLeft: 10,
  },
});

export default SignUp;
