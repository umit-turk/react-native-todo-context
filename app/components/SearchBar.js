import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../misc/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.searchBar}
        placeholder="Search here..."
      />
      {value ? (
        <Icon
          name={'close'}
          size={20}
          color={colors.PRIMARY}
          onPress={onClear}
          style={styles.clear}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 20,
    paddingVertical: 0,
  },
  clear:{
    position:'absolute',
    right:10,
  },
  container:{
    justifyContent:"center"
  }
});
