import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
};

export const AuthContext = createContext(initialLoginState);

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

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
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

  // useEffect(() => {
  //   AsyncStorage.removeItem('userToken');
  // }, [])

  const signIn = async (email, password) => {
    try {
      const dataLogin = {
        user: {
          email: email,
          password: password,
        },
      };
      console.log(dataLogin);

      const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(dataLogin),
      });

      const data = await response.json();
      console.log(data);

      if (data.data === null) {
        return Promise.reject(data);
      }

      const { username, token } = data.user;
      dispatch({ type: 'LOGIN', id: username, token });
      await AsyncStorage.setItem('userToken', token);

      return Promise.resolve(data.user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const signOut = async () => {
    // setUserToken(null),
    // setIsLoading(false)
    // try {
    //   const getTokenLogout = await AsyncStorage.getItem('userToken');
    //   console.log(`token logout : ${getTokenLogout}`);
    //   await fetch('http://localhost:8000/api/users/logout', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'X-Requested-With': 'XMLHttpRequest',
    //     },
    //     body: JSON.stringify({
    //       token: String(getTokenLogout),
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json);
    //       if (json.code === 200) {
    //         console.log(json.code + ' ' + json.message);
    //         AsyncStorage.removeItem('userToken');
    //       } else if (json.code === 403) {
    //         console.log(json.code + ' ' + json.message);
    //         Alert.alert(String(json.code), json.message, [{text: 'Ok'}]);
    //       } else {
    //         console.log('gagal logout dari Server');
    //         Alert.alert('Error!', 'gagal logout dari Server', [{text: 'Ok'}]);
    //       }
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
    // dispatch({type: 'LOGOUT'});
  };

  const signUp = () => {
    // setUserToken('jadhajd'),
    // setIsLoading(false)
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
