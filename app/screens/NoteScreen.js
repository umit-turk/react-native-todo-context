import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';

const NoteScreen = ({user}) => {
  const [greet, setGreet] = useState('Evening');
  const [modalVisible, setModalVisible] = useState(false);
  const [notes, setNotes] = useState([]);

  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet('Morning');
    if (hours === 1 || hours < 17) return setGreet('Afternoon');
    setGreet('Evening');
  };

  const findNotes = async () => {
    const result = await AsyncStorage.getItem('notes');
    console.log(result);
    if (result !== null) setNotes(JSON.parse(result));
  };

  useEffect(() => {
    
    findNotes();
    findGreet();
  }, []);

  const handleOnSubmit = async (title, desc) => {
    const note = {id: Date.now(), title, desc, time: Date.now()};
    const updateNotes = [...notes, note];
    setNotes(updateNotes);
    await AsyncStorage.setItem('notes', JSON.stringify(updateNotes));
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.LIGHT} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {notes.length ? (
            <SearchBar containerStyle={{marginVertical: 15}} />
          ) : null}

          <FlatList
            data={notes}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              marginBottom: 15,
            }}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Note item={item} />}
          />
          {!notes.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}>
              <Text style={styles.emptyHeader}>Add Notes</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        IconName={'add-circle-outline'}
        style={styles.addBtn}
      />
      <NoteInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default NoteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },
  emptyHeader: {
    fontSize: 30,
    color: 'black',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  addBtn: {
    position: 'absolute',
    right: 20,
    bottom: 50,
  },
});
