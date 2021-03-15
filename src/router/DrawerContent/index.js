import React, {useState} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
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

const DrawerContent = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toogleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#055F9D" />
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    'https://www.stockvault.net/data/2018/08/28/254043/preview16.jpg',
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, justifyContent: 'flex-end' }}>
                <Text style={styles.title}>Yos Sularko</Text>
                <Caption style={styles.caption}>@Yossularko</Caption>
              </View>
            </View>
            <Paragraph style={[styles.paragraf, {marginTop: 20}]}>Issues Status</Paragraph>
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
              onPress={() => {props.navigation.navigate('Home')}}
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
              onPress={() => {props.navigation.navigate('Issues', {screen: 'Issues'})}}
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
              onPress={() => {props.navigation.navigate('Account')}}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
            <TouchableRipple onPress={() => {toogleTheme()}}>
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
          onPress={() => {}}
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
    marginBottom: 15,
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
