import React, { createContext, useEffect } from 'react';
import { useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const initialLoginState = {
  isLoading: true,
  userName: null,
  userEmail: null,
  userToken: null,
  openIssue: 0,
  closeIssue: 0,
  dataApi: [],
  dataSearch: '',
  signIn: () => null,
  signOut: () => null,
  signUp: () => null,
  getData: () => null,
  searchData: () => null,
};

export const AuthContext = createContext(initialLoginState);

const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        userEmail: null,
        userToken: null,
        dataApi: [],
        dataSearch: '',
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userName: action.username,
        userEmail: action.email,
        userToken: action.token,
        isLoading: false,
      };
    case 'GETDATA':
      return {
        ...prevState,
        dataApi: action.data,
        openIssue: action.open,
        closeIssue: action.close,
        isLoading: false,
      };
    case 'SEARCHDATA':
      return {
        ...prevState,
        dataSearch: action.search,
        isLoading: false,
      };
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let userName = null;
      let userEmail = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        userName = await AsyncStorage.getItem('userName');
        userEmail = await AsyncStorage.getItem('userEmail');
      } catch (err) {
        console.log(err);
      }
      console.log('user token: ', userToken);
      console.log('user name: ', userName);
      console.log('user email: ', userEmail);
      dispatch({
        type: 'RETRIEVE_TOKEN',
        username: userName,
        email: userEmail,
        token: userToken,
      });
    }, 1000);
  }, []);

  const signIn = async (emailField, password) => {
    try {
      const dataLogin = {
        user: {
          email: emailField,
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

      const { username, email, token } = data.user;
      dispatch({ type: 'LOGIN', username, email, token });
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('userEmail', email);

      // Alert.alert('Login success!', `Welcome back ${username}`, [
      //   { text: 'Ok' },
      // ]);

      return Promise.resolve(data.user);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const signOut = async (token) => {
    try {
      const getTokenLogout = token;
      console.log('token logout: ', getTokenLogout);
      const response = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          token: String(getTokenLogout),
        }),
      });

      const data = await response.json();

      if (data.code === 403) {
        return Promise.reject(data);
      }

      dispatch({ type: 'lOGOUT' });
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
      console.log(data.code + ' ' + data.message);

      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const dataRegister = {
        user: {
          username,
          email,
          password,
        },
      };
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(dataRegister),
      });

      const data = await response.json();
      if (data.error) {
        return Promise.reject(data);
      }

      return Promise.resolve(data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const endpoint = 'http://127.0.0.1:8000/api';
  const getData = async (token) => {
    try {
      let response = await fetch(`${endpoint}/ticket/ticketuser`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `token ${token}`,
        },
      });
      const data = await response.json();
      // console.log('data store: ', data.tickets);

      const newIssue = data.tickets.filter((data) => data.statuses_id == 1).length;
      const assignIssue = data.tickets.filter((data) => data.statuses_id == 2).length;
      const resolveIssue = data.tickets.filter((data) => data.statuses_id == 3).length;
      const closedIssue = data.tickets.filter((data) => data.statuses_id == 4).length;
      const openedIssue = newIssue + assignIssue + resolveIssue;

      if (data.errors) {
        return Promise.reject(data, newIssue, assignIssue, resolveIssue, closedIssue, openedIssue);
      }

      dispatch({ type: 'GETDATA', data: data.tickets, open: openedIssue, close: closedIssue });

      return Promise.resolve(data.tickets);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  const searchData = (search) => {
    try {
      dispatch({ type: 'SEARCHDATA', search });
      return Promise.resolve(search);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signOut, signUp, getData, searchData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
