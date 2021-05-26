import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DetailIssue = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.desLabel}>{props.label || ''}</Text>
            <Text style={[styles.desValue, props.style || {}]}>{props.value || ''}</Text>
          </View>
    )
}

export default DetailIssue

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    desLabel: {
        color: '#055F9D', 
        fontWeight: 'bold'
    },
    desValue: {
        fontSize: 18, 
        color: '#4D4D4D'
    }
})
