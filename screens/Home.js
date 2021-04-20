import React from 'react'
import { View, Text,StyleSheet,Button } from 'react-native';

import Header from '../components/header.js';

const Home = ({navigation}) => {
    return (
        <View style={styles.container}> 
            <Header />
            <Text style={styles.text}>Home screen</Text>
            <Text style={styles.text}>Aici o sa fie un flatlist cu toate componentele{'\n'}</Text>
            <Text style={styles.text}>acuma cred ca merge sa lucram in second branch{'\n'}</Text>
            <Button title='Dute la Notite' onPress={()=>{navigation.navigate("Notes")}}/>
        </View>
    )
}

export default Home
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