import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

const AddIssues = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assign_to, setAssign_to] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const status = 1;

    const [loading, setLoading] = useState(false);

    const endpoint = 'http://127.0.0.1:8000/api';
    const saveData = () => {
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
        fetch(`${endpoint}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                'Authorization': 'token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjMsImlzcyI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3VzZXJzXC9sb2dpbiIsImlhdCI6MTYxNTYzNzA2NywiZXhwIjoxNjIwODIxMDY3LCJuYmYiOjE2MTU2MzcwNjcsImp0aSI6IkRHeGt4ZlZ1MkRNUGtOR0MifQ.9UCdQTJQn-NMXxUOmBcZ2qE3TeD7AshEKCf0BhqRmDI'
            },
            body: JSON.stringify(dataPost)
        })
        .then(() => {
            setLoading(false);
            console.log('Berhasil Post: ', dataPost)
            navigation.navigate('Issues')
        })
        .catch((error) => {
            console.log(error)
        });
    };
    return (
        <View style={styles.container}>
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
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <View style={[styles.button, { backgroundColor: 'grey' }]}>
                    <Text style={styles.buttonText}>
                        Back
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
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
