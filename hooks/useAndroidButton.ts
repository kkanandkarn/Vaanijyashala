import {useEffect} from 'react';
import {BackHandler} from 'react-native';
const useAndroidBackButton = (onPress: Function, dependencies: any = []) => {
  const onBackPress = () => {
    onPress(); 
    return true;
  };
 
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, dependencies);
};
export {useAndroidBackButton};
 