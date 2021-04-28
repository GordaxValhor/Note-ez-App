import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

import Header from '../components/header.js';

const Tasks = () => {
    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.text}>Todo/Tasks si toate cele</Text>
        </View>
    )
}

export default Tasks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'white',
      },
      text: {
        color: 'white',
        fontSize: 16,
    }
  });