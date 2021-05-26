import React, {useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Splash2 } from '../pages';
import RootRouter from './RootRouter';

const Drawer = createDrawerNavigator();

import MainTabApp from './MainTabApp';
import DrawerContent from './DrawerContent';
import { AuthContext } from '../components/AuthContext';

const Router = () => {
  const authContext = useContext(AuthContext);

  if (authContext.isLoading) {
    return <Splash2 />;
  }

  if (!authContext.userToken) {
    return (
      <RootRouter />
    );
  }

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
