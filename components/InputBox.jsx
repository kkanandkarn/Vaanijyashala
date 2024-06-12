import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

function InputBox({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error = false,
  errorMessage = '',
}) {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    onBlur && onBlur(); // Execute onBlur prop if provided
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput
        style={[
          styles.inputBox,
          error && touched && styles.errorInputBox, 
          error && !touched && styles.errorInputBox
        ]}
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={handleBlur}
      />
      {error && touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {error && !touched && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  inputTitle: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  inputBox: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorInputBox: {
    borderColor: 'red', // Change border color to red if error
  },
  errorMessage: {
    color: 'red',
  },
});

export default InputBox;
