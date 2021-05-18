import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput,Button,Image,TouchableOpacity } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';


// const navigationOptions = ({navigation}) => {
//   return{
//     headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('A')}}/>)
//  }
// }



const NotePage = ( { navigation: { setParams } ,route,navigation} ) => {
    const {Nume,TextContinut,NoteId} = route.params;

    const windowWidth = useWindowDimensions().width;

    //console.log(route.params);
    const [numeNote,setNumeNote] = useState(String(Nume));
    const [textNote,setTextNote] = useState(String(TextContinut));
    useEffect(() => {
        setParams({
            newParams: {
                idNote: NoteId,
                newTitlu: numeNote,
                newText: textNote,
            }
          })
      }, [numeNote,textNote]);



      // delte note 
    const deleteNote = useDelete("Notes");
    const handleDelete = (id) => {
        //console.log(nume,continut,id);
        deleteNote({field: "NoteId", conditional: "=", value: id.toString()})
        .then(response => {
            //alert("Pet updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare notes");
            console.error(err);
        })
    }

    //pentru deschidere menu din header navigation

    const [showOptions, setShowOptions] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{zIndex:1}}>
                            <TouchableOpacity style={{marginRight:2,paddingHorizontal:20,paddingVertical:5,marginBottom:-8,}} onPress={() => setShowOptions(!showOptions)}>
                                <Image style={{resizeMode: "contain",height:18,}}
                                source={require('../assets/drawable-xxxhdpi/group88.png')}/>
                            </TouchableOpacity>
            </View>
          ),
        });
      }, [navigation, showOptions]);
    
    
    return (
        <View style={[globalStyles.container,styles.container]}>
            {/* <Text style={styles.text}>Id note: {NoteId}</Text> */}
            {
                showOptions ? (
                <View style={{position:'absolute',top:0,right:10,borderWidth:1,borderColor:'white',padding:10,borderRadius: 5,backgroundColor:'#0a0a0a',zIndex:1}}>
                    <TouchableOpacity onPress={() =>{handleDelete(NoteId);navigation.navigate("Notes")}}>
                        <Text style={{color:'white',paddingTop:8}}>Del</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',paddingTop:8}}>Share</Text>
                    <Text style={{color:'white',paddingTop:8,paddingBottom:8}}>Copy</Text>                       
                </View>
                ): null
            }
            
            <TextInput multiline value={numeNote} style={[styles.titlu,{marginBottom:15,width: windowWidth-20,}]} onChangeText={text => setNumeNote(text)}  placeholder={'Titlu note'} placeholderTextColor="#fff4"/>
            <TextInput multiline value={textNote} style={[styles.text,{height:'90%',textAlignVertical: "top",width: windowWidth-20,}]} onChangeText={text=>setTextNote(text)} placeholder={'Note'} placeholderTextColor="#fff4"/>
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
      padding:19,
      zIndex:0,
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