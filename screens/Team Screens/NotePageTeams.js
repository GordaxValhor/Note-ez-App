import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput,Button,Image,TouchableOpacity,FlatList,Modal, ScrollView } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../../assets/globalStyles/globalStyles';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

import { HeaderBackButton } from '@react-navigation/stack';



import { firebaseConfig } from '../../firebase'

import * as firebase from 'firebase';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const NotePageTeams = ({ navigation: { setParams } ,route,navigation}) => {


    console.log('params note page team',route);
    const {Nume,TextContinut,NoteId,TeamId} = route.params;

    const windowWidth = useWindowDimensions().width;

    //console.log(route.params);
    const [numeNote,setNumeNote] = useState(String(Nume));
    const [textNote,setTextNote] = useState(String(TextContinut));


    const [modalVisible, setModalVisible] = useState(false);

    const [showOptions, setShowOptions] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{zIndex:1}}>
                            <TouchableOpacity style={{marginRight:2,paddingHorizontal:20,paddingVertical:5,marginBottom:-8,}} onPress={() => setShowOptions(!showOptions)}>
                                <Image style={{resizeMode: "contain",height:18,}}
                                source={require('../../assets/drawable-xxxhdpi/group88.png')}/>
                            </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <HeaderBackButton
                onPress={() => {
                    //console.log("params: ",currentNumeNote,currentTextNote,NoteId);

                    // handleUpdate(numeNote,textNote,NoteId);
                    
                    // setShouldSave(1)
                    console.log('note id ***:',NoteId)
                    console.log('team id ***:',TeamId)
                    updateNoteFs(numeNote,textNote,TeamId,NoteId)
                    navigation.navigate('Teams', {screen: 'Notes',});
                }} tintColor={'#fff9'}
            />
            ),
        });
      }, [numeNote,textNote,TeamId,NoteId,showOptions]);



      // editare si salvare in firestore

      const updateNoteFs = (numeNote,textNote,teamid,noteid) =>{

        const db = firebase.firestore();

        let newItem = {
            Nume: numeNote,
            TextContinut: textNote,
        }
        db.collection("echipe").doc(teamid).collection('date_notes').doc(noteid).update(newItem)
            .then(()=>{console.log('a  mers updatul din note page teams')})
            .catch((err)=>(console.log(err)));

      }
      


    return (
        <View style={[globalStyles.container,styles.container]}>
        {
            showOptions ? (
            <View style={{position:'absolute',top:0,right:10,borderWidth:1,borderColor:'white',padding:10,borderRadius: 5,backgroundColor:'#0a0a0a',zIndex:1}}>
                <TouchableOpacity >
                    <Text style={{color:'white',paddingTop:8}}>Del</Text>
                </TouchableOpacity>
                <Text style={{color:'white',paddingTop:8}}>Share</Text>
                <Text style={{color:'white',paddingTop:8,paddingBottom:8}}>Copy</Text>                       
            </View>
            ): null
        }
        
        <TextInput multiline value={numeNote} style={[styles.titlu,{marginBottom:15,width: windowWidth-20,}]} onChangeText={text => setNumeNote(text)}  placeholder={'Titlu note'} placeholderTextColor="#fff4"/>
        <TextInput multiline value={textNote} style={[styles.text,{height:'85%',textAlignVertical: "top",width: windowWidth-20,marginBottom:10}]} onChangeText={text=>setTextNote(text)} placeholder={'Note'} placeholderTextColor="#fff4"/>
        {/* <Text>indexu:{index}</Text> */}
        {/* 
        o sa avem partea cu labels 
        1. dam load si afisare DONE
        2. sa poti sa stergi si sa adaugaci noi 
        .. 
        */}
        {/* <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);}}>
                    <View style={{marginBottom:5,}}>
                        <Text style={styles.underText}>+ Add new label</Text>
                    </View>
        </TouchableOpacity>
        <ScrollView horizontal>
        <View style={{flexDirection:'row',marginRight:5}}>
                            <FlatList data={labelsList} contentContainerStyle={{flexDirection:'row'}} renderItem={ ({item}) =>(
                                    <View style={{marginLeft:9,borderWidth:1,borderColor:'gray',paddingVertical:2,paddingHorizontal:4,borderRadius:10,flexDirection:'row'}}>
                                        <Text style={styles.text}>{item.Nume}</Text>
                                        <TouchableOpacity style={{marginLeft:10,}} onPress={()=>RemoveLabel(item.Nume)}>
                                            <Text style={{color:'#BFBFBF'}}>X</Text>
                                        </TouchableOpacity>
                                    </View>
                                    
                                )
                                } keyExtractor={item => item.id}/>       
        </View>
        </ScrollView> */}
        {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={[styles.modalStyle]}>
                    <TouchableOpacity onPress={()=>setModalVisible(!modalVisible)} >
                        <View style={{marginLeft:'90%'}}>
                            <Text style={[globalStyles.text]}>X</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.text}>Lista cu labels</Text>
                    <FlatList data={FullLabelsList} renderItem={ ({item}) =>(
                        <View style={{marginVertical:1,padding:4.5,alignItems:'center'}}>
                            <TouchableOpacity onPress={()=>AddNewLabel(item.LabelId,item.Nume)} >
                                <Text style={styles.text}>{item.Nume}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                    }/>
                        
                </View>
            </Modal>  */}
    </View>
    )
}

export default NotePageTeams
const styles = StyleSheet.create({
    container: {
      //flex: 1,
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
    },
    underText: {
        fontSize:16,
        color:'#BFBFBF',
    },
    modalStyle:{
        width:270,
        height:200,
        borderWidth: 2,
        borderColor:'#8C8C8C',
        backgroundColor: '#0a0a0a',
        margin:5,
        padding: 12,
        borderRadius: 5,
        top: '50%',
        left: '50%',
        transform:[{ translateX: -(270/2+5) }, { translateY: -(250/2) }],
    }
  });
