import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../misc/colors';

const RoundIconBtn = ({IconName, size, color, style,onPress}) => {
  return (
    <Icon
      name={IconName}
      size={size || 24}
      color={color || colors.DARK}
      style={[styles.icon, {...style}]}
      onPress={onPress}
    />
  );
};

export default RoundIconBtn;

const styles = StyleSheet.create({
    icon: {
        backgroundColor:colors.PRIMARY,
        padding:15,
        borderRadius:50,
        elevation:5,
    },
})
