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
  StatusBar,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../components/AuthContext';
import { BgLogin, IconAccountRoot } from '../../assets';
import { MyButton } from '../../components';

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useContext(AuthContext);

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
    if (value.includes(' ') || value.includes('.')) {
      setData({
        ...data,
        username: value,
        check_userInputChange: false,
        isValidUser: false,
      });
    } else if (value.trim().length >= 6) {
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
    if (value.trim().length >= 6 && value.includes('@') && value.includes('.com') || value.includes('.co.id')) {
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
    if (!data.username || !data.email || !data.password || !data.confirm_pass) {
      Alert.alert('Wrong Input!', 'Field cannot be empty', [{ text: 'Ok' }]);

      setLoading(false);
      return null;
    }

    if (!data.isValidUser) {
      Alert.alert(
        'Error!',
        'Username must be at least 6 characters long and must not contain spaces and dots',
        [{ text: 'Ok' }],
      );

      setLoading(false);
      return null;
    }

    if (!data.isValidEmail) {
      Alert.alert(
        'Error!',
        'Email must be in the correct format',
        [{ text: 'Ok' }],
      );

      setLoading(false);
      return null;
    }

    if (!data.isValidPassword) {
      Alert.alert(
        'Error!',
        'Password must be at least 8 character long',
        [{ text: 'Ok' }],
      );

      setLoading(false);
      return null;
    }

    if (data.password !== data.confirm_pass) {
      Alert.alert('Wrong Input!', 'Password does not match', [{ text: 'Ok' }]);

      setLoading(false);
      return null;
    }

    try {
      const register = await signUp(
        data.username,
        data.email,
        data.confirm_pass,
      );
      Alert.alert('Berhasil!', `Berhasil daftar akun ${data.email}`, [
        { text: 'Ok' },
      ]);
      navigation.navigate('SignIn');
      return Promise.resolve(register);
    } catch (error) {
      if (error.error) {
        console.log('Form tidak boleh kosong!!');
        Alert.alert('Error!', 'Field cannot be empty!!', [{ text: 'Ok' }]);
      } else if (error.errors) {
        console.log('username has already been taken');
        Alert.alert('Error!', 'username has already been taken', [{ text: 'Ok' }]);
      } else {
        console.log('Gagal Register!!');
        Alert.alert('Error!', 'Registration failed!!', [{ text: 'Ok' }]);
      }
      setLoading(false);
    }
  };

  const handleValidUser = (value) => {
    if (value.includes(' ') || value.includes('.')) {
      setData({
        ...data,
        isValidUser: false,
      });
    } else if (value.trim().length >= 6) {
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
    if (value.trim().length >= 6 && value.includes('@') && value.includes('.com') || value.includes('.co.id')) {
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
    <ImageBackground source={BgLogin} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#055f9d" />
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <IconAccountRoot />
        <Text
          style={{
            textAlign: 'center',
              fontSize: 32,
              color: 'white',
          }}>
          Register
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user" color="white" size={20} />
        <TextInput
          placeholder="enter your username"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => userInputChange(value)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
        />
        {data.check_userInputChange ? (
          <Feather name="check-circle" color="#24e35e" size={16} style={{ marginLeft: -30 }} />
        ) : (
          <Feather name="check-circle" color="white" size={16} style={{ marginLeft: -30 }} />
        )}
      </View>
      {data.isValidUser ? null : (
        <View style={{marginLeft: 24}}>
          <Text style={styles.errMsg}>Username must be at least 6 characters long and must not contain spaces and dots.</Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="user" color="white" size={20} />
        <TextInput
          placeholder="enter your email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => emailInputChange(value)}
          onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
          keyboardType="email-address"
        />
        {data.check_emailInputChange ? (
          <Feather name="check-circle" color="#24e35e" size={16} style={{ marginLeft: -30 }} />
        ) : (
          <Feather name="check-circle" color="white" size={16} style={{ marginLeft: -30 }} />
        )}
      </View>
      {data.isValidEmail ? null : (
        <View style={{marginLeft: 24}}>
          <Text style={styles.errMsg}>
            Email must be in the correct format.
          </Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="lock" color="white" size={22} />
        <TextInput
          placeholder="enter your password"
          secureTextEntry={data.securePassword ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handlePasswordChange(value)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={updateSecurePassword} style={{ marginLeft: -30 }}>
          {data.securePassword ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
            <Feather name="eye" color="grey" size={16} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidPassword ? null : (
        <View style={{marginLeft: 24}}>
          <Text style={styles.errMsg}>Password must be 8 characters long.</Text>
        </View>
      )}
      <View style={styles.action}>
        <FontAwesome name="lock" color="white" size={22} />
        <TextInput
          placeholder="confirm your password"
          secureTextEntry={data.secureConfirm_Pass ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handleConfirm_PassChange(value)}
          onEndEditing={(e) => handleValidConfirm_Pass(e.nativeEvent.text)}
        />
        <TouchableOpacity onPress={updateSecureConfirm_pass} style={{ marginLeft: -30 }}>
          {data.secureConfirm_Pass ? (
            <Feather name="eye-off" color="grey" size={16} />
          ) : (
            <Feather name="eye" color="grey" size={16} />
          )}
        </TouchableOpacity>
      </View>
      {data.isValidConfirm_Pass ? null : (
        <View style={{marginLeft: 24}}>
          <Text style={styles.errMsg}>
            Password confirmation does not match!
          </Text>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 30,
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'flex-start'}}>
          <Text style={{color: 'white', fontSize: 10}}>already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={[styles.buttonText, { textDecorationLine: 'underline', fontSize: 14 }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <MyButton 
          label={loading ? 'Loading...' : 'Sign Up'}
          navigasi={registerHandle}
        />
        </View>
      <View style={{ marginVertical: 20 }}></View>
    </ImageBackground>
  );
};

export default SignUp;

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },
  textInput: {
    width: ScreenWidth * 0.8,
    marginTop: Platform.OS === 'ios' ? 0 : -15,
    marginLeft: 10,
    paddingLeft: 10,
    color: '#242424',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  action: {
    flexDirection: 'row',
    marginTop: 30,
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
