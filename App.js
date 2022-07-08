import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Intro from './app/screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './app/screens/NoteScreen';
const App = () => {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
   
  }, []);

  if (!user.name) return <Intro onFinish={findUser} />;

  return <NoteScreen user={user} />;
};

export default App;
