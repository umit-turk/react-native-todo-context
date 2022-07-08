import {View, Text, StyleSheet, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';

const NoteScreen = ({user}) => {
  const [greet, setGreet] = useState('Evening');

  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet('Morning');
    if (hours === 1 || hours < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };
  useEffect(() => {
    findGreet();
  }, []);

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.LIGHT} />
      <View style={styles.container}>
        <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
        <SearchBar containerStyle={{marginVertical: 15}} />
        <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
          <Text style={styles.emptyHeader}>Add Notes</Text>
          <RoundIconBtn onPress={() => console.log('opening modal')} IconName={"add-circle-outline"} style={styles.addBtn} />
        </View>
      </View>
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  emptyHeaderContainer: {
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    zIndex:-1,
  },
  emptyHeader: {
    fontSize: 30,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  addBtn:{
    position:"absolute",
    right:20,
    bottom:50,
  }
});
