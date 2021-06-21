import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,Image,ScrollView,TouchableOpacity,Modal,TextInput,FlatList } from 'react-native'

import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

import {globalStyles} from '../assets/globalStyles/globalStyles'

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

import { useNavigation } from '@react-navigation/native';


//pentru icons 

import { MaterialIcons } from '@expo/vector-icons';

import EditLabel from '../components/EditLabel';


const DrawerMenu = ({navigation}) => {

    //const navigation = useNavigation();


    const [modalVisible, setModalVisible] = useState(false);

    //inserare in baza de data a labels
    const {loading, error, data, refresh} = useQuery("select * from Labels Order by LabelId desc", []);

    const [labelsList,setLabelsList] = useState();
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
        //console.log(data)
    }, [data]);

    //console.log('labels table:',data)
    const [numeLabel,setNumeLabel] = useState('')
    const insertLabel = useInsert("Labels");
    const updateLabel = useUpdate("Labels");
    const updateLabelForNotes = useUpdate("LabelsForNotes");
    const deleteLabel = useDelete("Labels");

    const addLabel = () =>{
        handleAdd();
        setModalVisible(!modalVisible)
    }
    const handleAdd = () => {
        insertLabel(["Nume"], [numeLabel])
        .then(response => {
            //alert("To do adaugat");
            refresh();
        })
        .catch(err => {
            alert("eroare la adaugare label");
            console.error(err);
        })
        //refresh();
    }

    //pentru editare si stergere labels


    const handleUpdate = (newNume,id,oldNume) => {
        updateLabel({column: "Nume", value: newNume}, {field: "LabelId", conditional: "=", value: id})
        .then(response => {
            //alert("Label update succ");
            refresh();
        })
        .catch(err =>{
            //alert("esec");
            console.error(err);
        })
        updateLabelForNotes({column: "Nume", value: newNume}, {field: "Nume", conditional: "=", value: oldNume})
        .then(response => {
            //alert("Label for notes update succ");
            refresh();
        })
        .catch(err =>{
            //alert("esec");
            console.error(err);
        })
    }
    
    const handleDelete = (id) => {
        deleteLabel({field: "LabelId", conditional: "=", value: id})
        .then(response => {
            //alert("Label deleted");
            refresh();
        })
        .catch(err =>{
            //alert("label can't be deleted");
            console.error(err);
        })
    }
   





    return (
        <View style={[globalStyles.container,styles.container]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={[styles.modalStyle,{top:'35%',left:'25%'}]}>
                        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                            <View style={{marginLeft:'90%'}}>
                            <Text style={[globalStyles.text]}>X</Text>
                            </View>
                        </TouchableOpacity>
                            <View style={{margin:15,padding:5,alignItems:'center'}}>
                                {/* <Text style={globalStyles.text}>Adauga un label nou</Text> */}
                                <TextInput textAlign={'center'} onChangeText={(text)=>setNumeLabel(text)} placeholderTextColor="#fff4" style={globalStyles.text} placeholder='Adauga un label nou'></TextInput>
                            </View>
                        <TouchableOpacity onPress={()=> addLabel()}>
                            <Text style={globalStyles.text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={{borderBottomWidth:1,borderColor:'white',width:'100%',padding:10}}>
                        <Image
                        style={{resizeMode:'contain',height:50,width:'100%'}}
                        source={require('../assets/drawable-xxhdpi/grp25.png')}
                        />
                </View>
                <View style={{marginTop:20, width:'100%',padding:10,}}>
                    <Text style={styles.titlu}>Account</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>
                        <Text style={globalStyles.text}>Nume cont</Text>
                        <View style={{width:50,height:50,borderWidth:1,borderRadius:50,borderColor:'gray'}}></View>
                    </View>
                </View>
                <ScrollView style={{marginTop:20,flex:1}}>
                    <View>
                        <View style={{marginLeft:9}}>
                            <Text style={styles.titlu}>Teams</Text>
                            <View style={{marginLeft:20,marginTop:5,}}>
                                <Text style={styles.underText}>Echipa 1</Text>
                                <Text style={styles.underText}>Echipa 2</Text>
                            </View>
                        </View>
                        <View style={{marginTop:20,marginLeft:9,width:250,}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                                <Text style={styles.titlu}>Labels</Text>
                                <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                    <Text style={styles.titlu}>Add</Text>
                                </TouchableOpacity>
                            </View>
                                <View style={{marginLeft:20,marginTop:5,}}>
                                    <View>
                                        <FlatList 
                                            data={labelsList}
                                            renderItem={( {item} ) =>(
                                                <View>
                                                        <EditLabel item={item} handleUpdate={handleUpdate} handleDelete={handleDelete} navigation={navigation}/>
                                                </View>
                                                )}
                                        />
                                    </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:80,borderTopWidth: 1,borderColor:'white',width:'100%',padding:5}}>
                    <Text style={globalStyles.text}>sectiune setting</Text>
                </View>
        </View>
    )
}

export default DrawerMenu


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'flex-start',
        //justifyContent: 'flex-start',
        //alignItems:'flex-start',
        backgroundColor: '#0a0a0a',
        borderRightWidth: 1,
        borderColor: 'white',
        
    },
    titlu: {
        fontSize: 18,
        color: 'white',
    },
    underText: {
        fontSize: 16,
        color:'#BFBFBF',
        marginBottom:5,
    },
    modalStyle:{
        width:270,
        minHeight:120,
        borderWidth: 2,
        borderColor:'#8C8C8C',
        backgroundColor: '#0a0a0a',
        margin:5,
        padding: 12,
        borderRadius: 5,
    }
})
