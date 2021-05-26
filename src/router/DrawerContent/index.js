import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
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
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {AuthContext} from '../../components/AuthContext';

const DrawerContent = (props) => {
  const [dataUser, setDataUser] = useState({
    name: '',
    email: '',
  });

  const getUser = async () => {
    setDataUser({
      ...dataUser,
      name: await AsyncStorage.getItem('userName'),
      email: await AsyncStorage.getItem('userEmail'),
    });
  };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  
  const {signOut} = useContext(AuthContext);
  
  const toogleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };
  
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.stockvault.net/data/2018/08/28/254043/preview16.jpg',
                }}
                size={50}
              />
              <View style={{marginLeft: 15, justifyContent: 'flex-end'}}>
                <Text style={styles.title}>{dataUser.name}</Text>
                <Caption style={styles.email}>{dataUser.email}</Caption>
              </View>
            </View>
            <Paragraph style={[styles.paragraf, {marginTop: 20}]}>
              Issues Status
            </Paragraph>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraf, styles.caption)}>
                  80
                </Paragraph>
                <Caption style={styles.caption}> Open</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={(styles.paragraf, styles.caption)}>
                  52
                </Paragraph>
                <Caption style={styles.caption}> Closed</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={{marginTop: 10}}>
            <DrawerItem
              icon={({color, size}) => {
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
              icon={({color, size}) => {
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
                props.navigation.navigate('Issues', {screen: 'Issues'});
              }}
            />
            <DrawerItem
              icon={({color, size}) => {
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
          icon={({color, size}) => {
            return (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={color}
                size={size}
              />
            );
          }}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
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
    fontSize: 12,
    lineHeight: 14,
    maxWidth: 165,
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
});
