import React, {useState, useEffect, useCallback} from 'react';
import { RefreshControl, SafeAreaView, Text, View, StyleSheet, FlatList, Image, Button, TouchableOpacity, Alert } from 'react-native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function Issues({navigation}) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1500).then(() => setRefreshing(false));
  }, []);

  // Menampung data dari API
  const [data, setData] = useState([]);

  // Fungsi ambil data dengan GET
  const endpoint = 'http://127.0.0.1:8000/api';
  const getData = async () => {
    try {
      let response = await fetch(`${endpoint}/ticket/ticketuser`, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Requested-With': 'XMLHttpRequest',
              'Authorization': 'token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3VzZXJzXC9sb2dpbiIsImlhdCI6MTYxNTYzNzA2NywiZXhwIjoxNjIwODIxMDY3LCJuYmYiOjE2MTU2MzcwNjcsImp0aSI6IkRHeGt4ZlZ1MkRNUGtOR0MifQ.9UCdQTJQn-NMXxUOmBcZ2qE3TeD7AshEKCf0BhqRmDI'
          }
      });
      let json = await response.json();
      setData(json.tickets);
      console.log('data ticket: ', json.tickets)
    } catch(error) {
      console.error(error);
    }
  };

  // Automatic load data
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigation])

  // render item FlatList
  const ListHeaderComponent = () => {
      return (
        <View>
          <Text style={styles.title}>Issues</Text>
          <Button title="Add Issue" onPress={() => navigation.navigate('AddIssues')} />
        </View>
      )
  }

  const renderItem = ({item}) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('DetailsIssues', {item: item})}>
      <View style={styles.flatListContainer}>
        <View style={styles.flatListContent}>
          {/* <Image 
            style={styles.flatListImage}
            source={{
              uri: item.avatar
            }} 
          /> */}
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    )
  }

  const ListFooterComponent = () => {
      return (
        <Text style={{textAlign: "center", marginVertical: 10}}>- ~ -</Text>
      )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
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
    flex: 1
  },
  containerFlat: {
    flex: 1,
    padding: 8,
  },
  title : {
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 30
  },
  flatListContainer : {
    marginHorizontal: 20,
    marginVertical: 5, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ccc',
    paddingVertical: 5
  },
  flatListContent : {
    flexDirection: 'row', 
    alignItems: 'center'
  },
  flatListImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 10
  }
});