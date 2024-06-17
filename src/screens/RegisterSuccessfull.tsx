import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'

import { fonts } from '../constant'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function RegisterSuccessfull({navigation}:any) {

  const formData = useSelector((state: RootState) => state.form);
  const handleSubmit = () => {
    if(formData.selectedRole === 1) {
      navigation.navigate("ProfileForm")
    } 
    else  {
      navigation.navigate("MerchantProfileForm")
    } 
  }
    
   
    
  return (
    <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/img/Verification.png')} style={{height: 150, width: 150}} />
      <Text style={styles.congratsText}>Congratulations!</Text>
      <Text style = {styles.successfulRegisterText}>You have successfully registered now.</Text>
     
      <TouchableOpacity style={styles.completeProfileButton} onPress={handleSubmit}>
        <Text style={styles.completeProfileButtonText}>Let's Complete your Profile</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    congratsText: {
        marginTop: 20,
        fontFamily: fonts.POPPINS_BOLD,
        fontSize: 25,
        color: '#F45F20'
    },
    successfulRegisterText: {
        marginTop: 5,
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 18,
        color: '#F45F20'
    },
    completeProfileButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F45F20',
        width: '90%',
        height: 60,
        borderRadius: 12,
    },
    completeProfileButtonText: {
        color: 'white',
        fontFamily: fonts.POPPINS_REGULAR,
        fontSize: 18
    }

})

export default RegisterSuccessfull
