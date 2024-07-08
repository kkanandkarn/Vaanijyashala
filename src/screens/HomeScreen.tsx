import React, {useContext} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function HomeScreen({navigation}: any) {
  const letsConnect = async () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F45F20" barStyle="light-content" />

      <View style={styles.childContainer}>
        <Image
          source={require('../../assets/img/logo_bg.png')}
          style={{width: 200, height: 200}}
        />
        <Text style={styles.pageTitle}>Your Shop at Your Fingertips.</Text>
        <Text style={styles.pageText}>Sell More, Earn More</Text>
      </View>
      <View style={styles.childContainer}>
        <Image
          source={require('../../assets/img/shopkeeper_img.png')}
          style={styles.shopkeeperImg}
        />
        <TouchableOpacity style={styles.button} onPress={letsConnect}>
          <Text style={styles.buttonText}>Let's Connect</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#E65629',
    fontWeight: 'bold',
    height: '100%',
    paddingBottom: 10,
  },
  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageTitle: {
    fontSize: 25,
    textAlign: 'center',
    color: 'white',
    fontFamily: fonts.POPPINS_BOLD,
  },
  pageText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.POPPINS_REGULAR,
  },
  shopkeeperImg: {
    width: '90%',
    height: '65%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F45F20',
    width: '90%',
    height: 60,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.POPPINS_REGULAR,
  },
});

export default HomeScreen;
