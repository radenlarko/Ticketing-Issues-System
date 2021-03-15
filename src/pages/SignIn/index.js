import React from 'react'
import { StyleSheet, Text, View, Button, TextInput, Platform, ScrollView, TouchableOpacity } from 'react-native'

const SignIn = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <Text style={{ textAlign: 'center', marginVertical: 50, fontSize: 18, fontWeight: 'bold' }}>Sign In Screen</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder="enter your email"
                    style={styles.textInput}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.action}>
                <TextInput
                    placeholder="enter your password"
                    style={styles.textInput}
                    autoCapitalize="none"
                />
            </View>
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Sign In
                    </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <View style={[styles.button, { backgroundColor: 'grey' }]}>
                    <Text style={styles.buttonText}>
                        Sign Up
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={{marginVertical: 20}}></View>
        </ScrollView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%'
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    action: {
        flexDirection: "row",
        marginVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#c4c4c4',
        paddingBottom: 5
    },
    button: {
        backgroundColor: '#055F9D',
        padding: 12,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    }
})
