import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SellerDashboard from '../MerchantScreens/SellerDashboard';
import Ledger from '../MerchantScreens/Ledger';
import Profile from '../MerchantScreens/Profile';
import {useAndroidBackButton} from '../../../hooks/useAndroidButton';
import {BackHandler, Image, StyleSheet} from 'react-native';
import images from '../../../assets';
import Employees from '../MerchantScreens/Employees';

const Tab = createBottomTabNavigator();

function BottomStack() {
  const renderHomeIcon = () => {
    return ({focused}: any) => {
      return (
        <Image
          source={images.Home}
          style={[styles.image, {tintColor: focused ? 'white' : 'black'}]}
        />
      );
    };
  };
  const renderEmployeesIcon = () => {
    return ({focused}: any) => {
      return (
        <Image
          source={images.Group_Users}
          style={[styles.groupImage, {tintColor: focused ? 'white' : 'black'}]}
        />
      );
    };
  };
  const renderLedgerIcon = () => {
    return ({focused}: any) => {
      return (
        <Image
          source={images.Ledger}
          style={[styles.image, {tintColor: focused ? 'white' : 'black'}]}
        />
      );
    };
  };
  const renderProfileIcon = () => {
    return ({focused}: any) => {
      return (
        <Image
          source={images.Profile}
          style={[styles.image, {tintColor: focused ? 'white' : 'black'}]}
        />
      );
    };
  };

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="SellerDashboard"
        component={SellerDashboard}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderHomeIcon(),
          tabBarStyle: {backgroundColor: '#E65629'},
        }}
      />
      <Tab.Screen
        name="Employess"
        component={Employees}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderEmployeesIcon(),
          tabBarStyle: {backgroundColor: '#E65629'},
        }}
      />
      <Tab.Screen
        name="Ledger"
        component={Ledger}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderLedgerIcon(),
          tabBarStyle: {backgroundColor: '#E65629'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: '',
          tabBarIcon: renderProfileIcon(),
          tabBarStyle: {backgroundColor: '#E65629'},
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    objectFit: 'contain',
    width: 30,
    height: 30,
  },
  groupImage: {
    marginTop: 10,
    objectFit: 'contain',
    width: 50,
    height: 50,
  },
});

export default BottomStack;
