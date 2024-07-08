import React, {useEffect, useState} from 'react';
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
import Toast from 'react-native-toast-message';

function ProductDeleteConfirmModal({navigation, route}: any) {
  const [productId, setProductId] = useState<number | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  useEffect(() => {
    const {id} = route.params;
    setProductId(id);
  }, [route.params]);
  const handleCancel = () => {
    navigation.goBack();
    route.params.confirmData('No');
  };
  const handleDelete = () => {
    Toast.show({
      type: 'success',
      text1: 'Product Deleted Successfully',
    });
    navigation.goBack();
    route.params.confirmData('Yes');
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Delete Confirmation</Text>
        <Text style={styles.contentText}>
          Are you sure want to delete this Product ?
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleCancel}
            style={[
              styles.button,
              {borderRightColor: 'gray', borderRightWidth: 2},
            ]}>
            <Text style={[styles.buttonText, {color: 'black'}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={[styles.buttonText, {color: 'red'}]}>Confirm</Text>
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
    width: '90%',
    borderRadius: 16,
  },
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    marginTop: 20,
  },
  contentText: {
    fontFamily: fonts.POPPINS_REGULAR,
    textAlign: 'center',
    fontSize: 16,
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
    fontSize: 18,
  },
});

export default ProductDeleteConfirmModal;
