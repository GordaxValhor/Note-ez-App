import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput,Button,Image,TouchableOpacity,FlatList,Modal } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

const LabelListNote = ({labelsList,NoteId}) => {





    // const {loading, error, data, refresh} = useQuery("select * from LabelsForNotes where IdNote=?", [NoteId]);
    const [labelsListF,setLabelsList] = useState();

    useEffect(() => {
        //Get all pets in the query
        if(labelsList != undefined) {
            let filtramLabels = labelsList.filter(item => item.IdNote == NoteId)
            setLabelsList(filtramLabels)
        }
    },[labelsList])


    return (
        <View style={{flexDirection:'row',width:'100%'}}>
            <FlatList data={labelsListF}  style={{flexDirection:'row',flexWrap:'wrap'}} renderItem={ ({item}) =>(
                <View style={{borderWidth:0.99,borderColor:'gray',paddingVertical:2,paddingHorizontal:4,borderRadius:10,marginRight:5,marginTop:5,}}>
                        <Text numberOfLines={1} style={[styles.underText]}>{item.Nume}</Text>
                </View>
                )
            } keyExtractor={item => String(item.Nume)}/>
        </View>
    )
}

export default LabelListNote
const styles = StyleSheet.create({
    text: {
        color: '#f5f5f5',
        fontSize: 12,
    },
    titlu:{
        color: 'white',
        fontSize: 20,
        marginBottom:10,
    },
    underText: {
        fontSize:12,
        color:'#BFBFBF',
    },
})