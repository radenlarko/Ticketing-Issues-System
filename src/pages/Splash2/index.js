import React from 'react'
import { View, ActivityIndicator, ImageBackground, Image, StatusBar, Text, StyleSheet } from 'react-native';
import { BgSplash, LogoWhite } from '../../assets';

const Splash2 = () => {
    return (
        <ImageBackground source={BgSplash} style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#055f9d" />
            <View style={styles.header}>
                <Image source={LogoWhite} style={styles.logo} />
                <ActivityIndicator color="white" size="large" style={{ marginTop: 15 }} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.slogan}>Powered by ADYAWINSA</Text>
            </View>
        </ImageBackground>
    )
}

export default Splash2

const styles = StyleSheet.create({
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: -130
    },
    footer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logo: {
        width: 198,
        height: 59
    },
    slogan: {
        color: 'white',
        fontSize: 10,
        marginTop: 10,
        fontFamily: 'Roboto',
        marginBottom: 40
    }
})
