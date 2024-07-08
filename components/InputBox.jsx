import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {fonts} from '../src/constant';
import images from '../assets';

function InputBox({
  inputTitle,
  autoComplete,
  keyboardType,
  secureTextEntry = false,
  placeholder,
  value,
  onChangeText,
  error = false,
  errorMessage = '',
  required = false,
  editable = true,
  isDate = false,
  isPassword = false,
  isPrice = false,
  isReference = false,
  reference = {},
  isMultiline = false,
}) {
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(false);

  const visibility = () => {
    setVisible(!visible);
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.inputTitle}>
        {inputTitle}
        {required && <Text style={{color: 'red', fontSize: 20}}>*</Text>}
      </Text>
      <View style={styles.inputWrapper}>
        {isPrice && <Text style={styles.rupeeSymbol}>₹</Text>}
        <TextInput
          style={[
            styles.inputBox,
            error && touched && styles.errorInputBox,
            error && !touched && styles.errorInputBox,
            !editable && !isDate && styles.readOnlyText,
            isDate && styles.dateText,
            isPassword && {paddingRight: 50},
            isPrice && {paddingLeft: 25},
            isMultiline && styles.multilineInput,
          ]}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          secureTextEntry={isPassword && !visible}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          ref={reference}
          multiline={isMultiline}
          scrollEnabled={isMultiline}
        />
        {isPassword && (
          <TouchableOpacity onPress={visibility} style={styles.eyeContainer}>
            <Image
              source={visible ? images.ClosedEye_ICON : images.OpenEye_ICON}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && touched && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      {error && !touched && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
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
    fontFamily: fonts.POPPINS_BOLD,
  },
  inputWrapper: {
    position: 'relative',
  },
  inputBox: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  multilineInput: {
    height: 100,
    paddingVertical: 5,
    textAlignVertical: 'top',
  },
  rupeeSymbol: {
    position: 'absolute',
    left: 10,
    top: 12,
    fontSize: 18,
    color: '#333',
  },
  errorInputBox: {
    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
  },
  readOnlyText: {
    color: 'gray',
    fontWeight: 'bold',
    backgroundColor: '#EBEBE4',
  },
  dateText: {
    fontWeight: 'bold',
    color: '#333',
    borderColor: '#ccc',
  },
  eyeIcon: {
    height: 30,
    width: 30,
  },
  eyeContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputBox;
