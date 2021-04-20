import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Notes = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Notite si toate cele</Text>
        </View>
    )
}

export default Notes
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