import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigator } from '../../components';
import { Home, Issues, Account, AddIssues, DetailsIssues } from '../../pages';

const HomeStack = createStackNavigator();
const IssuesStack = createStackNavigator();
const AccountStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabApp = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Issues" component={IssuesStackScreen} />
            <Tab.Screen name="Account" component={AccountStackScreen} />
        </Tab.Navigator>
    )
}

const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator initialRouteName="Home" >
          <HomeStack.Screen name="Home" component={Home} options={{headerShown: false, animationEnabled: false}} />
      </HomeStack.Navigator>
    )
  }

const IssuesStackScreen = () => {
    return (
      <IssuesStack.Navigator initialRouteName="Issues" >
          <IssuesStack.Screen name="Issues" component={Issues} options={{headerShown: false, animationEnabled: false}} />
          <IssuesStack.Screen name="AddIssues" component={AddIssues} options={{headerShown: false, animationEnabled: false}} />
          <IssuesStack.Screen name="DetailsIssues" component={DetailsIssues} options={{headerShown: false, animationEnabled: false}} />
      </IssuesStack.Navigator>
    )
  }

const AccountStackScreen = () => {
    return (
      <AccountStack.Navigator >
          <AccountStack.Screen name="Account" component={Account} options={{headerShown: false, animationEnabled: false}} />
      </AccountStack.Navigator>
    )
  }

export default MainTabApp

const styles = StyleSheet.create({})