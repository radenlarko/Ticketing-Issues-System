import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import MainTabApp from './MainTabApp';
import DrawerContent from './DrawerContent';

const Router = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeDrawer"
      drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={MainTabApp} />
    </Drawer.Navigator>
  );
};

export default Router;

const styles = StyleSheet.create({});