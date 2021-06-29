import React ,{ useState,useEffect } from 'react'
import { View,StyleSheet, Text,TextInput,Button,Image,TouchableOpacity,FlatList,Modal,KeyboardAvoidingView } from 'react-native'
import { useWindowDimensions } from 'react-native';
import {globalStyles} from '../assets/globalStyles/globalStyles';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

import { HeaderBackButton } from '@react-navigation/stack';

import TaskItem from '../components/TaskItem';

const TaskPage = ({route, navigation }) => {


    const {Nume,SubTask,Id} = route.params;


    const [numeTask,setNumeTask] = useState(String(Nume));
    const [subTaskData,setSubTaskData] = useState(SubTask);


    // back button navigation

    const [showOptions, setShowOptions] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <View style={{zIndex:1}}>
                            <TouchableOpacity style={{marginRight:2,paddingHorizontal:20,paddingVertical:5,marginBottom:-8,}} onPress={() => {setShowOptions(!showOptions);console.log('da',showOptions)}}>
                                <Image style={{resizeMode: "contain",height:18,}}
                                source={require('../assets/drawable-xxxhdpi/group88.png')}/>
                            </TouchableOpacity>
            </View>
          ),
          headerLeft: () => (
            <HeaderBackButton
                onPress={() => {

 
                    setShouldUpdate(true)

                    updateTaskFin(subTaskData, numeTask)
                    navigation.navigate("Tasks");

                }} tintColor={'#fff9'}
            />
            ),
        });
      }, [navigation, shouldUpdate, subTaskData, numeTask, showOptions]);

      const [shouldUpdate, setShouldUpdate] = useState(false)

      const updateTaskFin = (subTaskData,numeTask) =>{
        let subTaskToString = JSON.stringify(subTaskData)

        handleUpdate(numeTask,subTaskToString,Id);

      }




    useEffect(() => {
        
    //    console.log('item din task page:', numeTask)
    //    console.log("sub task",subTaskData)
    //     console.log(route.params)
    //     console.log('navigation',navigation)
      }, []);



      //editare

      const modifyComplete = (id) =>{
        //console.log('nume',nume)
        let newArrList = [...subTaskData];
        newArrList.forEach(item =>{
            if(item.id === id){
                item.completat = !(item.completat);
            }
        })
        setSubTaskData(newArrList)
        //console.log('new arr',arrList)
    }

    const modifyNumeTask = (id,newName) =>{
        //console.log('nume',nume)
        let newArrList = [...subTaskData];
       console.log('new name: ',newName)
       newArrList.forEach(item =>{
            if(item.id === id){
                item.nume = newName;
            }
        })
        setSubTaskData(newArrList)
        //console.log('new arr',arrList)
    }

    const addNewTask = (index) => {
        console.log('indexu masi?',index);
        let newId = subTaskData.length;
        const newItem = {
            id: newId + 1,
            nume: '',
            completat: false,
        }
        let newArrList = [...subTaskData];

        newArrList.splice(index,0,newItem);

        setSubTaskData(newArrList);
        console.log('new array dupa adaugare:',newArrList)
    }




    // salvare in db

    const updateTask = useUpdate("Tasks");

    const handleUpdate = (nume,continut,id) => {
        console.log('continut', continut);
        updateTask({column: "SubTask", value: continut}, {field: "Id", conditional: "=", value: id})
        .then(response => {
            //alert("continut updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare task");
            console.error(err);
        })

        updateTask({column: "Nume", value: nume}, {field: "Id", conditional: "=", value: id})
        .then(response => {
            //alert("updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare task");
            console.error(err);
        })

        
    }


    // stergere 

    const deleteTask = useDelete("Tasks");
    const handleDelete = (id) => {
        //console.log(nume,continut,id);
        deleteTask({field: "Id", conditional: "=", value: id.toString()})
        .then(response => {
            //alert("Pet updated");
            //refresh();
        })
        .catch(err =>{
            alert("Eroare la updatare notes");
            console.error(err);
        })
    }

    // remove subtask

    const removeSubtaskElement = (id) =>{
        let arrAux = [...subTaskData];
        console.log('id:',id)
        arrAux = arrAux.filter(item => item.id != id)
        console.log('after remove:',arrAux)
        console.log('lenght',arrAux.length)
        if(arrAux.length <1){
            const newItem = {
                id: 1,
                nume: '',
                completat: false,
            }
            arrAux = [...arrAux,newItem]
        }
        setSubTaskData(arrAux);
    }
    return (
        <View style={[globalStyles.container,styles.container]}>
                {
                showOptions ? (
                <View style={{position:'absolute',top:0,right:10,borderWidth:1,borderColor:'white',padding:10,borderRadius: 5,backgroundColor:'#0a0a0a',zIndex:1}}>
                    <TouchableOpacity onPress={() =>{handleDelete(Id);navigation.navigate("Tasks")}}>
                        <Text style={{color:'white',paddingTop:8}}>Del</Text>
                    </TouchableOpacity>
                    <Text style={{color:'white',paddingTop:8}}>Share</Text>
                    <Text style={{color:'white',paddingTop:8,paddingBottom:8}}>Copy</Text>                       
                </View>
                ): null
                }

                <TextInput value={numeTask} onChangeText={(text)=> setNumeTask(text)} multiline style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu task'} placeholderTextColor="#fff4" autoCorrect={false} spellCheck={false}/>
                <View style={{flex:1}}>
                                 <KeyboardAvoidingView
                                        behavior='padding'>
                                    <FlatList 
                                        keyboardShouldPersistTaps='handled'
                                        removeClippedSubviews={false}
                                        data={subTaskData}
                                        renderItem={({item,index}) => <TaskItem item={item} index={index} modifyComplete={modifyComplete} modifyNumeTask={modifyNumeTask} addNewTask={addNewTask} removeSubtaskElement={removeSubtaskElement}/>}
                                    />
                                    {/* <View style={{height:100,}}></View> */}
                                    
                                
                               
                                 </KeyboardAvoidingView>
                </View>

        </View>
    )
}

export default TaskPage
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
