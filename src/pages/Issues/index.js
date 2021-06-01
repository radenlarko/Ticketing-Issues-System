import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderMenu, MyButton } from '../../components';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { IconAssigned, IconClose2, IconNew, IconResolved } from '../../assets';
import Button from '../../components/Button';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Issues() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [filterIssue, setFilterIssue] = useState(false);
  const [loadData, setLoadData] = useState(5);
  const { searchData } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const dataIssues = authContext.dataApi;

  // console.log('data Issues: ', dataIssues)
  console.log('Search: ', authContext.dataSearch);

  const filterAll = useCallback(() => {
    setFilterIssue(false);
  }, [setFilterIssue]);

  const filterNew = useCallback(() => {
    setFilterIssue(1);
  }, [setFilterIssue]);

  const filterAssign = useCallback(() => {
    setFilterIssue(2);
  }, [setFilterIssue]);

  const filterResolve = useCallback(() => {
    setFilterIssue(3);
  }, [setFilterIssue]);

  const filterClose = useCallback(() => {
    setFilterIssue(4);
  }, [setFilterIssue]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const newData = useMemo(() => {
    return dataIssues == undefined
      ? []
      : [...dataIssues]
          .sort((a, b) => (a.id > b.id ? -1 : 1))
          .filter((data) =>
            data.title.includes(
              authContext.dataSearch == undefined ? '' : authContext.dataSearch,
            ),
          )
          .filter(
            filterIssue
              ? (data) => data.statuses_id == filterIssue
              : !filterIssue
              ? (data) =>
                  data.statuses_id == 1 ||
                  data.statuses_id == 2 ||
                  data.statuses_id == 3 ||
                  data.statuses_id == 4
              : null,
          )
          .slice(0, loadData);
  }, [dataIssues, authContext.dataSearch, filterIssue, loadData]);

  const ListHeaderComponent = () => {
    const [search, setSearch] = useState('' || authContext.dataSearch);

    searchHandle = () => {
      searchData(search);
    };

    return (
      <View style={styles.containerHeaderFlat}>
        <Text style={styles.title}>Issues</Text>
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
              searchData('');
            }}
            style={{ marginLeft: -50 }}>
            <Ionicons name="close-circle-outline" size={20} color="#ccc" />
          </TouchableOpacity>
          <View style={{ marginLeft: 5 }}>
            <MyButton label="Search" navigasi={searchHandle} />
          </View>
        </View>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={filterAll}>
            <View
              style={[
                styles.radioAll,
                { backgroundColor: filterIssue ? '#ADADAD' : '#055F9D' },
              ]}>
              <Text style={styles.textRadio}>All</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterNew}>
            <View
              style={[
                styles.radioMiddle,
                { backgroundColor: filterIssue == 1 ? '#00758f' : '#ADADAD' },
              ]}>
              <Text style={styles.textRadio}>New</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterAssign}>
            <View
              style={[
                styles.radioMiddle,
                { backgroundColor: filterIssue == 2 ? '#fa7935' : '#ADADAD' },
              ]}>
              <Text style={styles.textRadio}>Assigned</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterResolve}>
            <View
              style={[
                styles.radioMiddle,
                { backgroundColor: filterIssue == 3 ? '#55c6aa' : '#ADADAD' },
              ]}>
              <Text style={styles.textRadio}>Resolve</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterClose}>
            <View
              style={[
                styles.radioClose,
                { backgroundColor: filterIssue == 4 ? 'grey' : '#ADADAD' },
              ]}>
              <Text style={styles.textRadio}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const ScreenWidth = Dimensions.get('window').width;
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
        onPress={() => navigation.navigate('DetailsIssues', { item: item })}>
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
    return newData.length === 0 ? (
      <View
        style={{
          flex: 1,
          height: ScreenHeight * 0.4,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 30,
        }}>
        <Text style={{ fontSize: 18, color: 'grey', textAlign: 'center' }}>
          no issues
        </Text>
      </View>
    ) : (
      <View
        style={{
          alignItems: 'center',
          margin: 20,
        }}>
        {loadData == newData.length ? <MyButton label="Load More" navigasi={() => setLoadData(loadData + 5)} /> : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderMenu />
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.containerFlat}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={newData}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        ListFooterComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
}

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlat: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  containerHeaderFlat: {
    paddingHorizontal: ScreenWidth * 0.05,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
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
  searchInput: {
    width: ScreenWidth * 0.89,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 270,
    height: 40,
    marginRight: 5,
    padding: 8,
    paddingRight: 50,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  radioAll: {
    width: 60,
    height: 22,
    justifyContent: 'center',
    marginHorizontal: 2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  radioMiddle: {
    width: 60,
    height: 22,
    justifyContent: 'center',
    marginHorizontal: 2,
    borderRadius: 4,
  },
  radioClose: {
    width: 60,
    height: 22,
    justifyContent: 'center',
    marginHorizontal: 2,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  textRadio: {
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },
});

// import React, { useState, useEffect, useCallback, useContext } from 'react';
// import {
//   RefreshControl,
//   SafeAreaView,
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Alert,
//   Dimensions,
//   TextInput,
// } from 'react-native';
// import { HeaderMenu, MyButton } from '../../components';
// import { AuthContext } from '../../components/AuthContext';
// import { useNavigation } from '@react-navigation/native';
// import { IconAssigned, IconClose2, IconNew, IconResolved } from '../../assets';
// import Button from '../../components/Button';

// const wait = (timeout) => {
//   return new Promise((resolve) => setTimeout(resolve, timeout));
// };

// export default function Issues() {
//   const navigation = useNavigation();
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     wait(1500).then(() => setRefreshing(false));
//   }, []);

//   const authContext = useContext(AuthContext);

//   // Menampung data dari API
//   const [data, setData] = useState([]);

//   // Fungsi ambil data dengan GET
//   const endpoint = 'http://127.0.0.1:8000/api';
//   const getData = async () => {
//     try {
//       let newToken = await authContext.userToken;
//       let response = await fetch(`${endpoint}/ticket/ticketuser`, {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'X-Requested-With': 'XMLHttpRequest',
//           Authorization: `token ${newToken}`,
//         },
//       });
//       let json = await response.json();
//       setData(json.tickets);
//       console.log('Issues Token: ', newToken);
//       // console.log('data ticket: ', json.tickets)
//     } catch (error) {
//       Alert.alert('Error!', 'Request Failed.. Server not responding!!', [
//         { text: 'Ok' },
//       ]);
//       console.error(error);
//     }
//   };

//   // Automatic load data
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       getData();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   // render item FlatList
//   const ListHeaderComponent = () => {
//     return (
//       <View style={styles.containerHeaderFlat}>
//         <Text style={styles.title}>Issues</Text>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <TextInput
//             placeholder="search issues here ..."
//             style={styles.searchInput}
//           />
//           <View style={{marginLeft: -30}}>
//             <MyButton
//               label="Search"
//             />
//           </View>
//         </View>
//         <View style={styles.radioContainer}>
//           <TouchableOpacity onPress={() => {}}>
//             <View style={styles.radioAll}>
//               <Text style={styles.textRadio}>All</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {}}>
//             <View style={styles.radioMiddle}>
//               <Text style={styles.textRadio}>Open</Text>
//             </View>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => {}}>
//             <View style={styles.radioClose}>
//               <Text style={styles.textRadio}>Close</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   const renderItem = ({ item }) => {
//     const ScreenWidth = Dimensions.get('window').width;
//     let statusBackground;
//     if (item.statuses_id == 1) {
//       statusBackground = '#00758f';
//     } else if (item.statuses_id == 2) {
//       statusBackground = '#fa7935';
//     } else if (item.statuses_id == 3) {
//       statusBackground = '#55c6aa';
//     } else {
//       statusBackground = 'grey';
//     }
//     return (
//       <TouchableOpacity
//         onPress={() => navigation.navigate('DetailsIssues', { item: item })}>
//         <View style={styles.flatListContainer}>
//           <View style={styles.flatListContent}>
//             <View
//               style={[
//                 styles.flatListShape,
//                 { backgroundColor: statusBackground },
//               ]}>
//               {item.statuses_id == 1
//                 ? <IconNew />
//                 : item.statuses_id == 2
//                 ? <IconAssigned />
//                 : item.statuses_id == 3
//                 ? <IconResolved />
//                 : <IconClose2 />}
//             </View>
//             <View style={{ width: ScreenWidth * 0.52 }}>
//               <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
//               <Text style={{ lineHeight: 24 }}>
//                 {item.categories_id == 1
//                   ? 'Documentation'
//                   : item.categories_id == 2
//                   ? 'Hardware Problem'
//                   : item.categories_id == 3
//                   ? 'Network Problem'
//                   : item.categories_id == 4
//                   ? 'Question'
//                   : item.categories_id == 5
//                   ? 'Software Problem'
//                   : 'Uncategorized'}
//               </Text>
//             </View>
//             <View>
//               <Text style={{ fontWeight: 'bold', fontSize: 12 }}>
//                 20-08-2021
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   const ListFooterComponent = () => {
//     return (
//       <Text style={{ textAlign: 'center', marginVertical: 10 }}>- ~ -</Text>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <HeaderMenu />
//       {data.length === 0 ?
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30}}>
//         <Text style={{fontSize: 18, color: '#4D4D4D', textAlign: 'center'}}>The issues are not there yet, add the issue?</Text>
//         <Button
//           label="Add Issue"
//           navigasi={() => navigation.navigate('AddIssues')}
//         />
//       </View>
//       :
//       <FlatList
//         ListHeaderComponent={ListHeaderComponent}
//         contentContainerStyle={styles.containerFlat}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//         }
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.slug}
//         ListFooterComponent={ListFooterComponent}
//       /> }
//     </SafeAreaView>
//   );
// }

