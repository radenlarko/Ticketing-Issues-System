import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Issues, Account, Splash, DetailsIssues, AddIssues } from '../pages';
import { BottomNavigator } from '../components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Issues" component={Issues} />
            <Tab.Screen name="Account" component={Account} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
            <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}} />
            <Stack.Screen name="DetailsIssues" component={DetailsIssues} options={{headerShown: false}} />
            <Stack.Screen name="AddIssues" component={AddIssues} options={{headerShown: false}} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({})
