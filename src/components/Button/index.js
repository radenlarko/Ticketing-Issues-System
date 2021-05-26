import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

const Button = (props) => {
  return (
    <TouchableOpacity
      onPress={props.navigasi || (() => Alert.alert('Success!!', 'Button Clicked'))}>
      <View style={styles.button}>
        <Text style={styles.textButton}>{props.label || "button"}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFAC4C',
    minWidth: 118,
    height: 26,
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  textButton: {
    color: '#055F9D',
    textAlign: 'center',
  },
});
