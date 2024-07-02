import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../../constant';
import colors from '../../../constants';
import images from '../../../assets';
import data from '../../../data';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

function getEmployeeById(id: number) {
  return data.Employees.find(employee => employee.id === id);
}

function EmployeeActivity({navigation, route}: any) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  useEffect(() => {
    const {id} = route.params;
    const employee = getEmployeeById(id);
    if (employee) {
      setPhoto(employee?.profileImg);
      setName(employee?.name);
    }
  }, [route.params]);
  const renderItem = ({item}: any) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}></View>
        <View style={styles.container2}>
          <Text style={styles.activity}>{item.activity}</Text>
          <Text style={styles.dateTime}>{item.dateTime}</Text>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', height: '100%', padding: 20}}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.Back_Arrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>Employee Activity</Text>
        </View>
      </View>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {photo && <Image source={images.User1} style={styles.userImage} />}

        <Text style={styles.username}>{name}</Text>
        {data.Activities.length ? (
          <FlatList
            data={data.Activities}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text>No data found</Text>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    fontSize: 18,
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
  userImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius: 50,
    marginTop: 20,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'gray',
    marginTop: 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '90%',
  },
  container1: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: colors.primaryColor,
  },
  container2: {
    backgroundColor: colors.primaryColor,
    width: '90%',
    position: 'absolute',
    top: 20,
    left: 65,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  activity: {
    color: 'white',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 16,
  },
  dateTime: {
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 14,
  },
});

export default EmployeeActivity;
