import React, { useState, useContext } from 'react';
import { View, StyleSheet, StatusBar, Alert } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext } from '../../components/AuthContext';

const DrawerContent = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { signOut } = useContext(AuthContext);
  const authContext = useContext(AuthContext);

  let nameRound = authContext.userName.substr(0, 1);

  const signOutHandle = async () => {
    try {
      const logOut = await signOut(authContext.userToken);

      return Promise.resolve(logOut);
    } catch (error) {
      if (error.code === 403) {
        console.log(error.code + ' ' + error.message);
        Alert.alert(String(error.code), error.message, [{ text: 'Ok' }]);
      } else {
        Alert.alert('Error!', 'gagal logout dari Server', [{ text: 'Ok' }]);
      }
    }
  };

  const toogleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <StatusBar barStyle="light-content" backgroundColor="#055F9D" />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              {/* <Avatar.Image
                source={{
                  uri:
                    'https://www.stockvault.net/data/2018/08/28/254043/preview16.jpg',
                }}
                size={50}
              /> */}
              <View style={styles.avaContainer}>
                <Text style={styles.avaText}>{nameRound}</Text>
              </View>
              <View style={{ marginLeft: 15, justifyContent: 'flex-end' }}>
                <Text style={styles.title}>{authContext.userName}</Text>
                <Caption style={styles.email}>{authContext.userEmail}</Caption>
              </View>
            </View>
            <Paragraph style={[styles.paragraf, { marginTop: 20 }]}>
              Issues Status
            </Paragraph>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraf, styles.caption)}>
                  23
                </Paragraph>
                <Caption style={styles.caption}> Open</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraf, styles.caption)}>
                  127
                </Paragraph>
                <Caption style={styles.caption}> Closed</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={{ marginTop: 10 }}>
            <DrawerItem
              icon={({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="home-outline"
                    color={color}
                    size={size}
                  />
                );
              }}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="bookmark-outline"
                    color={color}
                    size={size}
                  />
                );
              }}
              label="Issues"
              onPress={() => {
                props.navigation.navigate('Issues', { screen: 'Issues' });
              }}
            />
            <DrawerItem
              icon={({ color, size }) => {
                return (
                  <MaterialCommunityIcons
                    name="account-outline"
                    color={color}
                    size={size}
                  />
                );
              }}
              label="Account"
              onPress={() => {
                props.navigation.navigate('Account');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                toogleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={size}
              />
            );
          }}
          label="Sign Out"
          onPress={signOutHandle}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 11,
    lineHeight: 14,
    maxWidth: 180,
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraf: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    borderTopColor: '#F4F4F4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avaContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#ffac4c',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avaText: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 22,
  },
});
