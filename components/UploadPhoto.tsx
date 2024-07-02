import React, {useState} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../assets';
import {fonts} from '../src/constant';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';

function UploadPhoto({navigation, route}: any) {
  const [photo, setPhoto] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'Enable permission to capture image',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        ImagePicker.openCamera({
          cropping: true,
          includeBase64: true,
        })
          .then(image => {
            if (image.path) {
              setPhoto(image.path);
              navigation.goBack();
              route.params.photoData(image.path);
            } else {
              console.log('Photo URI is undefined');
            }
          })
          .catch(error => {
            console.log('ImagePicker Error: ', error);
          });
      } else {
        console.log('Camera permission denied');
        Toast.show({
          type: 'error',
          text1: 'Camera permission not granted',
        });
        navigation.navigate('ImageCapturePermission');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const chooseImageFromGallery = () => {
    ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        if (image.path) {
          setPhoto(image.path);
          navigation.goBack();
          route.params.photoData(image.path);
        } else {
          console.log('Photo URI is undefined');
        }
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Click Image or upload from gallery.
          </Text>
          <TouchableOpacity
            style={styles.crossIconContainer}
            onPress={() => navigation.goBack()}>
            <Image source={images.Cross_Icon} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottonsContainer}>
          <TouchableOpacity
            style={styles.bottons}
            onPress={requestCameraPermission}>
            <Image source={images.Camera_Icon} style={styles.IconImage1} />
            <Text style={styles.IconText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottons}
            onPress={chooseImageFromGallery}>
            <Image source={images.Gallery_Icon} style={styles.IconImage2} />
            <Text style={styles.IconText}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 16,
    color: '#000',
  },
  crossIconContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  crossIcon: {
    height: 20,
    width: 20,
  },
  bottonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottons: {
    height: 100,
    width: 160,
    backgroundColor: '#E65629',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  IconImage1: {
    height: 35,
    width: 60,
    tintColor: 'white',
  },
  IconImage2: {
    height: 40,
    width: 40,
    tintColor: 'white',
  },
  IconText: {
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
  },
});

export default UploadPhoto;
