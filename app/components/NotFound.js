import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotFound = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject ,styles.container]}>
      <Icon name={'sentiment-very-dissatisfied'} size={90} color='black' />
      <Text style={{marginTop:20, fontSize:20}}>Result Not Found</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        opacity:0.5,
        zIndex:-1,
    },
})
