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
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  useEffect(() => {
    const {id} = route.params;
    const employee = getEmployeeById(id);
    if (employee) {
      setPhoto(employee?.profileImg);
      setName(employee?.name);
      setEmployeeId(employee?.EmployeeId);
    }
  }, [route.params]);
  const renderItem = ({item, index}: any) => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container1}>
          <Text style={styles.srNo}>{index + 1}</Text>
        </View>
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

      {photo && <Image source={images.User1} style={styles.userImage} />}

      <Text style={styles.employeeId}>{employeeId}</Text>
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
  employeeId: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
    color: colors.primaryColor,
    marginTop: 10,
  },
  username: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
    color: 'gray',
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
    paddingBottom: 15,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: '90%',
  },
  container1: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    backgroundColor: colors.primaryColor,
    width: '90%',
    position: 'absolute',
    top: 18,
    left: 60,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  activity: {
    color: 'white',
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 14,
  },
  dateTime: {
    color: 'white',
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
  srNo: {
    color: 'white',
    fontSize: 20,
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default EmployeeActivity;
