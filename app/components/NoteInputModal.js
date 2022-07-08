import {
  View,
  Text,
  Modal,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';

const NoteInputModal = ({visible, onClose, onSubmit}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'title') setTitle(text);
    if (valueFor === 'desc') setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();
    onSubmit(title, desc);
    setTitle('');
    setDesc('');
    onClose();
  };

  const closeModal = () => {
    setTitle('');
    setDesc('');
    onClose();
  }

  return (
    <>
      <StatusBar />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <TextInput
            autoCorrect={false}
            placeholder="Title"
            style={[styles.input, styles.title]}
            onChangeText={text => handleOnChangeText(text, 'title')}
            value={title}
          />

          <TextInput
            autoCorrect={false}
            multiline
            placeholder="Note"
            style={[styles.input, styles.desc]}
            onChangeText={text => handleOnChangeText(text, 'desc')}
            value={desc}
          />
          <View style={styles.btnContainer}>
            {title && desc ? (
              <RoundIconBtn
                IconName={'check'}
                size={15}
                onPress={handleSubmit}
              />
            ) : null}
            <RoundIconBtn
              IconName={'close'}
              size={15}
              style={{marginLeft: 15}}
              onPress={closeModal}
            />
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBg, StyleSheet.absoluteFillObject]}></View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default NoteInputModal;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    fontSize: 20,
    color: colors.DARK,
  },
  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  desc: {
    height: 100,
  },
  modalBg: {
    flex: 1,
    zIndex: -1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
