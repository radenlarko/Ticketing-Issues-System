import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

const Home = ({navigation}) => {
      return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Page</Text>
                <Button title="Add Issue" onPress={() => navigation.navigate('AddIssues')} />
            </View>
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