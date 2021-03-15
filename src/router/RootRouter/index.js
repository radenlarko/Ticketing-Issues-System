import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignIn, SignUp, Splash } from '../../pages';

const RootStack = createStackNavigator();

const RootRouter = () => {
  return (
    <RootStack.Navigator headerMode='none' initialRouteName="Splash" >
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
    </RootStack.Navigator>
  )
};

export default RootRouter;