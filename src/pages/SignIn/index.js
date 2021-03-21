import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../components/AuthContext';

const SignIn = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const { signIn } = useContext(AuthContext);

  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (userName, password) => {
    signIn(userName, password);
  }

  return (
    <ScrollView style={styles.container}>
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
        />
        {data.check_textInputChange ?
        <Feather name="check-circle" color="#24e35e" size={16} />
        : null}
      </View>
      <View style={styles.action}>
        <FontAwesome name="lock" color="grey" size={22} />
        <TextInput
          placeholder="enter your password"
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handlePasswordChange(value)}
        />
        <TouchableOpacity onPress={updateSecureTextEntry}>
          {data.secureTextEntry ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
            <Feather name="eye" color="grey" size={16} />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => {loginHandle(data.email, data.password)}}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <View style={[styles.button, {backgroundColor: 'grey'}]}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginVertical: 20}}></View>
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
});
