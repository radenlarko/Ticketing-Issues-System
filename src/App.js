import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App