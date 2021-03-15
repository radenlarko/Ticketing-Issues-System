import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
      return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{flexDirection: "row"}}>
                    <Icons name="person" size={30} color="#055F9D" />
                    <Iconss name="rocket" size={30} color="#055F9D" />
                </View>
                <Text>Home Page</Text>
                <Button title="Add Issue" onPress={() => navigation.navigate('Issues', { screen: 'AddIssues' })} />
            </SafeAreaView>
        )
    }
    
    export default Home
    
    const styles = StyleSheet.create({})



    
    // import React, { useEffect, useState } from 'react';
    // import { StyleSheet, ActivityIndicator, FlatList, Text, View } from 'react-native';
    
    // const Home = () => {
    //   const [isLoading, setLoading] = useState(true);
    //   const [data, setData] = useState([]);
    
    //   useEffect(() => {
    //     fetch('https://reactnative.dev/movies.json')
    //       .then((response) => response.json())
    //       .then((json) => setData(json.movies))
    //       .catch((error) => console.error(error))
    //       .finally(() => setLoading(false));
    //   }, []);
    
    //   return (
    //     <View style={styles.container}>
    //       {isLoading ? <ActivityIndicator/> : (
    //         <FlatList
    //           data={data}
    //           keyExtractor={({ id }, index) => id}
    //           renderItem={({ item }) => (
    //             <Text>{item.releaseYear}, {item.title}</Text>
    //           )}
    //         />
    //       )}
    //       <View style={styles.main}></View>
    //     </View>
    //   );
    // };
    
    // export default Home
    
    // const styles = StyleSheet.create({
    //     container: {
    //         flex: 1,
    //         padding: 24,
    //     },
    //     main: {
    //         flex: 1,
    //         borderTopRightRadius: 20,
    //         borderTopLeftRadius: 20,
    //     }
    // })