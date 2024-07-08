import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../../constant';
import colors from '../../../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import images from '../../../assets';
import data from '../../../data';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNFS from 'react-native-fs';
import Toast from 'react-native-toast-message';
import * as Progress from 'react-native-progress';

function getEmployeeById(id: number) {
  return data.Employees.find(employee => employee.id === id);
}

function EmployeeProfile({navigation, route}: any) {
  const [profile, setProfile] = useState({
    id: 0,
    EmployeeId: '',
    name: '',
    email: '',
    mobileNumber: '',
    altMobileNo: '',
    gender: '',
    dob: '',
    state: '',
    dist: '',
    cityVillage: '',
    isId: false,
    status: '',
  });
  const [downloadStart, setDownloadStart] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const {id} = route.params;
    const employeeData = getEmployeeById(id);

    if (employeeData) {
      setProfile({
        id: employeeData?.id,
        EmployeeId: employeeData?.EmployeeId,
        name: employeeData?.name,
        email: employeeData?.email,
        mobileNumber: employeeData?.mobileNumber,
        altMobileNo: employeeData?.altMobileNo,
        gender: employeeData?.gender,
        dob: employeeData?.dob,
        state: employeeData?.state,
        dist: employeeData?.dist,
        cityVillage: employeeData?.cityVillage,
        isId: employeeData?.isId,
        status: employeeData?.status,
      });
    } else {
      console.log('Employee data not found');
    }
  }, []);

  const downloadFile = async () => {
    const url =
      'https://bwms-bpsc.codebucketstage.online/api/advertisement/2024-06-03T05-42-29.701Z-BRCCO_2023_11680430%20(1).pdf';
    const fileName = url.split('/').pop();
    console.log(fileName);
    const destPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
    console.log(destPath);

    try {
      setDownloadStart(true);
      console.log('download started');
      const download = RNFS.downloadFile({
        fromUrl: url,
        toFile: destPath,
        background: true,
        discretionary: true,
        progress: res => {
          setProgress(Math.round((res.bytesWritten / res.contentLength) * 100));
          console.log(
            `Progress: ${Math.round(
              (res.bytesWritten / res.contentLength) * 100,
            )}%`,
          );
        },
      });

      const result = await download.promise;

      if (result.statusCode === 200) {
        setDownloadStart(false);
        setProgress(0);
        Toast.show({
          type: 'success',
          text1: 'Download completed',
        });
      } else {
        setDownloadStart(false);
        setProgress(0);
        Toast.show({
          type: 'error',
          text1: 'Download failed',
          text2: 'Please check the connection or try again lator',
        });
      }
    } catch (error) {
      setDownloadStart(false);
      setProgress(0);
      Toast.show({
        type: 'error',
        text1: 'Download failed',
        text2: 'Please check the connection or try again lator',
      });
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        padding: 15,
        height: '100%',
      }}>
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={images.Back_Arrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>Employee Profile</Text>
        </View>
      </View>

      {downloadStart && (
        <View style={{width: '100%', alignSelf: 'center', marginTop: 10}}>
          <Progress.Bar
            progress={progress / 100}
            width={null}
            height={8}
            color={'#F45F20'}
            unfilledColor={'white'}
            borderWidth={1}
            borderRadius={8}
            borderColor={'#F45F20'}
          />
          <Text style={styles.completedPerText}>
            {Math.round(progress)}% downloaded
          </Text>
        </View>
      )}

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 20}}>
        <Image source={images.User1} style={styles.userImage} />
        <Text style={styles.username}>{profile.name}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('AddEmployee', {
                method: 'EDIT',
                id: profile.id,
              })
            }>
            <Text style={styles.buttonText}>Edit</Text>
            <Image source={images.Edit_Icon} style={{height: 20, width: 20}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate('EmployeeActivity', {
                id: profile.id,
              })
            }>
            <Text style={styles.buttonText}>Activity</Text>
            <Image
              source={images.Activity_Icon}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>Employee ID: </Text>
            <Text style={[styles.text, {color: colors.primaryColor}]}>
              {profile.EmployeeId}
            </Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Gender: </Text>
            <Text style={styles.text}>{profile.gender}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Date of Birth: </Text>
            <Text style={styles.text}>{profile.dob}</Text>
          </View>
        </View>
        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>Mobile Number: </Text>
            <Text style={styles.text}>{profile.mobileNumber}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Alt. Mobile No.: </Text>
            <Text style={styles.text}>{profile.altMobileNo}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>Email: </Text>
            <Text style={styles.text}>{profile.email}</Text>
          </View>
        </View>
        <View style={styles.PesonalDetails}>
          <View style={styles.groupData}>
            <Text style={styles.text}>City/Village: </Text>
            <Text style={styles.text}>{profile.cityVillage}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>District: </Text>
            <Text style={styles.text}>{profile.dist}</Text>
          </View>
          <View style={styles.groupData}>
            <Text style={styles.text}>State: </Text>
            <Text style={styles.text}>{profile.state}</Text>
          </View>
        </View>
        {profile.isId && (
          <TouchableOpacity
            style={styles.downloadbutton}
            onPress={downloadFile}>
            <Text style={styles.buttonText}>Download Id</Text>
            <Image
              source={images.Download_icon}
              style={{height: 15, width: 15, marginLeft: 2}}
            />
          </TouchableOpacity>
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
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
    paddingBottom: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 5,
  },
  button: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  downloadbutton: {
    flexDirection: 'row',
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 16,
    color: 'black',
    marginTop: 2,
  },
  PesonalDetails: {
    paddingVertical: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  groupData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: '#5F5F61',
    fontFamily: fonts.POPPINS_REGULAR,
    marginVertical: 5,
  },
  completedPerText: {
    alignSelf: 'flex-end',
    marginTop: 5,
    fontFamily: fonts.POPPINS_REGULAR,
    fontSize: 12,
  },
});

export default EmployeeProfile;
