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
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../components/AuthContext';
import { BgLogin, IconAccountRoot } from '../../assets';
import { MyButton } from '../../components';

const SignIn = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { signIn } = useContext(AuthContext);

  const textInputChange = (value) => {
    if (value.trim().length >= 6 && value.includes('@') && value.includes('.com') || value.includes('.co.id')) {
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
      });
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

  const loginHandle = React.useCallback(async () => {
    setLoading(true);

    if (!data.email || !data.password) {
      Alert.alert(
        'Wrong Input!',
        'Username or Password field cannot be empty',
        [{ text: 'Ok' }],
      );

      setLoading(false);
      return null;
    }

    if (!data.isValidUser) {
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
        'Password must be 8 character long',
        [{ text: 'Ok' }],
      );

      setLoading(false);
      return null;
    }

    try {
      const user = await signIn(data.email, data.password);

      return Promise.resolve(user);
    } catch (error) {
      if (error.data === null) {
        Alert.alert(String(error.code), error.message, [{ text: 'Ok' }]);
      } else {
        Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
          { text: 'Ok' },
        ]);
      }

      setLoading(false);
    }
  }, [data, setLoading, signIn]);

  const handleValidUser = (value) => {
    if (value.trim().length >= 6 && value.includes('@') && value.includes('.com') || value.includes('.co.id')) {
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

  return (
    <ImageBackground style={styles.container} source={BgLogin}>
      <StatusBar barStyle="light-content" backgroundColor="#055f9d" />
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <IconAccountRoot />
        <Text
          style={{
            textAlign: 'center',
            fontSize: 32,
            color: 'white',
          }}>
          Login
        </Text>
      </View>
      <View style={styles.action}>
        <FontAwesome name="user" color="white" size={20} />
        <TextInput
          placeholder="enter your email"
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => textInputChange(value)}
          onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
          keyboardType="email-address"
        />
        {data.check_textInputChange ? (
          <Feather
            name="check-circle"
            color="#24e35e"
            size={16}
            style={{ marginLeft: -30 }}
          />
        ) : (
          <Feather
            name="check-circle"
            color="white"
            size={16}
            style={{ marginLeft: -30 }}
          />
        )}
      </View>
      {data.isValidUser ? null : (
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
          secureTextEntry={data.secureTextEntry ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={(value) => handlePasswordChange(value)}
          onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={updateSecureTextEntry}
          style={{ marginLeft: -30 }}>
          {data.secureTextEntry ? (
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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 20,
          marginTop: 30,
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text
            style={[styles.buttonText, { textDecorationLine: 'underline', fontSize: 14 }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <MyButton
          label={loading ? 'loading...' : 'Sign In'}
          navigasi={loginHandle}
        />
      </View>
      <View style={{ marginVertical: 20 }}></View>
    </ImageBackground>
  );
};

export default SignIn;

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
