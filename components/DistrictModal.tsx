import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../assets';
import {fonts} from '../src/constant';

import Toast from 'react-native-toast-message';
import data from '../data';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';

function DistrictModal({navigation, route}: any) {
  const sheetRef = useRef<BottomSheet>(null);
  const [index, setIndex] = useState(0);

  const snapPoints = useMemo(() => ['50%', '90%'], []);
  const [district, setDistrict] = useState<string | null>(null);
  const [districts, setDistricts] = useState([{id: 0, label: ''}]);
  const [search, setSearch] = useState('');
  const [state, setState] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState(districts);
  const handleSheetChange = useCallback((index: any) => {
    console.log('handleSheetChange', index);
  }, []);
  useEffect(() => {
    const {district, districts} = route.params;

    setDistrict(district);
    setDistricts(districts);
    setFilteredProducts(districts);
  }, [state, district]);

  const handleSearch = (text: any) => {
    setSearch(text);
    if (text) {
      const newData = districts.filter(item =>
        item.label.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(districts);
    }
  };

  const handleSubmit = (district: any) => {
    navigation.goBack();
    route.params.districtData(district);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handleSubmit({id: item.id, label: item.label})}
      style={styles.itemContainer}>
      <Text style={styles.item}>{item.label}</Text>
      {item.id === district && (
        <Image source={images.Selected_Icon} style={styles.selectImg} />
      )}
    </TouchableOpacity>
  );

  const changeSnapPoint = (index: number) => {
    sheetRef.current?.snapToIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.goBack()}>
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          style={{padding: 20}}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Choose District</Text>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => navigation.goBack()}>
              <Image source={images.Cross_Icon} style={styles.closeImg} />
            </TouchableOpacity>
          </View>
          <TextInput
            keyboardType="default"
            placeholder={'Search district'}
            value={search}
            onChangeText={handleSearch}
            onFocus={() => changeSnapPoint(1)}
            onBlur={() => changeSnapPoint(0)}
            style={styles.inputBox}
            maxLength={45}
          />
          {filteredProducts.length ? (
            <BottomSheetFlatList
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.noData}>No data found</Text>
          )}
        </BottomSheet>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    flex: 1,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    height: 50,
  },
  imageContainer: {
    width: 30,
    height: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    padding: 2,
    marginBottom: 8,
  },
  closeImg: {
    height: '100%',
    width: '100%',
  },
  headerText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: fonts.POPPINS_REGULAR,
    color: '#000',
  },
  inputBox: {
    height: 50,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
    color: '#000',
    fontSize: 16,
    marginTop: 10,
  },
  itemContainer: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    fontFamily: fonts.POPPINS_REGULAR,
    color: 'black',
    fontSize: 14,
  },
  selectImg: {
    height: 20,
    width: 20,
  },
  noData: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontFamily: fonts.POPPINS_REGULAR,
    color: 'black',
  },
});

export default DistrictModal;
