import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { fonts } from '../constant'
import Toast from 'react-native-toast-message';
import { useAndroidBackButton } from '../../hooks/useAndroidButton';

function OtpScreen({navigation}: any) {
    const et1 = useRef<TextInput>(null);
    const et2 = useRef<TextInput>(null);
    const et3 = useRef<TextInput>(null);
    const et4 = useRef<TextInput>(null);
    const [f1, setF1] = useState('')
    const [f2, setF2] = useState('')
    const [f3, setF3] = useState('')
    const [f4, setF4] = useState('')
    const [count, setCount] = useState(30)
    useAndroidBackButton(()=> {})
    useEffect(()=> {
        const interval = setInterval(()=> {
            if(count == 0) {
                clearInterval(interval)
                
            } else {
                setCount(count-1)
            }
        },1000)
        return () => {
            clearInterval(interval)
        }
    }, [count])

    const handleSubmit = () => {
       const finalOtp = f1+f2+f3+f4;
       console.log(finalOtp)
       if(finalOtp === '2019') {
        Toast.show({
            type: "success",
            text1: "OTP Verified"
        })
        navigation.navigate("GeneratePassword")
       }  else {
        Toast.show({
            type: "error",
            text1: "Invalid OTP"
        })
       }
    

    }
  return (    
    <View style = {styles.container}>
      <Text style={styles.title}>Enter OTP</Text>  
      <Text style = {styles.otpMessage}>Please enter the otp we sent to your email</Text>   
      <View style= {styles.otpView}>
        <TextInput 
            ref={et1} 
            style={[styles.inputView, {borderColor: f1.length>=1 ? "blue" : "#000"}]} 
            keyboardType='number-pad' 
            maxLength={1}
            value={f1}
            caretHidden={true}
            onChangeText={txt=> {
                setF1(txt)
                if(txt.length>=1) {
                    et2.current?.focus()
                }
            }}/>
        <TextInput 
            ref={et2} 
            style={[styles.inputView, {borderColor: f2.length>=1 ? "blue" : "#000"}]} 
            keyboardType='number-pad' 
            maxLength={1}
            value={f2}
            caretHidden={true}
            onChangeText={txt=> {
                setF2(txt)
                if(txt.length>=1) {
                    et3.current?.focus()
                } else if(txt.length<1) {
                    et1.current?.focus()
                }
            }}/>
        <TextInput 
            ref={et3} 
            style={[styles.inputView, {borderColor: f3.length>=1 ? "blue" : "#000"}]} 
            keyboardType='number-pad' 
            maxLength={1}
            value={f3}
            caretHidden={true}
            onChangeText={txt=> {
                setF3(txt)
                if(txt.length>=1) {
                    et4.current?.focus()
                } else if(txt.length<1) {
                    et2.current?.focus()
                }
            }}/>
        <TextInput 
            ref={et4} 
            style={[styles.inputView, {borderColor: f4.length>=1 ? "blue" : "#000"}]} 
            keyboardType='number-pad' 
            maxLength={1}
            value={f4}
            caretHidden={true}
            onChangeText={txt=> {
                setF4(txt)
                if(txt.length>=1) {
                    et4.current?.focus()
                } else if(txt.length<1) {
                    et3.current?.focus()
                }
            }}/>
      </View>
      <View style={styles.otpContainer}>
      {
        count !== 0 &&  <Text style={styles.otpCount}>{count===0 ? '00 : 00' : `00 : ${count>=10 ? count: `0${count}`}`}</Text>
      }
        {  count == 0 &&
       <TouchableOpacity style = {styles.resendButton} onPress={()=> setCount(30)}>
    
            <Text style = {styles.resendText}>Resend</Text>
    
      </TouchableOpacity>
        }    

        </View> 
     
      <TouchableOpacity 
        disabled = { f1 !== '' && f2 !== '' && f3 !== '' && f4 !== '' ? false : true}
        style={[styles.verifyOtpButton, {backgroundColor: f1 !== '' && f2 !== '' && f3 !== '' && f4 !== ''? '#E65629': '#cccccc'}]}
        onPress={handleSubmit}
       >
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        marginTop: 100,
        alignSelf: 'center',
        color: '#E65629',
        fontFamily: fonts.POPPINS_BOLD
    },
    otpMessage: {
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 20,
        width: '70%',
        fontFamily: fonts.POPPINS_REGULAR
    },
    otpView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 50,
    },
    inputView: {
        width: 60,
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        marginLeft: 20,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    inputView1: {
        width: 60,
        height: 60,
        borderWidth: 0.5,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    verifyOtpButton: {
        width: '90%',
        height: 55,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: fonts.POPPINS_REGULAR
    },
    otpContainer: {
        height: 50,
        marginTop: 50,

    },
    otpCount: {
        textAlign: 'center',
      
        fontSize: 18
    },
    resendButton: {
        alignSelf: 'center',
    },
    resendText: {
        fontSize: 16,
        color: '#F45F20',
        textDecorationLine: 'underline',
        fontFamily: fonts.POPPINS_BOLD
    }

})

export default OtpScreen
