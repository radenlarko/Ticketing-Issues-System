import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import Router from './router';
import RootRouter from './router/RootRouter';

const App = () => {
  return (
    <NavigationContainer>
      {/* <Router /> */}
      <RootRouter />
    </NavigationContainer>
  );
};

export default App;
