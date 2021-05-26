import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { AuthContext } from '../../components/AuthContext';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Issues({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  const authContext = useContext(AuthContext);

  // Menampung data dari API
  const [data, setData] = useState([]);

  // Fungsi ambil data dengan GET
  const endpoint = 'http://127.0.0.1:8000/api';
  const getData = async () => {
    try {
      let newToken = await authContext.userToken;
      let response = await fetch(`${endpoint}/ticket/ticketuser`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Authorization: `token ${newToken}`,
        },
      });
      let json = await response.json();
      setData(json.tickets);
      console.log('Issues Token: ', newToken);
      // console.log('data ticket: ', json.tickets)
    } catch (error) {
      console.error(error);
    }
  };

  // Automatic load data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation]);

  // render item FlatList
  const ListHeaderComponent = () => {
    return (
      <View>
        <Text style={styles.title}>Issues</Text>
        <Button
          title="Add Issue"
          onPress={() => navigation.navigate('AddIssues')}
        />
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const ScreenWidth = Dimensions.get("window").width;
    let statusBackground;
    if (item.statuses_id == 1){
      statusBackground = '#00758f'
    } else if (item.statuses_id == 2){
      statusBackground = '#fa7935'
    } else if (item.statuses_id == 3){
      statusBackground = '#55c6aa'
    } else {
      statusBackground = 'grey'
    }
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailsIssues', { item: item })}>
        <View style={styles.flatListContainer}>
          <View style={styles.flatListContent}>
            <View style={[styles.flatListShape, {backgroundColor: statusBackground}]}>
              <Text style={{ color: 'white', fontSize: 24 }}>
                {item.statuses_id == 1 
                  ? 'N'
                  : item.statuses_id == 2
                  ? 'A'
                  : item.statuses_id == 3
                  ? 'R' : 'C'}
              </Text>
            </View>
            <View style={{width: ScreenWidth*0.52}}>
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
              <Text style={{fontWeight: 'bold', fontSize: 12}}>20-08-2021</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    return (
      <Text style={{ textAlign: 'center', marginVertical: 10 }}>- ~ -</Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.slug}
        ListFooterComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFlat: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  flatListContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  flatListContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flatListShape: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});