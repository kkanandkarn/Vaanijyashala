import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from './Header';
import data from '../../../data';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../../assets';
import {fonts} from '../../constant';
import colors from '../../../constants';

function Employees({navigation}: any) {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(data.Employees);
  const [confirm, setConfirm] = useState<string | null>(null);

  const handleSearch = (text: any) => {
    setSearch(text);
    if (text) {
      const newData = data.Employees.filter(
        item =>
          item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.EmployeeId.toLowerCase().includes(text.toLowerCase()) ||
          item.email.toLowerCase().includes(text.toLowerCase()) ||
          item.mobileNumber.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(data.Employees);
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('EmployeeProfile', {
          id: item.id,
        })
      }
      style={[
        styles.itemContainer,
        {
          backgroundColor:
            item.status === 'Active'
              ? '#90EE90'
              : item.status === 'Hold'
              ? '#CCC'
              : item.status === 'Suspended'
              ? '#F2D2BD'
              : '#E65629',
        },
      ]}>
      <View style={styles.groupText}>
        <Text style={[styles.itemText, {fontWeight: 'bold'}]}>
          {item.name.length > 30
            ? `${item.name.substring(0, 30)}...`
            : item.name}
        </Text>
        <Text style={[styles.itemText, {color: '#E65629', fontWeight: '600'}]}>
          {item.EmployeeId}
        </Text>
      </View>
      <View style={styles.groupText}>
        <Text style={styles.itemText}>
          {item.email.length > 25
            ? `${item.email.substring(0, 25)}...`
            : item.email}
        </Text>
        <Text style={styles.itemText}>{item.mobileNumber}</Text>
      </View>
      <View style={styles.groupText}>
        <Text
          style={[
            styles.itemText,
            {
              color:
                item.status === 'Active'
                  ? 'green'
                  : item.status === 'Hold'
                  ? '#E65629'
                  : item.status === 'Suspended'
                  ? 'red'
                  : '#E65629',
              fontWeight: '600',
            },
          ]}>
          {item.status}
        </Text>

        <TouchableOpacity
          style={styles.iconButtons}
          onPress={() =>
            navigation.navigate('EmployeeDeleteConfirmModal', {
              id: item.id,
              confirmData: (confirm: any) => {
                setConfirm(confirm);
                if (confirm === 'Yes') {
                  console.log('Yes');
                } else {
                  console.log('No');
                }
              },
            })
          }>
          <Text style={styles.crossIcon}>X</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', paddingHorizontal: 20}}>
      <Header header={'Employees'} navigation={navigation} />
      <View style={styles.searchBox}>
        <TextInput
          keyboardType="default"
          placeholder={'Search by name, id, email or mobile'}
          value={search}
          onChangeText={handleSearch}
          style={styles.inputBox}
          maxLength={45}
        />
        <Image source={images.searchIcon} style={styles.searchIcon} />
      </View>
      {filteredProducts.length ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.notFound}>No data found</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    height: 60,
  },
  inputBox: {
    height: '80%',
    backgroundColor: '#F5BBB1',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    alignSelf: 'center',
    paddingLeft: 50,
    color: '#000',
    fontSize: 16,
  },
  searchIcon: {
    height: 20,
    width: 20,
    position: 'absolute',
    top: 15,
    left: 20,
  },
  listContainer: {
    marginTop: 10,
    paddingBottom: 30,
  },
  itemContainer: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  groupText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notFound: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  iconButtons: {
    height: 25,
    width: 25,
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  crossIcon: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
});
export default Employees;
