import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../components/AuthContext';
// import Users from '../../models/Users';

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    username: '',
    token: '',
  });

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true
  });

  const { signIn } = useContext(AuthContext);

  const textInputChange = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      })
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = async () => {
    setLoading(true);
    const dataLogin = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    try {
      await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(dataLogin),
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log(json.user);
          setLoading(false);
          if (json.errors) {
            Alert.alert('Wrong Input!', 'Username or Password field cannot be empty', [
              { text: 'Ok' }
            ]);
            console.log('Email or Password cannot be empty!')
          } else {
            if (json.data === null) {
              Alert.alert(String(json.code), json.message, [
                { text: 'Ok' }
              ]);
              console.log(json.code + ' ' + json.message);
              setLogin({
                email: '',
                username: '',
                token: '',
              });
            } else {
              setLogin(json.user);
              console.log(`Token: ${login.token}`)
            }
          }
        });
    } catch (error) {
      console.log('error 404 : ', error);
      Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
        { text: 'Ok' }
      ]);
      
    }
    if (login.token.length === 0) {
      console.log('gagal login')
    } else {
      signIn(login);
    }
  }

  const handleValidUser = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const handleValidPassword = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        isValidPassword: false
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 50,
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        Sign In Screen
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user" color="grey" size={20} />
        <TextInput
          placeholder="enter your email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => textInputChange(value)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_textInputChange ?
          <Feather name="check-circle" color="#24e35e" size={16} />
          : null}
      </View>
      {data.isValidUser ? null :
        <View>
          <Text style={styles.errMsg}>Email must be in the correct format.</Text>
        </View>
      }
      <View style={styles.action}>
        <FontAwesome name="lock" color="grey" size={22} />
        <TextInput
          placeholder="enter your password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handlePasswordChange(value)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
              <Feather name="eye" color="grey" size={16} />
            )}
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null :
        <View>
          <Text style={styles.errMsg}>Password must be 8 characters long.</Text>
        </View>
      }
      <TouchableOpacity onPress={() => { loginHandle() }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{loading ? 'loading...' : 'Sign In'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <View style={[styles.button, { backgroundColor: 'grey' }]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginVertical: 20 }}></View>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#242424',
  },
  action: {
    flexDirection: 'row',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    paddingBottom: 5,
  },
  button: {
    backgroundColor: '#055F9D',
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  errMsg: {
    fontSize: 12,
    color: '#ed0c2a'
  }
});
