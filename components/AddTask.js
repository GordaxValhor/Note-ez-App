import React, {useState} from 'react'
import { View,StyleSheet, Text,TextInput,TouchableOpacity,Image } from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';





const AddTask = ({navigation}) => {

    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.text,{marginBottom: 20,}]}>
                <Image 
                    style={{height:20,width:25,marginVertical:10}}
                    source={require('../assets/drawable-hdpi/drawable-xxhdpi/back-arrow.png')}
                />
            </TouchableOpacity>
                <TextInput multiline   style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu task'} placeholderTextColor="#fff4" autoFocus={true}  autoCorrect={false} spellCheck={false}/>
                <TextInput  multiline   style={[styles.text,{height:'90%',textAlignVertical: "top",width:'100%'}]}  placeholder={'task'} placeholderTextColor="#fff4"/>
        </View>
    )
}
export default AddTask
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