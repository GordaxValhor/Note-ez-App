import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput,Button,Image,TouchableOpacity,FlatList,Modal } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

import { HeaderBackButton } from '@react-navigation/stack';


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

    // const [currentNumeNote,setCurrentNumeNote] = useState('')
    // const [currentTextNote,setCurrentTextNote] = useState('')

    useEffect(() => {
        // setParams({
        //     newParams: {
        //         idNote: NoteId,
        //         newTitlu: numeNote,
        //         newText: textNote,
        //     }
        //   })
          //setCurrentNumeNote(numeNote);
          //setCurrentTextNote(textNote);
          //console.log(currentNumeNote)
          //console.log('ceva');


            // if(labelsList != undefined){
            //     if(labelsList.length > 0 ){
            //         saveLabelsinDB();
            //       }
            // }
          
      }, [labelsList]);



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
          headerLeft: () => (
            <HeaderBackButton
                onPress={() => {
                    //console.log("params: ",currentNumeNote,currentTextNote,NoteId);

                    handleUpdate(numeNote,textNote,NoteId);
                    
                    setShouldSave(1)
                    navigation.navigate("Notes");
                }} tintColor={'#fff9'}
            />
            ),
        });
      }, [navigation, showOptions,numeNote,textNote,shouldSave]);
    



      const [shouldSave,setShouldSave] = useState(0);

      useEffect(() => {
            if(shouldSave == 1){
                //console.log(labelsList);
                saveLabelsinDB();
            }
      },[shouldSave])


      //pentru update for note
      const updateNote = useUpdate("Notes");
    


    const handleUpdate = (nume,continut,id) => {
        //console.log('nume: ',nume,'continut: ',continut,'id: ',id);
        updateNote({column: "Nume", value: nume}, {field: "NoteId", conditional: "=", value: id})
        .then(response => {
            //alert("updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare notes");
            console.error(err);
        })
        updateNote({column: "TextContinut", value: continut}, {field: "NoteId", conditional: "=", value: id})
        .then(response => {
            //alert("continut updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare notes");
            console.error(err);
        })
    }




      //pentru labels si editare labels

      const {loading, error, data, refresh} = useQuery("select * from LabelsForNotes where IdNote=?", [NoteId]);

        //preluam toate labalurile din label list
      const dataLabel = useQuery("select * from Labels Order by LabelId desc", []);

      const [labelsList,setLabelsList] = useState();
      const [FullLabelsList,setFullLabelsList] = useState();
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
        if(dataLabel.data)
        {
            const labelListAux = [];
            for(let i = 0; i < dataLabel.data.rows.length; i++)
            {
                labelListAux.push(dataLabel.data.rows.item(i));
            }
            setFullLabelsList(labelListAux);
        }
        //refresh();

        //console.log('data:',data)
        //console.log('label list: ',labelsList)
        }, [data,dataLabel.data]);

        //pentru modal

        const [modalVisible, setModalVisible] = useState(false);

        //-------------------------

        //add new label

        const AddNewLabel = (idL,nume) =>{ 
            var label = {
                Nume: nume,
                id: idL,
            }
            //pentru verificare label daca exista deja
    
            let filtramLabels = labelsList.filter(item => item.Nume !== label.Nume)
    
            setLabelsList([...filtramLabels,label])

            //console.log('labels list din add label:',labelsList)
    
        }

        const RemoveLabel = (name) =>{

            setLabelsList((labelsList.filter(item => item.Nume !== name)))
    
        }


        // adaugare labels in baza de data odata ce editarea e terminata
        const [auxLabelList,setAuxLabelList] = useState([]);
        // useEffect(
        //     () =>
        //       navigation.addListener('beforeRemove', (e) => {
               
        //         // Prevent default behavior of leaving the screen
        //         e.preventDefault();
        
                
        //         // alert(
        //         //   'Merge?'
        //         // );
                
        //         //pune apelarea la salvarea in bd

        //         //dam delete la toate labelu-urile care au noteid ca si noteid_actual

        //         setAuxLabelList([...auxLabelList,labelsList]);
        //         console.log('aux label list:',auxLabelList)
        //         console.log('labels list:',labelsList)
        //         //handleDeleteLabel();
                
        //         AddAllLabels();
               
        //         //navigation.dispatch(e.data.action);
                
        //       }),
        //     [navigation]
        //   );
    

        const deleteLabelForNotes = useDelete("LabelsForNotes");
        const insertLabelForNotes = useInsert("LabelsForNotes");


        const AddAllLabels = () =>{
            //console.log('aici');
            labelsList.forEach(item =>{
                //console.log(item);
                handleAddLabelForNotes(item.id,NoteId,item.Nume)
            })
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

        const handleDeleteLabel = () => {
            deleteLabelForNotes({field: "IdNote", conditional: "=", value: NoteId})
                .then(response => {
                    //alert("deleted");
                    //refresh();
                })
                .catch(err =>{
                    alert("Pet can't be deleted");
                    console.error(err);
                })
            }

      const  saveLabelsinDB = () =>{

        //console.log('labels list:',labelsList)

        handleDeleteLabel();
                
        //console.log('labels list:',labelsList)

        AddAllLabels();

        //apparent merge chestia useEffect-ul era problema
      }

    return (
        <View style={[globalStyles.container,styles.container]}>
            {
                showOptions ? (
                <View style={{position:'absolute',top:0,right:10,borderWidth:1,borderColor:'white',padding:10,borderRadius: 5,backgroundColor:'#0a0a0a',zIndex:1}}>
                    <TouchableOpacity onPress={() =>{handleDeleteLabel();handleDelete(NoteId);navigation.navigate("Notes")}}>
                        <Text style={{color:'white',paddingTop:8}}>Del</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',paddingTop:8}}>Share</Text>
                    <Text style={{color:'white',paddingTop:8,paddingBottom:8}}>Copy</Text>                       
                </View>
                ): null
            }
            
            <TextInput multiline value={numeNote} style={[styles.titlu,{marginBottom:15,width: windowWidth-20,}]} onChangeText={text => setNumeNote(text)}  placeholder={'Titlu note'} placeholderTextColor="#fff4"/>
            <TextInput multiline value={textNote} style={[styles.text,{height:'85%',textAlignVertical: "top",width: windowWidth-20,}]} onChangeText={text=>setTextNote(text)} placeholder={'Note'} placeholderTextColor="#fff4"/>
            {/* <Text>indexu:{index}</Text> */}
            {/* 
            o sa avem partea cu labels 
            1. dam load si afisare DONE
            2. sa poti sa stergi si sa adaugaci noi 
            .. 
            */}
            <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);}}>
                        <View style={{marginBottom:5,}}>
                            <Text style={styles.underText}>+ Add new label</Text>
                        </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row',}}>
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
            <Modal
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
                        {/* <Text style={styles.text}>Lista cu labels</Text> */}
                        <FlatList data={FullLabelsList} renderItem={ ({item}) =>(
                            <View style={{marginVertical:1,padding:4.5,alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>AddNewLabel(item.LabelId,item.Nume)} >
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

export default NotePage
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