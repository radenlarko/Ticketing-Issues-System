import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddIssues = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assign_to, setAssign_to] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const status = 1;

    const [loading, setLoading] = useState(false);

    const endpoint = 'http://127.0.0.1:8000/api';
    const saveData = async () => {
        let newToken = await AsyncStorage.getItem('userToken');
        setLoading(true);
        
        const dataPost = {
            tickets : {
                title: title,
                description: description,
                assigned_to: parseInt(assign_to),
                categories_id: parseInt(category),
                priorities_id: parseInt(priority),
                statuses_id: status
            }
        }
        try{
            await fetch(`${endpoint}/tickets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `token ${newToken}`
                },
                body: JSON.stringify(dataPost)
            })
            .then((response) => response.json())
            .then((json) => {
                setLoading(false);
                console.log('Berhasil Post: ', json.ticket.title)
                setTitle('')
                setDescription('')
                setAssign_to('')
                setCategory('')
                setPriority('')
                navigation.navigate('Issues')
            })
        }catch(error){
            console.log(error)
        }
        console.log('AddIssues Token: ', newToken);
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>ADD ISSUES</Text>
            <TextInput
                placeholder={'enter title'}
                value={title}
                onChangeText={(value) => setTitle(value)}
                style={styles.textInput}
            />
            <TextInput
                placeholder={'enter description'}
                value={description}
                onChangeText={(value) => setDescription(value)}
                style={styles.textInput}
            />
            <TextInput
                placeholder={'enter assign to'}
                value={assign_to}
                onChangeText={(value) => setAssign_to(value)}
                style={styles.textInput}
            />
            <TextInput
                placeholder={'enter category'}
                value={category}
                onChangeText={(value) => setCategory(value)}
                style={styles.textInput}
            />
            <TextInput
                placeholder={'enter priority'}
                value={priority}
                onChangeText={(value) => setPriority(value)}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={saveData}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        {loading ? 'Saving...' : 'Save'}
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Issues', {screen: 'Issues'})}>
                <View style={[styles.button, { backgroundColor: 'grey' }]}>
                    <Text style={styles.buttonText}>
                        Back
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{marginVertical: 20}}></View>
        </ScrollView>
    )
}

export default AddIssues

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    title: {
        fontSize: 24,
        color: '#055F9D',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 20,
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#055F9D',
        padding: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
});
