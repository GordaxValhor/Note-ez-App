import React,{useState} from 'react'
import { View,StyleSheet, Text,TextInput,TouchableOpacity,Image } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

//importuri pt db work
import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';



const AddNote = ({navigation}) => {

    //dimensiune ecran

    const windowWidth = useWindowDimensions().width;

    //hooks pt db
    const [titlu, setTitlu] = useState('');
    const [text, setText] = useState('');
    const insertTodo = useInsert("Notes");
    //const deleteTodo = useDelete("Notes");

    const addNoteFct = () =>{
        if(titlu != '' || text !=''){
            handleAdd();
        }
        setText('');
        setTitlu('');
        navigation.navigate("Notes");
    }
    const handleAdd = () => {
        insertTodo(["Nume","TextContinut"], [titlu,text])
        .then(response => {
            //alert("To do adaugat");
            //refresh();
        })
        .catch(err => {
            alert("eroare la adaugare notes");
            console.error(err);
        })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.text,{marginBottom: 20,}]} onPress={()=>addNoteFct()}>
                <Image 
                    style={{height:20,width:25,marginVertical:10}}
                    source={require('../assets/drawable-hdpi/drawable-xxhdpi/back-arrow.png')}
                />
            </TouchableOpacity>
                <TextInput multiline  value={titlu} onChangeText={(text) => setTitlu(text)} style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu note'} placeholderTextColor="#fff4" autoFocus={true} />
                <TextInput  multiline  value={text} onChangeText={(text) => setText(text)} style={[styles.text,{height:'90%',textAlignVertical: "top",width: windowWidth-50,}]}  placeholder={'Note'} placeholderTextColor="#fff4"/>
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