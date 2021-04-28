import React ,{ useState } from 'react'
import { View,StyleSheet, Text,TextInput } from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';


// const navigationOptions = ({navigation}) => {
//   return{
//     headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('A')}}/>)
//  }
// }



const NotePage = ( {route} ) => {
    const {nume,text} = route.params;
    
    const [numeNote,setNumeNote] = useState(String(nume));
    const [textNote,setTextNote] = useState(String(text));

    return (
        <View style={[globalStyles.container,styles.container]}>
            <TextInput multiline value={numeNote} style={styles.titlu} onChangeText={text =>setNumeNote(text)}  placeholder={'Titlu note'} placeholderTextColor="#fff4"/>
            <TextInput multiline value={textNote} style={styles.text} onChangeText={text=>setTextNote(text)} placeholder={'Note'} placeholderTextColor="#fff4"/>
        </View>
    )
}

export default NotePage
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#1f1f1f',
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