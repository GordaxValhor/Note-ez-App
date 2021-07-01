import React, {useState,useEffect,useRef} from 'react'
import { View,StyleSheet, Text,TextInput,TouchableOpacity,Image,KeyboardAvoidingView } from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';



import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const TaskItem = ({item, modifyComplete, modifyNumeTask, addNewTask,index,removeSubtaskElement}) => {


    //dimensiuni

    
    const [numeTask,setNumeTask] = useState()
    const [isChecked,setIsChecked] = useState();

    // const [showRemove,setShowRemove] = useState(false);
 

    //folosim useref pentru prima data

    const input = useRef(null);


    useEffect(() => {

        //setIsChecked(!(isChecked));
        //console.log('completat',isChecked);
        // console.log('arr:'.arr)
        if(!item) {return;}
        setIsChecked(item.completat)
        setNumeTask(item.nume)

    }, [item])
    useEffect(() => {

        //setIsChecked(!(isChecked));
        //console.log('completat',isChecked);
        // console.log('arr:'.arr)
       modifyNumeTask(item.id,numeTask);

    }, [numeTask])
    useEffect(() => {

        if(input.current){
            input.current.focus();
        }

    }, [input])

    const modCheck = () =>{
        setIsChecked(!isChecked)
    }

    return (
        
        <View style={[styles.container,{flexDirection:'row',alignItems:'flex-start'}]}>
            {/* <Text style={styles.text}>{item.nume}</Text> */}
            {

                isChecked?
                <TouchableOpacity onPress={() => {modifyComplete(item.id);modCheck()}}>
                    <MaterialCommunityIcons name="check-box-outline" size={28} color="#8C8C8C" />
                </TouchableOpacity>:
                <TouchableOpacity onPress={() => {modifyComplete(item.id);modCheck()}}>
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={28} color="white" />
                </TouchableOpacity>

            }
            {/* <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="white" />
            <MaterialCommunityIcons name="check-box-outline" size={24} color="black" /> */}
            
            
            
            <TextInput multiline maxLength={120} ref={input} blurOnSubmit onSubmitEditing={() =>addNewTask(index + 1)} onChangeText={(text)=>{setNumeTask(text)}}  style={[{width:'85%',marginBottom:15,marginLeft:5,},isChecked? styles.checkedText : styles.text]} value={numeTask}  placeholder={'New task'} placeholderTextColor="#fff9" autoCorrect={false} spellCheck={false}/>
            
                <TouchableOpacity onPress={()=>removeSubtaskElement(item.id)}>
                    <Feather name="x" size={24} color="gray" />
                </TouchableOpacity>
        
        </View>

    )
}

export default TaskItem

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#0a0a0a',
    //   alignItems: 'flex-start',
    //   justifyContent: 'flex-start',
    //   color: 'white',
    //   padding:19,
      marginLeft:10,
    //   minWidth:'100%'
    },
    text: {
        color: '#f5f5f5',
        fontSize: 16,
    },
    checkedText: {
        color:'#8C8C8C',
        fontSize: 16,
        textDecorationLine: 'line-through',
    },
    titlu:{
        color: 'white',
        fontSize: 20,
        marginBottom:10,
    }
  });
