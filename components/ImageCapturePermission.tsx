import React from 'react';
import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../assets';
import {fonts} from '../src/constant';

function ImageCapturePermission({navigation}: any) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Enable Permission</Text>
        <Text style={styles.contentText}>
          Enable permission to capture image
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              styles.button,
              {borderRightColor: 'gray', borderRightWidth: 2},
            ]}>
            <Text style={[styles.buttonText, {color: 'red'}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openSettings()}>
            <Text style={[styles.buttonText, {color: 'green'}]}>
              Go to Setting
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 180,
    width: 380,
    borderRadius: 16,
  },
  headerText: {
    fontFamily: fonts.POPPINS_REGULAR,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginTop: 20,
  },
  contentText: {
    fontFamily: fonts.POPPINS_REGULAR,
    textAlign: 'center',
    fontSize: 14,
    color: '#000',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'gray',
    borderTopWidth: 2,
    width: '50%',
    height: '70%',
  },
  buttonText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
  },
});

export default ImageCapturePermission;
