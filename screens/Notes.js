import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const Notes = () => {
    return (
        <View style={styles.container}>
            <Text>Notite si toate cele</Text>
        </View>
    )
}

export default Notes
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff3',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });