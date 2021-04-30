import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

import Header from '../components/header.js';

const Tasks = () => {
    return (
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:17}}>
                <Header />
            </View>
            <Text style={[styles.text,{height: 100,marginTop:100,}]}>Todo/Tasks si toate cele</Text>
            <Text style={[styles.text,]}>Todo/Tasks si toate cele</Text>
            <Text style={[styles.text,]}>Todo/Tasks si toate cele</Text>
            <Text style={[styles.text,]}>Todo/Tasks si toate cele</Text>
            <Text style={[styles.text,]}>Todo/Tasks si toate cele</Text>
        </View>
    )
}

export default Tasks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:5,
        //flexWrap: 'wrap',
        backgroundColor: '#1f1f1f',
        alignItems: 'center',
        //justifyContent: 'center',
        color: 'white',

        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
    text: {
        color: 'white',
        fontSize: 16,
    }
  });