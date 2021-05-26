import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { IconAdd, IconMenu, IconMenu2, LogoWhite } from '../../assets';
import { useNavigation } from '@react-navigation/native';

const HeaderMenu = (props) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity onPress={props.leftButtonNav || (() => navigation.openDrawer())}>
            {props.leftButton || <IconMenu />}
            {/* <IconMenu2 /> */}
          </TouchableOpacity>
          <Image style={styles.logo} source={LogoWhite} />
          <TouchableOpacity onPress={props.rightButtonNav || (() => navigation.navigate('AddIssues'))}>
            {props.rightButton || <IconAdd />}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.roundShape}></View>
      <View style={{ marginBottom: -30 }}></View>
    </>
  );
};

export default HeaderMenu;

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width: 77,
    height: 22.94,
  },
  container: {
    backgroundColor: '#055F9D',
    height: 75,
    paddingTop: ScreenHeight * 0.012,
    paddingHorizontal: ScreenWidth * 0.07,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundShape: {
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 30,
    marginTop: -30,
  },
});
