import React, { useContext, useEffect, useState } from 'react';
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
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {
  BgHomeHeader,
  BgHomeHeaderSmall,
  IconAssigned,
  IconClose,
  IconClose2,
  IconNew,
  IconOpen,
  IconResolved,
  LogoWhite,
} from '../../assets';
import { MyButton } from '../../components';

const Home = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const { getData, searchData, countData } = useContext(AuthContext);
  const dataIssues = authContext.dataApi;

  const newData =
    dataIssues == undefined
      ? []
      : [...dataIssues].sort((a, b) => (a.id > b.id ? -1 : 1)).slice(0, 5);

  const getDataToStore = async () => {
    try {
      const dataStore = await getData(authContext.userToken);

      return Promise.resolve(dataStore);
    } catch (error) {
      if (error.errors) {
        Alert.alert('Error!', 'JWT error: Token has expired');
      } else {
        Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
          { text: 'Ok' },
        ]);
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataToStore();
    });

    return unsubscribe;
  }, [navigation]);

  const ListHeaderComponent = () => {
    const [search, setSearch] = useState('');

    searchHandle = () => {
      searchData(search);
      navigation.navigate('Issues', { screen: 'Issues' });
    };
    return (
      <>
        <ImageBackground
          source={BgHomeHeaderSmall}
          style={[styles.header, { flex: 1, backgroundColor: '#055F9D' }]}>
          <View style={{ marginTop: ScreenHeight * 0.03 }}></View>
          <Image style={styles.logo} source={LogoWhite} />
          <View style={{ marginTop: ScreenHeight * 0.044 }}></View>
          <Text style={styles.text}>
            Hello... Welcome
            <Text style={styles.username}> {authContext.userName}</Text>
          </Text>
          <View style={{ marginTop: ScreenHeight * 0.016 }}></View>
          <Text style={styles.textH1}>Is there an issue?</Text>
          <View
            style={{ alignItems: 'center', marginTop: ScreenHeight * 0.014 }}>
            <MyButton
              navigasi={() =>
                navigation.navigate('Issues', { screen: 'AddIssues' })
              }
              label="Add Issue"
            />
          </View>
        </ImageBackground>
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
                <Text style={[styles.cardText, { color: '#055F9D' }]}>{authContext.openIssue}</Text>
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
                <Text style={[styles.cardText, { color: '#D62923' }]}>{authContext.closeIssue}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.title}>Search Issues</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="search issues here ..."
              style={styles.searchInput}
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
            <TouchableOpacity
              onPress={() => {
                setSearch('');
              }}
              style={{ marginLeft: -50 }}>
              <Ionicons name="close-circle-outline" size={20} color="#ccc" />
            </TouchableOpacity>
            <View style={{ marginLeft: 5 }}>
              <MyButton label="Search" navigasi={searchHandle} />
            </View>
          </View>
        </View>
        <View style={styles.latestIssues}>
          <Text style={styles.title}>Latest Issues</Text>
          {newData.length == 0 ? (
            <View style={{ marginBottom: 50 }}>
              <Text>no issues</Text>
            </View>
          ) : null}
        </View>
      </>
    );
  };

  const renderItem = ({ item }) => {
    // const ScreenWidth = Dimensions.get('window').width;
    let statusBackground;
    if (item.statuses_id == 1) {
      statusBackground = '#00758f';
    } else if (item.statuses_id == 2) {
      statusBackground = '#fa7935';
    } else if (item.statuses_id == 3) {
      statusBackground = '#55c6aa';
    } else {
      statusBackground = 'grey';
    }
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Issues', {
            screen: 'DetailsIssues',
            params: { item: item },
          })
        }>
        <View style={styles.flatListContainer}>
          <View style={styles.flatListContent}>
            <View
              style={[
                styles.flatListShape,
                { backgroundColor: statusBackground },
              ]}>
              {item.statuses_id == 1 ? (
                <IconNew />
              ) : item.statuses_id == 2 ? (
                <IconAssigned />
              ) : item.statuses_id == 3 ? (
                <IconResolved />
              ) : (
                <IconClose2 />
              )}
            </View>
            <View style={{ width: ScreenWidth * 0.52 }}>
              <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
              <Text style={{ lineHeight: 24 }}>
                {item.categories_id == 1
                  ? 'Documentation'
                  : item.categories_id == 2
                  ? 'Hardware Problem'
                  : item.categories_id == 3
                  ? 'Network Problem'
                  : item.categories_id == 4
                  ? 'Question'
                  : item.categories_id == 5
                  ? 'Software Problem'
                  : 'Uncategorized'}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
                20-08-2021
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    return (
      <View
        style={{
          backgroundColor: '#fafafa',
          height: ScreenHeight * 0.08,
        }}></View>
    );
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.containerFlat}
        data={newData}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
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
    marginTop: -30,
    padding: ScreenWidth * 0.05,
  },
  latestIssues: {
    backgroundColor: '#fafafa',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: ScreenWidth * 0.05,
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
    width: 270,
    height: 40,
    marginRight: 5,
    padding: 8,
    paddingRight: 30,
  },
  containerFlat: {
    backgroundColor: '#fafafa',
  },
  flatListContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    borderRadius: 20,
  },
  flatListContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flatListShape: {
    width: 40,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
