import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ImageBackground,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../components/AuthContext';
import { BgHomeHeader, IconClose, IconOpen, LogoWhite } from '../../assets';

const Home = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  return (
    <ImageBackground source={BgHomeHeader} style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.header}>
          <View style={{ marginTop: ScreenHeight * 0.03 }}></View>
          <Image style={styles.logo} source={LogoWhite} />
          <View style={{ marginTop: ScreenHeight * 0.044 }}></View>
          <Text style={styles.text}>
            Hello... Welcome
            <Text style={styles.username}> {authContext.userName}</Text>
          </Text>
          <View style={{ marginTop: ScreenHeight * 0.016 }}></View>
          <Text style={styles.textH1}>Is there an issue?</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'center' }}
            onPress={() =>
              navigation.navigate('Issues', { screen: 'AddIssues' })
            }>
            <View style={styles.button}>
              <Text style={styles.textButton}>Add Issue</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.main}>
          <Text style={styles.title}>Issues Status</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <IconOpen />
                <Text style={[styles.cardIconLabel, { color: '#055F9D' }]}>
                  Open
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardText, { color: '#055F9D' }]}>23</Text>
              </View>
            </View>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <IconClose />
                <Text style={[styles.cardIconLabel, { color: '#D62923' }]}>
                  Close
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={[styles.cardText, { color: '#D62923' }]}>127</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>Search Issues</Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder="search issues here ..."
              style={styles.searchInput}
            />
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'center', marginLeft: -30 }}
              onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Search</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.latestIssues}>
          <Text style={styles.title}>Latest Issues</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Home;

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
let contoh = Dimensions.get('window').height;
console.log('contoh : ', contoh * 0.6);

const styles = StyleSheet.create({
  header: {
    height: ScreenHeight * 0.343,
  },
  main: {
    height: 330,
    backgroundColor: '#E9E9E9',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: ScreenWidth * 0.05,
  },
  latestIssues: {
    minHeight: ScreenHeight*0.4,
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: ScreenWidth * 0.05,
    paddingBottom: 30,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  textH1: {
    textAlign: 'center',
    fontSize: 32,
    color: '#FFAC4C',
  },
  button: {
    backgroundColor: '#FFAC4C',
    width: 118,
    height: 26,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: ScreenHeight * 0.014,
  },
  textButton: {
    color: '#055F9D',
    textAlign: 'center',
  },
  logo: {
    width: 112,
    height: 33.37,
    marginLeft: ScreenWidth * 0.05,
  },
  card: {
    width: 168,
    height: 72,
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
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
    marginHorizontal: 8,
  },
  cardContent: {
    width: 70,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 36,
    fontWeight: '700',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 250,
    height: 40,
    marginRight: 5,
    padding: 8,
    paddingRight: 30,
  }
});

// ------------- old home -------------------
// import React, { useContext } from 'react';
// import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
// import Icons from 'react-native-vector-icons/Ionicons';
// import Iconss from 'react-native-vector-icons/FontAwesome';
// import { AuthContext } from '../../components/AuthContext';

// const Home = ({ navigation }) => {
//   const authContext = useContext(AuthContext);
//   return (
//     <SafeAreaView
//       style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <View style={{ flexDirection: 'row' }}>
//         <Icons name="person" size={30} color="#055F9D" />
//         <Iconss name="rocket" size={30} color="#055F9D" />
//       </View>
//       <Text>Welcome <Text style={{fontWeight: "bold", fontSize: 18, textTransform: "capitalize"}}>{authContext.userName}</Text></Text>
//       <Button
//         title="Add Issue"
//         onPress={() => navigation.navigate('Issues', { screen: 'AddIssues' })}
//       />
//     </SafeAreaView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({});
