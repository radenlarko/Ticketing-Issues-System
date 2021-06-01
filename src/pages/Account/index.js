import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Platform,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { IconLogout } from '../../assets';
import { HeaderMenu, MyButton } from '../../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../components/AuthContext';

export default function Account() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const [confirmEntry, setconfirmEntry] = useState(true);
  const { signOut } = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  let nameRound = authContext.userName.substr(0, 1);

  const secureEntryHandle = () => {
    setSecureEntry(!secureEntry);
  };

  const secureConfirmHandle = () => {
    setconfirmEntry(!confirmEntry);
  };

  const signOutHandle = async () => {
    try {
      const logOut = await signOut(authContext.userToken);

      return Promise.resolve(logOut);
    } catch (error) {
      if (error.code === 403) {
        console.log(error.code + ' ' + error.message);
        Alert.alert(String(error.code), error.message, [{ text: 'Ok' }]);
      } else {
        Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
          { text: 'Ok' },
        ]);
      }
    }
  };

  const changePasswordHandle = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Wrong Input!', 'Field cannot be empty!!', [{ text: 'Ok' }]);
      setLoading(false);

      return null;
    }

    if (newPassword.trim().length <= 7) {
      Alert.alert('New Password Error!!', 'Title minimum 8 characters long.');
      setLoading(false);

      return null;
    }

    if (confirmPassword.trim().length <= 7) {
      Alert.alert(
        'Confirm Password Error!!',
        'Description minimum 8 characters long.',
      );
      setLoading(false);

      return null;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error!!', 'Confirm Password does not match!');
      setLoading(false);

      return null;
    }

    try {
      setLoading(true);
      const tokenChange = authContext.userToken;
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `token ${tokenChange}`,
        },
        body: JSON.stringify({
          user: {
            password: confirmPassword,
          },
        }),
      });

      const data = await response.json();
      console.log('Error Change: ', data.errors);

      if (data.errors) {
        console.log('error: ', data.errors.password);
        return Promise.reject(data);
      }

      Alert.alert(
        'Success!',
        `Congratulation ${data.user.username}, your password has been successfully changed.`,
        [{ text: 'Ok' }],
      );

      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
      signOutHandle();

      return Promise.resolve(data);
    } catch (error) {
      if (error.errors) {
        Alert.alert('Error!', error.errors.password, [{ text: 'Ok' }]);
      } else {
        Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
          { text: 'Ok' },
        ]);
      }
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <HeaderMenu
            rightButton={<IconLogout />}
            rightButtonNav={signOutHandle}
          />
          <ScrollView>
            <View style={styles.header}></View>
            <View style={styles.main}>
              <View style={styles.avaRound}>
                <Text style={styles.avaText}>{nameRound}</Text>
              </View>
              <View style={styles.profileContent}>
                <Text style={{ fontWeight: 'bold' }}>Welcome</Text>
                <Text style={styles.username}>{authContext.userName}</Text>
                <Text style={{ color: 'grey' }}>{authContext.userEmail}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{authContext.openIssue}</Text>
                  <Text style={styles.cardLabel}>Open Issue</Text>
                </View>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{authContext.closeIssue}</Text>
                  <Text style={styles.cardLabel}>Closed Issue</Text>
                </View>
              </View>
              <View style={styles.changePassContainer}>
                <Text style={{ marginVertical: 10 }}>Change Password</Text>
                <View style={styles.action}>
                  <FontAwesome name="lock" color="grey" size={22} />
                  <TextInput
                    placeholder="enter your new password"
                    secureTextEntry={secureEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                  />
                  <TouchableOpacity onPress={secureEntryHandle}>
                    {secureEntry ? (
                      <Feather name="eye-off" color="grey" size={16} />
                    ) : (
                      <Feather name="eye" color="grey" size={16} />
                    )}
                  </TouchableOpacity>
                </View>
                {newPassword.trim().length == 0 ? null : newPassword.trim()
                    .length <= 7 ? (
                  <View>
                    <Text style={styles.errMsg}>
                      New Password must be 8 characters long.
                    </Text>
                  </View>
                ) : null}
                <View style={styles.action}>
                  <FontAwesome name="lock" color="grey" size={22} />
                  <TextInput
                    placeholder="enter your confirm new password"
                    secureTextEntry={confirmEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                  />
                  <TouchableOpacity onPress={secureConfirmHandle}>
                    {confirmEntry ? (
                      <Feather name="eye-off" color="grey" size={16} />
                    ) : (
                      <Feather name="eye" color="grey" size={16} />
                    )}
                  </TouchableOpacity>
                </View>
                {confirmPassword.trim().length == 0 ? null : confirmPassword.trim()
                    .length <= 7 ? (
                  <View>
                    <Text style={styles.errMsg}>
                      Confirm Password must be 8 characters long.
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: 20,
                  }}>
                  <MyButton
                    label={loading ? 'Loading...' : 'Submit'}
                    navigasi={changePasswordHandle}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  header: {
    height: ScreenHeight * 0.2,
    backgroundColor: '#055F9D',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  main: {
    minHeight: ScreenHeight,
    padding: ScreenWidth * 0.05,
    alignItems: 'center',
  },
  avaRound: {
    width: 145,
    height: 145,
    backgroundColor: '#FFAC4C',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -ScreenHeight * 0.12,
  },
  avaText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 72,
  },
  profileContent: {
    marginVertical: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#055F9D',
    textTransform: 'capitalize',
  },
  card: {
    width: 120,
    height: 72,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
  },
  cardTitle: {
    color: '#4D4D4D',
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardLabel: {
    color: '#4D4D4D',
    fontSize: 12,
  },
  changePassContainer: {
    width: ScreenWidth * 0.86,
    minHeight: 72,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 40,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 5,
  },
  action: {
    flexDirection: 'row',
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c4c4c4',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#242424',
  },
  errMsg: {
    fontSize: 12,
    color: '#ed0c2a',
  },
});

// --------------- old version ----------------
// import React, {useState, useEffect} from 'react';
// import { Text, View, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

// export default function Account() {
//   // Menampung data dari API
//   const [data, setData] = useState([]);

//   // Fungsi ambil data dengan GET
//   const endpoint = 'https://reqres.in';
//   const getData = async () => {
//     try {
//       let response = await fetch(`${endpoint}/api/users?page=1`);
//       let json = await response.json();
//       setData(json.data);
//     } catch(error) {
//       console.error(error);
//     }
//   };

//   // Automatic load data
//   useEffect(() => {
//     getData()
//   }, [])

//   // render item FlatList
//   const renderItem = ({item}) => {
//     return (
//       <SafeAreaView style={styles.flatListContainer}>
//         <View style={styles.flatListContent}>
//           <Image
//             style={styles.flatListImage}
//             source={{
//               uri: item.avatar
//             }}
//           />
//           <View>
//             <Text style={{fontWeight: 'bold'}}>{item.first_name} {item.last_name}</Text>
//             <Text>{item.email}</Text>
//           </View>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Data from Api</Text>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 8,
//   },
//   title : {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 30
//   },
//   flatListContainer : {
//     marginHorizontal: 20,
//     marginVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 5
//   },
//   flatListContent : {
//     flexDirection: 'row',
//     alignItems: 'center'
//   },
//   flatListImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10
//   }
// });
