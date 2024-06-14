import React, { useContext } from 'react'
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fonts } from '../constant'
import { useNavigation } from '@react-navigation/native'
import { RegisterFormContext } from '../contexts/RegisterFormContext'


function HomeScreen({navigation}:any) {
    
    const {formData} = useContext(RegisterFormContext) || { formData: null }
    console.log(formData)
    
    const letsConnect = () => navigation.navigate("SignUp")
  return (
    
      <View style = {styles.container}>
          <StatusBar backgroundColor="#F45F20" barStyle="light-content" />
          <Image source={require('../../assets/img/logo_bg.png')}   style={{width: 200, height: 200}}/>         
          <Text style = {styles.pageTitle}>Your Shop at Your Fingertips</Text>
          <Text style = {styles.pageText}>Sell More, Earn More</Text>
          <Image source={require('../../assets/img/shopkeeper_img.png')}  style = {styles.shopkeeperImg}/>
          <TouchableOpacity style={styles.button} onPress={letsConnect}>
            <Text style={styles.buttonText}>Let's Connect</Text>
          </TouchableOpacity>
      </View>
  
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E65629',
        fontWeight: "bold"
    },
    pageTitle: {
        fontSize:25,
        textAlign: "center" ,
        color: 'white',
        fontFamily: fonts.POPPINS_BOLD,
        marginTop: 10
    },
    pageText: {
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.POPPINS_REGULAR,
       
    },
    shopkeeperImg: {
        marginTop: 50,
        width: 400,
        height: 400
    },
    button: {       
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#F45F20',
        width: '90%',
       height: 60,
       borderRadius: 16
    },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.POPPINS_REGULAR
  }
   
})

export default HomeScreen
