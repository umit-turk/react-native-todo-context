import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {useHeaderHeight} from '@react-navigation/elements'

const NoteDetail = (props) => {
  const note = props.route.params
  const headerHeight = useHeaderHeight()
  return (
    <View style={[styles.container, {paddingTop:headerHeight}]}>
      <Text>{note?.title}</Text>
      <Text>{note?.desc}</Text>
    </View>
  );
};

export default NoteDetail;

const styles = StyleSheet.create({
    container:{

    },
})
