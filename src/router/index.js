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

// import React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack';
// import { Splash, DetailsIssues, AddIssues } from '../pages';
// import MainTabApp from './MainTabApp';

// const Stack = createStackNavigator();

// const Router = () => {
//     return (
//         <Stack.Navigator initialRouteName="Splash">
//             <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
//             <Stack.Screen name="MainTabApp" component={MainTabApp} options={{headerShown: false}} />
//             <Stack.Screen name="DetailsIssues" component={DetailsIssues} options={{headerShown: false}} />
//             <Stack.Screen name="AddIssues" component={AddIssues} options={{headerShown: false}} />
//         </Stack.Navigator>
//     )
// }

// export default Router

// const styles = StyleSheet.create({})
