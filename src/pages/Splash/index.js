import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Image, Text, StatusBar } from 'react-native'
import { BgSplash, LogoWhite } from '../../assets'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn')
        }, 2000)
    }, [navigation]);
    return (
        <ImageBackground source={BgSplash} style={styles.background}>
            <StatusBar barStyle="light-content" backgroundColor="#055f9d" />
            <Image source={LogoWhite} style={styles.logo} />
            <Text style={styles.slogan}>Powered by ADYAWINSA</Text>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },
    logo: {
        width: 198,
        height: 59,
        marginLeft: -40
    },
    slogan: {
        color: 'white',
        fontSize: 10,
        marginTop: 10,
        fontFamily: 'Roboto',
        alignSelf: 'flex-end',
        marginLeft: -160,
        marginBottom: 40
    }
})

