import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts} from '../../constant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputBox from '../../../components/InputBox';
import images from '../../../assets';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';
import {CommonActions} from '@react-navigation/native';
import colors from '../../../constants';
import {TextInput} from 'react-native-gesture-handler';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import data from '../../../data';
interface Errors {
  [key: string]: string | undefined;
}

function getProductById(id: number) {
  return data.Products.find(product => product.id === id);
}

const schema = Yup.object().shape({
  productName: Yup.string().required('Product Name is required'),
  // quantity: Yup.string().required('Quantity is required'),
  price: Yup.string().required('Price is required'),
});

function AddProduct({navigation, route}: any) {
  const [method, setMethod] = useState<string>('ADD');
  const [productName, setProductName] = useState<string>('');
  const [productDesc, setProductDesc] = useState<string | null>(null);
  const [productImages, setProductImages] = useState([]);
  const [quantity, setQuantity] = useState<string>('1');
  const [price, setPrice] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [quantityError, setQuantityError] = useState<boolean>(false);
  const [quantityErrorMsg, setQuantityErrorMsg] = useState<string>('');
  const [priceError, setPriceError] = useState<boolean>(false);
  const [priceErrorMsg, setPriceErrorMsg] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>(['']);
  const productNameRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const quantityRef = useRef<TextInput>(null);

  useAndroidBackButton(() => {
    const {method} = route.params;
    if (method === 'ADD') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'BottomStack'}],
        }),
      );
    } else {
      navigation.navigate('ProductHistory');
    }
  });

  const addHighlight = () => {
    setHighlights([...highlights, '']);
  };

  // Function to remove a highlight input by index
  const removeHighlight = (index: any) => {
    const updatedHighlights = [...highlights];
    updatedHighlights.splice(index, 1);
    setHighlights(updatedHighlights);
  };

  // Function to update a highlight input value
  const updateHighlight = (index: any, value: any) => {
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = value;
    setHighlights(updatedHighlights);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(prevPhotos => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  const handleQuantityChange = (text: string) => {
    if (parseInt(text, 10) < 1 || text == '') {
      setQuantityError(true);
      setQuantityErrorMsg('Quantity must be at least 1');
      setQuantity(text);
    } else if (errors.quantity) {
      setQuantityError(true);
      setQuantityErrorMsg(errors.quantity);
      setQuantity(text);
    } else {
      setQuantityError(false);
      setQuantityErrorMsg('');
      setQuantity(text);
    }
  };
  const handlePriceChange = (text: string) => {
    setPrice(text);
    if (errors.price) {
      setErrors({...errors, price: ''});
    }
  };

  const increaseQuantity = () => {
    const newQuantity = parseInt(quantity, 10) + 1;
    setQuantity(newQuantity.toString());
  };

  const decreaseQuantity = () => {
    const newQuantity = parseInt(quantity, 10) - 1;
    setQuantity(newQuantity.toString());
  };

  const handleSubmit = async () => {
    try {
      await schema.validate(
        {productName, quantity, price},
        {abortEarly: false},
      );

      console.log('Quantity=> ', parseInt(quantity, 10));

      if (parseInt(quantity, 10) < 1 || quantity == '') {
        setQuantityError(true);
        setQuantityErrorMsg('Quantity must be at least 1');
        quantityRef.current?.focus();
        return;
      }

      if (parseInt(price, 10) < 1 || price == '') {
        setPriceError(true);
        setPriceErrorMsg('Price must be at least one rupee');
        priceRef.current?.focus();
        return;
      }

      setQuantityError(false);
      setQuantityErrorMsg('');
      setPriceError(false);
      setPriceErrorMsg('');
      console.log('Data=> ', {
        productName,
        productDesc,
        quantity,
        price,
        highlights,
        photos,
      });
      console.log('Form data is valid');
      Toast.show({
        type: 'success',
        text1: `${
          method === 'ADD'
            ? 'Product Added successfully'
            : 'Product Updated Successfully'
        }`,
      });

      if (method === 'ADD') {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'BottomStack'}],
          }),
        );
      } else {
        navigation.navigate('ProductHistory');
      }
    } catch (error: any) {
      const validationErrors: {[key: string]: string} = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err: Yup.ValidationError) => {
          if (err.path) {
            // Check if err.path is defined
            validationErrors[err.path] = err.message;
          }
        });
      }
      setErrors(validationErrors);
      if (validationErrors.productName) {
        productNameRef.current?.focus();
      }
      if (validationErrors.price) {
        priceRef.current?.focus();
      }
      console.log('Validation errors:', validationErrors);
    }
  };

  useEffect(() => {
    const {id, method} = route.params;
    setMethod(method);
    if (method === 'EDIT') {
      const productData = getProductById(id);
      if (productData) {
        setProductName(productData?.name);
        setQuantity(productData?.qty.toString());
        setPrice(productData?.price.toString());
      }
    }
  }, [route.params]);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', height: '100%'}}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductHistory')}>
        <Image
          source={require('../../../assets/img/back_arrow.png')}
          style={styles.backArrow}
        />
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          {method === 'ADD' ? 'Add Product' : 'Edit Product'}
        </Text>
      </View>

      <KeyboardAwareScrollView
        style={{width: '100%', alignSelf: 'center', marginTop: 10}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <InputBox
          inputTitle="Product Name"
          autoComplete="name"
          keyboardType="default"
          placeholder="Enter Product Name"
          value={productName}
          onChangeText={setProductName}
          error={!!errors.productName}
          errorMessage={errors.productName ? errors.productName : ''}
          required={true}
          isReference={true}
          reference={productNameRef}
        />
        <InputBox
          inputTitle="Product Description"
          autoComplete="off"
          keyboardType="default"
          placeholder="Enter Product Description"
          value={productDesc}
          onChangeText={setProductDesc}
          error={!!errors.productDesc}
          errorMessage={errors.productDesc ? errors.productDesc : ''}
          isMultiline={true}
        />
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityTitle}>
            Quantity<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <View
            style={[
              styles.quantity,
              {borderColor: quantityError ? 'red' : '#ccc'},
            ]}>
            <TouchableOpacity
              style={[
                styles.iconButton,
                {borderRightColor: '#CCC', borderRightWidth: 2},
              ]}
              onPress={decreaseQuantity}
              disabled={quantity === '1' ? true : false}>
              <Text style={styles.incDecButton}>-</Text>
            </TouchableOpacity>
            <TextInput
              autoCorrect={false}
              keyboardType="number-pad"
              autoComplete="off"
              placeholder=""
              value={quantity}
              onChangeText={handleQuantityChange}
              style={styles.quantityInput}
              textAlign="center"
              textAlignVertical="center"
              ref={quantityRef}
            />
            <TouchableOpacity
              style={[
                styles.iconButton,
                {borderLeftColor: '#CCC', borderLeftWidth: 2},
              ]}
              onPress={increaseQuantity}>
              <Text style={styles.incDecButton}>+</Text>
            </TouchableOpacity>
          </View>
          {quantityError && (
            <Text style={{color: 'red'}}>{quantityErrorMsg}</Text>
          )}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.quantityTitle}>
            Price<Text style={{color: 'red', fontWeight: 'bold'}}>*</Text>
          </Text>
          <Text style={styles.rupeeSymbol}>₹</Text>
          <TextInput
            autoCorrect={false}
            keyboardType="number-pad"
            autoComplete="off"
            placeholder="Enter Per Qunatity Price"
            value={price}
            onChangeText={handlePriceChange}
            style={[
              styles.priceInput,
              {borderColor: errors.price || priceError ? 'red' : '#ccc'},
            ]}
            ref={priceRef}
          />
          {priceError && <Text style={{color: 'red'}}>{priceErrorMsg}</Text>}
          {errors.price && <Text style={{color: 'red'}}>{errors.price}</Text>}
        </View>

        <View style={styles.highlights}>
          <Text style={styles.quantityTitle}> Highlights </Text>
          {highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightsContainer}>
              <TextInput
                style={styles.highlightInput}
                value={highlight}
                onChangeText={text => updateHighlight(index, text)}
                placeholder={`Highlight ${index + 1}`}
              />
              {highlights.length > 1 && (
                <TouchableOpacity
                  onPress={() => removeHighlight(index)}
                  style={styles.minusHighlight}>
                  <Text style={styles.removehighlight}>X</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
          <Button title="+ Add Highlight" onPress={addHighlight} />
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.stateHeader}>Upload product Images</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() =>
              navigation.navigate('UploadMultiPhoto', {
                photoData: (photoUrls: string[]) => {
                  setPhotos([...photoUrls, ...photos]);
                },
              })
            }>
            <View style={styles.idImageContainer}>
              <Image source={images.Upload_Icon} style={styles.uploadIcon} />
            </View>
          </TouchableOpacity>
        </View>
        {photos?.map((photo, index) => (
          <View key={index} style={styles.photosContainer}>
            <ImageBackground
              key={index}
              source={{uri: photo}}
              style={styles.idImage}
              resizeMode="contain">
              <TouchableOpacity
                style={styles.crossIconContainer}
                onPress={() => handleRemovePhoto(index)}>
                <Image source={images.Cross_Icon} style={styles.crossIcon} />
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  backArrow: {
    position: 'absolute',
    top: 33,
    left: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  headerText: {
    color: '#E65629',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 25,
  },
  uploadContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  stateHeader: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.POPPINS_BOLD,
  },
  uploadButton: {
    width: '100%',
    height: 125,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'dashed',
  },

  idImageContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    height: 100,
    width: 100,
  },
  photosContainer: {
    marginTop: 20,
    height: 125,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'dotted',
    position: 'relative',
  },

  idImage: {
    height: '100%',
    width: '100%',
  },
  crossIconContainer: {
    height: 25,
    width: 25,
    backgroundColor: colors.primaryColor,
    padding: 5,
    borderRadius: 50,
    alignSelf: 'flex-end',
  },
  crossIcon: {
    height: '100%',
    width: '100%',
    tintColor: 'white',
  },
  quantityContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'left',
  },
  quantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,

    borderWidth: 2,
    borderRadius: 8,
  },
  iconButton: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  incDecButton: {
    color: '#000',
    fontSize: 24,
    fontFamily: fonts.POPPINS_REGULAR,
    marginTop: 5,
  },
  quantityTitle: {
    textAlign: 'left',
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
    fontFamily: fonts.POPPINS_BOLD,
  },
  quantityInput: {
    width: '60%',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    textAlignVertical: 'center',
  },
  priceInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 40,
  },
  priceContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: 'left',
  },
  rupeeSymbol: {
    position: 'absolute',
    left: 40,
    top: 54,
    fontSize: 18,
    color: '#333',
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
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
  highlights: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  highlightsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  highlightInput: {
    flex: 1,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  minusHighlight: {
    width: 30,
    height: 30,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginLeft: 10,
  },
  removehighlight: {
    color: 'white',
  },
});

export default AddProduct;
