import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNotes} from '../context/NoteProvider';

const formatDate = ms => {
  const date = new Date(ms);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hrs = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${day}/${month}/${year}-${hrs}:${min}:${sec}`;
};

const NoteDetail = props => {
  const note = props.route.params;
  const headerHeight = useHeaderHeight();
  const {setNotes} = useNotes();

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem('notes');
    let notes = [];
    if (result !== null) notes = JSON.parse(result);
    const newNotes = notes.filter(n => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      'Are You Sure!',
      'This action will delete your note permanently',
      [
        {
          text: 'Delete',
          onPress: deleteNote,
        },
        {
          text: 'No Thanks',
          onPress: () => console.log('no thanks'),
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, {paddingTop: headerHeight}]}>
        <Text style={styles.time}>{`Created At ${formatDate(note.time)}`}</Text>
        <Text style={styles.title}>{note?.title}</Text>
        <Text style={styles.desc}>{note?.desc}</Text>
      </ScrollView>

      <View style={styles.btnContainer}>
        <RoundIconBtn
          IconName={'delete'}
          style={{backgroundColor: colors.ERROR, marginBottom: 15}}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          IconName={'edit'}
          style={{backgroundColor: colors.PRIMARY}}
          onPress={() => console.log('edit')}
        />
      </View>
    </>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  desc: {
    fontSize: 20,
    opacity: 0.6,
  },
  time: {
    textAlign: 'right',
    fontSize: 12,
    opacity: 0.5,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
});
