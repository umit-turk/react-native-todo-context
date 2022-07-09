import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Intro from './app/screens/Intro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteScreen from './app/screens/NoteScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NoteDetail from './app/components/NoteDetail';

const Stack = createNativeStackNavigator();

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

  const renderNoteScreen = props => <NoteScreen {...props} user={user} />;

  if (!user.name) return <Intro onFinish={findUser} />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitle:'', headerTransparent:true}}>
        <Stack.Screen component={renderNoteScreen} name="NoteScreen" />
        <Stack.Screen component={NoteDetail} name="NoteDetail" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
