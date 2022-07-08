import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Intro from './app/screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
const App = () => {
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    console.log(result);
  };

  useEffect(() => {
    findUser();
  }, []);

  return <Intro />;
};

export default App;
