import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, SignUp, Splash, Splash2 } from '../pages';

const RootStack = createStackNavigator();
const Drawer = createDrawerNavigator();

import MainTabApp from './MainTabApp';
import DrawerContent from './DrawerContent';
import { AuthContext } from '../components/AuthContext';

const Router = () => {
  const authContext = React.useContext(AuthContext);

  if (authContext.isLoading) {
    return <Splash2 />;
  }

  if (!authContext.userToken) {
    return (
      <RootStack.Navigator headerMode="none" initialRouteName="Splash">
        <RootStack.Screen name="Splash" component={Splash} />
        <RootStack.Screen name="SignIn" component={SignIn} />
        <RootStack.Screen name="SignUp" component={SignUp} />
      </RootStack.Navigator>
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
