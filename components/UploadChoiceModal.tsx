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
import DocumentPicker from 'react-native-document-picker';
function UploadChoiceModal({navigation, route}: any) {
  const [id, setId] = useState<string | null>(null);
  const [idType, setIdType] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string | null>(null);

  const chooseImageFromGallery = async () => {
    await ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
      multiple: false,
    })
      .then(image => {
        if (image.path) {
          console.log('Image Path: ', image.path);
          setId(image.path);
          setIdType('image');
          sendImageData(image.path, 'image');
          navigation.goBack();
        } else {
          console.log('Photo URI is undefined');
        }
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  const sendImageData = (imagePath: string, imageType: string) => {
    route.params.idData({idUrl: imagePath, idType: imageType, pdfName: null});
  };

  const choosePdfFromFileSystem = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      setId(res.uri);
      setIdType('pdf');
      setPdfName(res.name);
      sendPdfData(res.uri, 'pdf', res.name);
      navigation.goBack();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('DocumentPicker Error: ', err);
      }
    }
  };

  const sendPdfData = (
    pdfUrl: string,
    idType: string,
    pdfName: string | null,
  ) => {
    route.params.idData({idUrl: pdfUrl, idType: idType, pdfName: pdfName});
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
          <Text style={styles.headerText}>Upload Image or Pdf.</Text>
          <TouchableOpacity
            style={styles.crossIconContainer}
            onPress={() => navigation.goBack()}>
            <Image source={images.Cross_Icon} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottonsContainer}>
          <TouchableOpacity
            style={styles.bottons}
            onPress={chooseImageFromGallery}>
            <Image source={images.Gallery_Icon} style={styles.IconImage2} />
            <Text style={styles.IconText}>Image</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bottons}
            onPress={choosePdfFromFileSystem}>
            <Image source={images.Pdf_Icon} style={styles.IconImage1} />
            <Text style={styles.IconText}>Pdf</Text>
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
    width: 35,
    tintColor: 'white',
    marginBottom: 5,
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

export default UploadChoiceModal;
