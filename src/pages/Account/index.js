import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

export default function Account() {
  // Menampung data dari API
  const [data, setData] = useState([]);

  // Fungsi ambil data dengan GET
  const endpoint = 'https://reqres.in';
  const getData = async () => {
    try {
      let response = await fetch(`${endpoint}/api/users?page=1`);
      let json = await response.json();
      setData(json.data);
    } catch(error) {
      console.error(error);
    }
  };

  // Automatic load data
  useEffect(() => {
    getData()
  }, [])

  // render item FlatList
  const renderItem = ({item}) => {
    return (
      <SafeAreaView style={styles.flatListContainer}>
        <View style={styles.flatListContent}>
          <Image 
            style={styles.flatListImage}
            source={{
              uri: item.avatar
            }} 
          />
          <View>
            <Text style={{fontWeight: 'bold'}}>{item.first_name} {item.last_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data from Api</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
