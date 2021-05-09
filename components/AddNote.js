import React from 'react'
import { View,StyleSheet, Text,TextInput } from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';

const AddNote = () => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text,{marginBottom: 20,}]}>Go back</Text>
                <TextInput multiline  style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu note'} placeholderTextColor="#fff4" autoFocus={true} />
                <TextInput  multiline  style={[styles.text,{height:'90%',textAlignVertical: "top",width:'100%'}]}  placeholder={'Note'} placeholderTextColor="#fff4"/>
        </View>
    )
}

export default AddNote
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0a0a',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: 'white',
      padding:19,
      minWidth:'100%'
    },
    text: {
        color: '#f5f5f5',
        fontSize: 16,
    },
    titlu:{
        color: 'white',
        fontSize: 20,
        marginBottom:10,
    }
  });