import React, {useEffect, useState} from 'react';
import {
  Text,
  Dimensions,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import images from '../../../assets';
import {fonts} from '../../constant';
import colors from '../../../constants';

const {width} = Dimensions.get('window');

function ProductDetails({navigation, route}: any) {
  const [productId, setProductId] = useState<number>();
  const [productImages, setProductImages] = useState<string[]>([]);
  const [highLights, setHighLights] = useState<string[]>([]);

  useEffect(() => {
    const {productId} = route.params;
    setProductId(productId);
    setProductImages([
      'https://images.pexels.com/photos/3802602/pexels-photo-3802602.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/8921199/pexels-photo-8921199.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/10416278/pexels-photo-10416278.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/3907507/pexels-photo-3907507.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/7727534/pexels-photo-7727534.jpeg?auto=compress&cs=tinysrgb&w=600',
    ]);
    setHighLights([
      'SnapBridge enables image/video transfers to your smart device',
      'LCD monitor with touch control allows shooting from creative angles',
      'Superior image quality',
      'Beautiful images in a broad range of lighting situations',
      'AF system captures moving subjects reliably',
    ]);
  }, [route.params]);

  const HighlightItem = ({text}: any) => (
    <View style={styles.highlightItem}>
      <Text style={styles.bulletPoint}>{'\u2022'}</Text>
      <Text style={styles.highlightText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: '100%',
      }}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.Back_Arrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>Product Details</Text>
        </View>
      </View>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}>
        {productImages.length > 0 && (
          <View
            style={{
              flex: 1,
            }}>
            <Carousel
              loop
              width={width}
              height={width}
              autoPlay={false}
              data={productImages}
              scrollAnimationDuration={1000}
              mode="parallax"
              renderItem={({item}) => (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>
              )}
            />
          </View>
        )}
        <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
          <View style={styles.headerContainer}>
            <Text style={styles.productName}>
              Nikon D5600 DSLR Camera with 18-140mm Lens
            </Text>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() =>
                navigation.navigate('AddProduct', {
                  method: 'EDIT',
                  id: productId,
                })
              }>
              <Image
                source={images.Edit_Icon}
                style={{
                  width: '100%',
                  height: '100%',
                  tintColor: colors.primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.productDesc}>
            Nikon's D5600 digital SLR camera is made for creating in a more
            connected world. Working with the SnapBridge app, it stays in
            constant communication with your smart device.
          </Text>
          <Text style={styles.price}>Price: ₹ 62,999</Text>
          <Text style={styles.quantity}>Quantity: </Text>
          <View style={styles.qtyContainer}>
            <View>
              <Text style={styles.qtyText}>Total</Text>
              <Text style={styles.qtyText}>10</Text>
            </View>
            <View>
              <Text style={styles.qtyText}>Active</Text>
              <Text style={styles.qtyText}>6</Text>
            </View>
            <View>
              <Text style={styles.qtyText}>Sold</Text>
              <Text style={styles.qtyText}>4</Text>
            </View>
          </View>
          <View style={styles.highlightsContainer}>
            <Text style={styles.highlightHeader}>Highlights</Text>
            <FlatList
              data={highLights}
              renderItem={({item}) => <HighlightItem text={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    fontSize: 24,
    textAlign: 'center',
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    height: 15,
    width: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 20,
    color: colors.primaryColor,
    textAlign: 'left',
    width: '90%',
  },
  editButton: {
    height: 30,
    width: '10%',
  },
  productDesc: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
    color: '#302E2C',
    textAlign: 'left',
    marginTop: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceQTYContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  price: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 18,
    color: colors.primaryColor,
    textAlign: 'left',
    paddingVertical: 10,
  },
  quantityHeader: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  quantity: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 16,
    color: '#2F2C2A',
    textAlign: 'left',
  },

  highlightsContainer: {
    paddingVertical: 10,
  },
  highlightHeader: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 16,
    color: '#222120',
    textAlign: 'left',
    marginBottom: 10,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    width: '100%',
  },
  bulletPoint: {
    fontSize: 32,
    marginRight: 8,
  },
  highlightText: {
    fontSize: 16,
    color: '#2F2C2A',
    fontFamily: fonts.POPPINS_REGULAR,
    flexShrink: 1,
  },
  qtyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qtyText: {
    fontSize: 14,
    fontFamily: fonts.POPPINS_REGULAR,
    textAlign: 'center',
    color: '#2F2C2A',
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 24,
    color: colors.primaryColor,
  },
});

export default ProductDetails;
