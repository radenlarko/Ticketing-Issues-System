import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { IconAccount, IconAccountActive, IconHome, IconHomeActive, IconIssues, IconIssuesActive } from '../../assets';

const TabItem = ({isFocused, onPress, onLongpress, label}) => {
    const Icon = () => {
        if (label === 'Home') return isFocused ? <IconHomeActive /> : <IconHome />;
        if (label === 'Issues') return isFocused ? <IconIssuesActive /> : <IconIssues />;
        if (label === 'Account') return isFocused ? <IconAccountActive /> : <IconAccount />;
        return <IconHome />;
    }
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongpress} style={styles.container}>
            <Icon />
            <Text style={styles.text(isFocused)}>{label}</Text>
        </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
      },
      text: (isFocused) => ({
        fontSize: 12,
        color: isFocused ? '#055F9D' : '#ADADAD'
      })
})
