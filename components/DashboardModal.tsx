import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../assets';
import {fonts} from '../src/constant';

function DashboardModal({navigation}: any) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
      }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Choose one to add.</Text>
          <TouchableOpacity
            style={styles.crossIconContainer}
            onPress={() => navigation.goBack()}>
            <Image source={images.Cross_Icon} style={styles.crossIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottonsContainer}>
          <TouchableOpacity
            style={styles.bottons}
            onPress={() =>
              navigation.navigate('AddEmployee', {
                method: 'ADD',
                id: null,
              })
            }>
            <Image source={images.Group_Users} style={styles.IconImage1} />
            <Text style={styles.IconText}>Employee</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottons}
            onPress={() =>
              navigation.navigate('AddProduct', {
                method: 'ADD',
                id: null,
              })
            }>
            <Image source={images.Products_Icon} style={styles.IconImage2} />
            <Text style={styles.IconText}>Product</Text>
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
    width: '90%',
    borderRadius: 16,
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

export default DashboardModal;
