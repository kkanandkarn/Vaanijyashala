import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { fonts } from '../src/constant';

function InputBox({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  placeholder,
  value,
  onChangeText,
  // onBlur,
  error = false,
  errorMessage = '',
  required = false,
  editable= true,
  isDate = false
  
}) {
  const [touched, setTouched] = useState(false);
  
 

  // const handleBlur = () => {
  //   setTouched(true);
  //   onBlur && onBlur(); 
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>{inputTitle}{required && <Text style={{color: 'red', fontSize: 20}}>*</Text>}</Text>
      <TextInput
        style={[
          styles.inputBox,
          error && touched && styles.errorInputBox, 
          error && !touched && styles.errorInputBox, 
          !editable && !isDate && styles.readOnlyText, 
          isDate && styles.dateText
        ]}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        // onBlur={handleBlur}
        editable={editable}
        
      />
      {error && touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {error && !touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    paddingHorizontal: 18,
  },
  inputTitle: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.POPPINS_BOLD
  },
  inputBox: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  errorInputBox: {
    borderColor: 'red', // Change border color to red if error
  },
  errorMessage: {
    color: 'red',
  },
  readOnlyText: {
    color: 'gray',
    fontWeight: 'bold',
    backgroundColor: '#EBEBE4'
  },
  dateText: {
    fontWeight: 'bold',
    color: '#333',
    borderColor: '#ccc',
  }
});

export default InputBox;
