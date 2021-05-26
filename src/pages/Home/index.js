import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/FontAwesome';
import {AuthContext} from '../../components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Home = ({navigation}) => {
    const [dataUser, setDataUser] = useState({
        name: '',
        email: ''
    })
    const getUser = async () => {
        setDataUser({
            ...dataUser,
            name: await AsyncStorage.getItem('userName'),
            email: await AsyncStorage.getItem('userEmail'),
        })
    }
    
    useEffect(() => {
        getUser();
    }, [])

      return (
            <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{flexDirection: "row"}}>
                    <Icons name="person" size={30} color="#055F9D" />
                    <Iconss name="rocket" size={30} color="#055F9D" />
                </View>
                <View>
                    <Text>Selamat datang <Text style={{fontWeight: "bold", fontSize: 18, textTransform: "capitalize"}}>{dataUser.name}</Text></Text>
                    {/* <Text>{dataUser.email}</Text> */}
                </View>
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