// let ScreenHeight = Dimensions.get('window').height;
// let ScreenWidth = Dimensions.get('window').width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   containerFlat: {
//     borderTopRightRadius: 30,
//     borderTopLeftRadius: 30,
//   },
//   containerHeaderFlat: {
//     paddingHorizontal: ScreenWidth * 0.05,
//     paddingBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: 40,
//     marginBottom: 40,
//   },
//   flatListContainer: {
//     marginHorizontal: 20,
//     marginVertical: 5,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     paddingVertical: 5,
//   },
//   flatListContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   flatListShape: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   searchInput: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     width: 250,
//     height: 40,
//     marginRight: 5,
//     padding: 8,
//     paddingRight: 30,
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     marginTop: 30,
//     justifyContent: 'flex-end',
//   },
//   radioAll: {
//     width: 58,
//     height: 19,
//     backgroundColor: '#055F9D',
//     justifyContent: 'center',
//     marginHorizontal: 2,
//     borderTopLeftRadius: 10,
//     borderBottomLeftRadius: 10,
//   },
//   radioMiddle: {
//     width: 58,
//     height: 19,
//     backgroundColor: 'grey',
//     justifyContent: 'center',
//     marginHorizontal: 2,
//   },
//   radioClose: {
//     width: 58,
//     height: 19,
//     backgroundColor: 'grey',
//     justifyContent: 'center',
//     marginHorizontal: 2,
//     borderTopRightRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   textRadio: {
//     fontSize: 11,
//     color: 'white',
//     textAlign: 'center',
//   },
// });
