import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';
import Header from './Header';
import {fonts} from '../../constant';
import data from '../../../data';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../../constants';

function Ledger({navigation}: any) {
  const renderItem = ({item}: any) => (
    <SafeAreaView style={styles.container}>
      <View style={styles.groupText}>
        <View style={styles.Text1}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <Text style={{color: item.type === 'add' ? `green` : `red`}}>
          {' '}
          {item.type === 'add' ? `+ ` : `- `}
          &#x20B9; {item.amount.toLocaleString()}
        </Text>
      </View>
      <View style={styles.groupText}>
        <View style={styles.Text1}>
          <Text
            style={{
              color: '#000',
              fontFamily: fonts.POPPINS_REGULAR,
              fontSize: 12,
            }}>
            {item.user}
          </Text>
        </View>
        <Text
          style={{
            color: '#000',
            fontFamily: fonts.POPPINS_REGULAR,
            fontSize: 12,
          }}>
          Qty: {item.Qty}
        </Text>
      </View>
      <View style={styles.groupText}>
        <Text
          style={{
            color: '#000',
            fontFamily: fonts.POPPINS_REGULAR,
            fontSize: 12,
          }}>
          {item.dateTime}
        </Text>
      </View>
    </SafeAreaView>
  );
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', paddingHorizontal: 20}}>
      <Header header={'Ledger'} navigation={navigation} />
      {data.Ledger.length ? (
        <FlatList
          data={data.Ledger}
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
  container: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: colors.primaryColor,
    borderWidth: 1,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 10,
  },
  groupText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Text1: {
    flexDirection: 'row',
    width: '70%',
    flexWrap: 'wrap',
    padding: 2,
  },
  notFound: {
    fontSize: 20,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    marginTop: 10,
    paddingBottom: 30,
  },
  message: {
    fontFamily: fonts.POPPINS_BOLD,
    color: '#000',
    fontSize: 12,
  },
});

export default Ledger;
