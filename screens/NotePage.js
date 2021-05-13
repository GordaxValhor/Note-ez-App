import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput } from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';


// const navigationOptions = ({navigation}) => {
//   return{
//     headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('A')}}/>)
//  }
// }



const NotePage = ( { navigation: { setParams } ,route} ) => {
    const {Nume,TextContinut,NoteId} = route.params;

    //console.log(route.params);
    const [numeNote,setNumeNote] = useState(String(Nume));
    const [textNote,setTextNote] = useState(String(TextContinut));
    // useEffect(() => {
    //     setParams({
    //         params: {
    //             post: numeNote
    //         }
    //       })
    //   }, [numeNote]);


    //funciton change params
    // const updateParams = async(text)=>{
    //     setParams({
    //         nume:
    //             route.params.nume = numeNote,
    //       })
    //     setNumeNote(text)
    //     setParams({
    //         nume:
    //             route.params.nume = numeNote,
    //       })
    //       console.log(route.params.nume);
    //     }
    

    //modificarea note-ului in baza de date

    const db = new Database("Note-ez-app-DB-try", "1.0");

    
    
    return (
        <View style={[globalStyles.container,styles.container]}>
            <Text style={styles.text}>Id note: {NoteId}</Text>
            <TextInput multiline value={numeNote} style={styles.titlu} onChangeText={text => {setNumeNote(text)}}  placeholder={'Titlu note'} placeholderTextColor="#fff4"/>
            <TextInput multiline value={textNote} style={styles.text} onChangeText={text=>setTextNote(text)} placeholder={'Note'} placeholderTextColor="#fff4"/>
            {/* <Text>indexu:{index}</Text> */}
        </View>
    )
}

export default NotePage
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#0a0a0a',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      color: 'white',
      padding:19
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