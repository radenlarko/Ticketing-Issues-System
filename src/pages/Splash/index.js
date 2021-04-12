import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Image, Text, StatusBar, ActivityIndicator, View } from 'react-native'
import { BgSplash, LogoWhite } from '../../assets'

const Splash = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('SignIn')
        }, 500)
    }, [navigation]);
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

export default Splash

const styles = StyleSheet.create({
    // background: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     alignItems: "center",
    //     justifyContent: 'center'
    // },
    // logo: {
    //     width: 198,
    //     height: 59,
    //     marginLeft: -40
    // },
    // slogan: {
    //     color: 'white',
    //     fontSize: 10,
    //     marginTop: 10,
    //     fontFamily: 'Roboto',
    //     alignSelf: 'flex-end',
    //     marginLeft: -160,
    //     marginBottom: 40
    // }
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

