import React, {useEffect, useMemo, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';
import RootRouter from './router/RootRouter';
import {AuthContext} from './components/AuthContext';
import {Splash2} from './pages';

const App = () => {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
    userEmail: null,
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
          userEmail: action.email,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userEmail: null,
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
      signIn: async (email, password) => {
        // setUserToken('jadhajd'),
        // setIsLoading(false)
        const dataLogin = {
          user: {
            email,
            password,
          },
        };
        try {
          const response = await fetch(
            'http://localhost:8000/api/users/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
              },
              body: JSON.stringify(dataLogin),
            },
          );

          const data = await response.json();
          console.log(data);

          if (data.data === null) {
            return Promise.reject(data);
          }

          const {username, token, email} = data.user;
          dispatch({type: 'LOGIN', id: username, token, email});
          await AsyncStorage.setItem('userToken', token);
          await AsyncStorage.setItem('userName', username);
          await AsyncStorage.setItem('userEmail', email);

          // Alert.alert('Login success!', `Welcome back ${username}`, [
          //   {text: 'Ok'},
          // ]);

          return Promise.resolve(data.user);
        } catch (error) {
          console.log(error);
          return Promise.reject(error);
        }
      },
      signOut: async () => {
        // setUserToken(null),
        // setIsLoading(false)
        try {
          const getTokenLogout = await AsyncStorage.getItem('userToken');
          console.log(`token logout : ${getTokenLogout}`);
          await fetch('http://localhost:8000/api/users/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
            },
            body: JSON.stringify({
              token: String(getTokenLogout),
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              if (json.code === 200) {
                console.log(json.code + ' ' + json.message);
                AsyncStorage.removeItem('userToken');
                AsyncStorage.removeItem('userName');
                AsyncStorage.removeItem('userEmail');
              } else if (json.code === 403) {
                console.log(json.code + ' ' + json.message);
                Alert.alert(String(json.code), json.message, [{text: 'Ok'}]);
              } else {
                console.log('gagal logout dari Server');
                Alert.alert('Error!', 'gagal logout dari Server', [
                  {text: 'Ok'},
                ]);
              }
            });
        } catch (err) {
          console.log(err);
        }
        dispatch({type: 'LOGOUT'});
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
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return <Splash2 />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? <Router /> : <RootRouter />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
