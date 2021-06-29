import React,{useState,useEffect} from 'react'
import { View,StyleSheet, Text,TextInput,TouchableOpacity,Image,ScrollView,FlatList,Modal } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

import { Ionicons } from '@expo/vector-icons';


//importuri pt db work
import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';




const AddNote = ({navigation}) => {




    //pentru lista de labels

    const [modalVisible, setModalVisible] = useState(false);


    const {loading, error, data, refresh} = useQuery("select * from Labels Order by LabelId desc", []);

    //asa facem sa luam si inca un querry


    //ultimul id de la ultimul note creat
    const LastId = useQuery("select * from Notes WHERE NoteId  = (select max(NoteId) from Notes)",[]);


    const CeAvemInTabel = useQuery("select * from LabelsForNotes",[]);



    //aici suntem la add odata ce adaugam in label for notes list putem compara si filtra rezultatele din choose modal

    const [labelsList,setLabelsList] = useState();
    const [LastNId ,setLastNId] = useState();
    //const [addedLabelList, setAddedLabelList] = useState([]);
    useEffect(() => {
        //Get all pets in the query
        if(data)
        {
            const labelListAux = [];
            for(let i = 0; i < data.rows.length; i++)
            {
                labelListAux.push(data.rows.item(i));
            }
            setLabelsList(labelListAux);
        }
        //refresh();


        if(LastId.data != undefined) {
            //console.log('last id:',LastId.data.rows.item(0).LabelId)
            setLastNId(LastId.data.rows.item(0).NoteId)
        }
        //console.log('tabel labelsfornotes:',CeAvemInTabel.data)
        setCurrentLabels([]);
    }, [data,navigation]);

    useEffect(() => {
        setCurrentLabels([]);
    }, [navigation])




    //console.log('tabel labelsfornotes:',CeAvemInTabel.data)
    //pentru adaugare LabelsforNotes

    const [currentLabels,setCurrentLabels] = useState([])
    const insertLabelForNotes = useInsert("LabelsForNotes");

    const AddNewLabel = (idL,nume) =>{ 
        var label = {
            nume: nume,
            id: idL
        }
        //pentru verificare label daca exista deja

        let filtramLabels = currentLabels.filter(item => item.nume !== label.nume)

        setCurrentLabels([...filtramLabels,label])

        // let filteredPerson = this.state.likes.filter(like => like.name !== person.name);
        // this.setState({
        // likes: [...filteredPerson, person]
        // })  


        //setCurrentLabels(prevArray => [...prevArray, label])
        //handleAddLabelForNotes(idL,LastNId +1);
    }

    const AddAllLabels = () =>{
        currentLabels.forEach(item =>{
            //console.log(item);
            handleAddLabelForNotes(item.id,LastNId+1,item.nume)
        })
    }
    
    //remove label

    const RemoveLabel = (name) =>{

        setCurrentLabels((currentLabels.filter(item => item.nume !== name)))

    }


    const handleAddLabelForNotes = (idL,idN,nume) => {
            //console.log('idl:',idL,'idN ',idN);
            insertLabelForNotes(["IdLabel", "IdNote","Nume"], [idL, idN,nume])
            .then(response => {
                //alert("added");
                //refresh();
            })
            .catch(err => {
                alert("can't be added");
                console.error(err);
            })
        }


    //dimensiune ecran

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    //hooks pt db
    const [titlu, setTitlu] = useState('');
    const [text, setText] = useState('');
    const insertTodo = useInsert("Notes");
    //const deleteTodo = useDelete("Notes");

    const addNoteFct = () =>{
        if(titlu != '' || text !=''){
            handleAdd();
            AddAllLabels();
        }
        setText('');
        setTitlu('');
        setCurrentLabels([]);
        LastId.refresh();
        //adaugam si labels in tabel labals for notes
        navigation.navigate("Notes");
    }
    const handleAdd = () => {
        insertTodo(["Nume","TextContinut"], [titlu,text])
        .then(response => {
            //alert("To do adaugat");
            //refresh();
        })
        .catch(err => {
            alert("eroare la adaugare notes",err);
            console.error(err);
        })
    }
    
    return (
            <View style={styles.container}>
            <TouchableOpacity style={[styles.text,{marginBottom: 20,}]} onPress={()=>addNoteFct()}>
                {/* <Image 
                    style={{height:20,width:25,marginVertical:10}}
                    source={require('../assets/drawable-hdpi/drawable-xxhdpi/back-arrow.png')}
                /> */}
                <Ionicons name="arrow-back" size={24} color="gray" />
            </TouchableOpacity>
                    <TextInput multiline  value={titlu} onChangeText={(text) => setTitlu(text)} style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu note'} placeholderTextColor="#fff4" autoFocus={true} />
                <ScrollView>
                    <TextInput  multiline  value={text} onChangeText={(text) => setText(text)} style={[styles.text,{height:windowHeight-270,textAlignVertical: "top",width: windowWidth-40,}]}  placeholder={'Note'} placeholderTextColor="#fff4"/>
                </ScrollView>
                <View style={{marginBottom:60,flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);refresh()}}>
                        <View style={{marginBottom:5,}}>
                            <Text style={styles.underText}>Add label</Text>
                        </View>

                    </TouchableOpacity>
                    <View style={{flexDirection:'row'}}>
                                <FlatList data={currentLabels} contentContainerStyle={{flexDirection:'row'}} renderItem={ ({item}) =>(
                                        <View style={{marginLeft:9,borderWidth:1,borderColor:'gray',paddingVertical:2,paddingHorizontal:4,borderRadius:10,flexDirection:'row'}}>
                                            <Text style={styles.text}>{item.nume}</Text>
                                            <TouchableOpacity style={{marginLeft:10,}} onPress={()=>RemoveLabel(item.nume)}>
                                                <Text style={{color:'#BFBFBF'}}>X</Text>
                                            </TouchableOpacity>
                                        </View>
                                        
                                    )
                                    } keyExtractor={item => item.nume.toString()}/>       
                        </View>
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={[styles.modalStyle]}>
                        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                            <View style={{marginLeft:'90%'}}>
                                <Text style={[globalStyles.text]}>X</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <Text style={styles.text}>Lista cu labels</Text> */}
                        <FlatList data={labelsList} renderItem={ ({item}) =>(
                            <View style={{marginVertical:1,padding:4.5,alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>AddNewLabel(item.LabelId,item.Nume)}>
                                    <Text style={styles.text}>{item.Nume}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        }/>
                            
                    </View>
                </Modal>  
        </View>
    )
}

export default AddNote


const styles = StyleSheet.create({
    container: {
      //flex: 1,
      backgroundColor: '#0a0a0a',
        //alignItems: 'flex-start',
      //justifyContent: 'flex-start',
      color: 'white',
      padding:19,
      minWidth:'100%',
      //flexDirection:'column'
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