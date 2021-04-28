import React from 'react'
import { View, Text,StyleSheet,Button,StatusBar, } from 'react-native';

import Header from '../components/header.js';

import Notes from './Notes';

const Home = ({navigation}) => {
    //aici o sa avem ca toate functionalitatile
    return (
        
        <View style={styles.container}> 
            <StatusBar
                barStyle="light-content"
                backgroundColor="#1f1f1f"
            />
            <Header />
            <Notes navigation={navigation}/>
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
      //justifyContent: 'space-around',
      color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
  });