import React, { useEffect, useMemo, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './router';
import RootRouter from './router/RootRouter';
import { AuthContext } from './components/AuthContext';
import { Splash2 } from './pages';

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async (login) => {
        // setUserToken('jadhajd'),
        // setIsLoading(false)
        const userToken = String(login.token);
        const userName = login.username;
        try {
          await AsyncStorage.setItem('userToken', userToken)
        } catch (err) {
          console.log(err);
        }
        console.log('user token: ', userToken);
        dispatch({ type: 'LOGIN', id: userName, token: userToken });
      },
      signOut: async () => {
        // setUserToken(null),
        // setIsLoading(false)
        try {
          const getTokenLogout = await AsyncStorage.getItem('userToken')
          console.log(`token logout : ${getTokenLogout}`)
          await fetch('http://localhost:8000/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
              token: String(getTokenLogout)
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              if(json.code === 200){
                console.log(json.code + ' ' + json.message)
                AsyncStorage.removeItem('userToken');
              } else if (json.code === 403){
                console.log(json.code + ' ' + json.message)
                Alert.alert(String(json.code), json.message, [
                  { text: 'Ok' }
                ]);
              } else {
                console.log('gagal logout dari Server')
                Alert.alert('Error!', 'gagal logout dari Server', [
                  { text: 'Ok' }
                ]);
              }
            });
        } catch (err) {
          console.log(err);
        }
        dispatch({ type: 'LOGOUT' });
      },
      signUp: () => {
        // setUserToken('jadhajd'),
        // setIsLoading(false)
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false)
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        console.log(err);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <Splash2 />
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ?
          <Router />
          : <RootRouter />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
