import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Tasks = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Add screen</Text>
        </View>
    )
}

export default Tasks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'space-around',
        color: 'white',
      },
      text: {
        color: 'white',
        fontSize: 16,
    }
  });