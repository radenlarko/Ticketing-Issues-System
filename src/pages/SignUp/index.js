import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const SignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_pass: '',
    check_userInputChange: false,
    check_emailInputChange: false,
    securePassword: true,
    secureConfirm_Pass: true,
    isValidUser: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirm_Pass: true,
  });

  const userInputChange = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        username: value,
        check_userInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        check_userInputChange: false,
        isValidUser: false,
      });
    }
  };

  const emailInputChange = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        email: value,
        check_emailInputChange: true,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_emailInputChange: false,
        isValidEmail: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const handleConfirm_PassChange = (value) => {
    if (value === data.password) {
      setData({
        ...data,
        confirm_pass: value,
        isValidConfirm_Pass: true,
      });
    } else {
      setData({
        ...data,
        confirm_pass: value,
        isValidConfirm_Pass: false,
      });
    }
  };

  const updateSecurePassword = () => {
    setData({
      ...data,
      securePassword: !data.securePassword,
    });
  };

  const updateSecureConfirm_pass = () => {
    setData({
      ...data,
      secureConfirm_Pass: !data.secureConfirm_Pass,
    });
  };

  const registerHandle = async () => {
    setLoading(true);
    const dataRegister = {
      user: {
        username: data.username,
        email: data.email,
        password: data.confirm_pass,
      },
    };
    if(data.password === data.confirm_pass){
      try {
        await fetch('http://localhost:8000/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify(dataRegister)
        })
        .then((response) => response.json())
        .then((json) => {
          setLoading(false);
          if(json.user){
            console.log('berhasil daftar ', json.user.email)
            Alert.alert('Berhasil!', `Berhasil daftar ${json.user.email}`, [
              { text: 'Ok' }
            ]);
            navigation.navigate('SignIn')
          }else if(json.errors){
            console.log('Form tidak boleh kosong!!')
            Alert.alert('Error!', 'Form tidak boleh kosong!!', [
              { text: 'Ok' }
            ]);
          }else{
            console.log('Gagal Register!!')
            Alert.alert('Error!', 'Gagal Register!!', [
              { text: 'Ok' }
            ]);
          }
        })
      } catch (error) {
        console.log(error);
      }
    }else{
      setLoading(false);
      Alert.alert('Error!', 'Registration failed!!', [
        { text: 'Ok' }
      ]);
      console.log('Password tidak sama!!')
    }
  };

  const handleValidUser = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const handleValidEmail = (value) => {
    if (value.trim().length >= 6) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };

  const handleValidPassword = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };

  const handleValidConfirm_Pass = (value) => {
    if (value === data.password) {
      setData({
        ...data,
        isValidConfirm_pass: true,
      });
    } else {
      setData({
        ...data,
        isValidConfirm_pass: false,
      });
    }
  };

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
        Sign Up Screen
      </Text>
      <View style={styles.action}>
        <FontAwesome name="user" color="grey" size={20} />
        <TextInput
          placeholder="enter your username"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => userInputChange(value)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_userInputChange ? (
          <Feather name="check-circle" color="#24e35e" size={16} />
        ) : null}
      </View>
      {data.isValidUser ? null : (
        <View>
          <Text style={styles.errMsg}>Username minimum 6 characters long.</Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="user" color="grey" size={20} />
        <TextInput
          placeholder="enter your email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => emailInputChange(value)}
          onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
        />
        {data.check_emailInputChange ? (
          <Feather name="check-circle" color="#24e35e" size={16} />
        ) : null}
      </View>
      {data.isValidEmail ? null : (
        <View>
          <Text style={styles.errMsg}>
            Email must be in the correct format.
          </Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="lock" color="grey" size={22} />
        <TextInput
          placeholder="enter your password"
          secureTextEntry={data.securePassword ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handlePasswordChange(value)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={updateSecurePassword}>
          {data.securePassword ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
            <Feather name="eye" color="grey" size={16} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null : (
        <View>
          <Text style={styles.errMsg}>Password must be 8 characters long.</Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="lock" color="grey" size={22} />
        <TextInput
          placeholder="confirm your password"
          secureTextEntry={data.secureConfirm_Pass ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handleConfirm_PassChange(value)}
          onEndEditing={(e) => handleValidConfirm_Pass(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={updateSecureConfirm_pass}>
          {data.secureConfirm_Pass ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
            <Feather name="eye" color="grey" size={16} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidConfirm_Pass ? null : (
        <View>
          <Text style={styles.errMsg}>
            Password confirmation does not match!
          </Text>
        </View>
      )}
      <TouchableOpacity onPress={() => registerHandle()}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign Up'}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <View style={[styles.button, {backgroundColor: 'grey'}]}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <View style={{marginVertical: 20}}></View>
    </ScrollView>
  );
};

export default SignUp;

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
    color: '#ed0c2a',
  },
});
