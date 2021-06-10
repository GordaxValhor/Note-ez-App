import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet,Image,ScrollView,TouchableOpacity,Modal,TextInput,FlatList } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {globalStyles} from '../assets/globalStyles/globalStyles'

const EditLabel = ({item,handleUpdate,handleDelete}) => {

    const [showEdit,setShowEdit] = useState(false);

    const [newNumeLabel,setNewNumeLabel] = useState(item.Nume)

    useEffect(() => {
        // Initialize the database
        setNewNumeLabel(item.Nume)
      }, [item])

    const updateLabel = () =>{
        setShowEdit(!showEdit);
        handleUpdate(newNumeLabel,item.LabelId);
    }
    const deleteLabel = () =>{
        setShowEdit(!showEdit);
        handleDelete(item.LabelId);
    }

    if(showEdit==false){
        return(
            <View style={styles.stilEditLabel}>
                <TouchableOpacity onPress={()=>setShowEdit(!showEdit)}>
                    <Text style={styles.underText}>{item.Nume}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    else {
        return(
            <View style={[styles.stilEditLabel,{flexDirection: 'row',justifyContent:'space-between'}]}>
                    <TouchableOpacity onPress={()=>deleteLabel()}>
                        <MaterialIcons name="delete-outline" size={24} color="#F2F2F2" />
                    </TouchableOpacity>
                    <TextInput onChangeText={(text)=>setNewNumeLabel(text)}  placeholderTextColor="#fff4" style={[styles.textMic,{marginBottom:15,}]} value={newNumeLabel}></TextInput>
                    <TouchableOpacity onPress={()=>updateLabel()}>
                         <Feather name="check" size={24} color="#F2F2F2" />
                    </TouchableOpacity> 
                    
            </View>
        )
    
    }
}

export default EditLabel
const styles = StyleSheet.create({
    stilEditLabel:{
        marginVertical:1,
        padding:5,
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
    textMic:{
        fontSize:16,
        color:'#F2F2F2',
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