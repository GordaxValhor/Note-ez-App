import React, {useState,useEffect} from 'react'
import { View,StyleSheet, Text,TextInput,TouchableOpacity,Image,FlatList,ScrollView,SafeAreaView,KeyboardAvoidingView,} from 'react-native'

import {globalStyles} from '../assets/globalStyles/globalStyles';
import TaskItem from './TaskItem';

import { Ionicons } from '@expo/vector-icons';

import { useWindowDimensions } from 'react-native';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';




const AddTask = ({navigation}) => {



    // const windowHeight= useWindowDimensions().height;

    const [arrList,setArrList] = useState([
        {
            id: 1,
            nume: '',
            completat: false,
        },
    ])

    const modifyComplete = (id) =>{
        //console.log('nume',nume)
        let newArrList = [...arrList];
        newArrList.forEach(item =>{
            if(item.id === id){
                item.completat = !(item.completat);
            }
        })
        setArrList(newArrList)
        //console.log('new arr',arrList)
    }

    const modifyNumeTask = (id,newName) =>{
        //console.log('nume',nume)
        let newArrList = [...arrList];
       console.log('new name: ',newName)
       newArrList.forEach(item =>{
            if(item.id === id){
                item.nume = newName;
            }
        })
        setArrList(newArrList)
        //console.log('new arr',arrList)
    }

    const addNewTask = (index) => {
        console.log('indexu masi?',index);
        let newId = arrList.length;
        const newItem = {
            id: newId + 1,
            nume: '',
            completat: false,
        }
        let newArrList = [...arrList];

        newArrList.splice(index,0,newItem);

        setArrList(newArrList);
        console.log('new array dupa adaugare:',newArrList)
    }


    //--------------------

    const [numeTask,setNumeTask] = useState('');

    //partea cu adaugare in db


    const insertTask = useInsert("Tasks");


    const handleAddTask= (nume,jsonObj) => {
        //console.log('nume:',jsonObj);
        insertTask(["Nume","SubTask"], [nume,jsonObj])
        .then(response => {
            //alert("added");
            //refresh();
        })
        .catch(err => {
            alert("can't be added");
            console.error(err);
        })
    } 
    
    const format_Add_Task = ()=>{
        let auxArrList = JSON.stringify(arrList)
        console.log('stringy',auxArrList);
        console.log('primu item din arr list', arrList[0])
        let firstItemArr = arrList[0];
        if(numeTask != '' || firstItemArr.nume != '') {
            handleAddTask(numeTask,auxArrList);
            setNumeTask('');
            setArrList([
                {
                    id: 1,
                    nume: '',
                    completat: false,
                },
            ])   
        }
        navigation.navigate("Tasks");
    }
    return (
        
        <View style={styles.container}>
            <TouchableOpacity style={[styles.text,{marginBottom: 20,}]} onPress={()=>format_Add_Task()}>
                {/* <Image 
                    style={{height:20,width:25,marginVertical:10}}
                    source={require('../assets/drawable-hdpi/drawable-xxhdpi/back-arrow.png')}
                /> */}
                <Ionicons name="arrow-back" size={24} color="#fff9" />
            </TouchableOpacity>
                <TextInput value={numeTask} onChangeText={(text)=> setNumeTask(text)} multiline style={[styles.titlu,{marginBottom:15,}]}  placeholder={'Titlu task'} placeholderTextColor="#fff9" autoCorrect={false} spellCheck={false}/>
                
                {/* aici o sa avem un flat list care o sa ne arate toata lista de task-uri */}
                        <View style={{flex:1}}>
                                 <KeyboardAvoidingView
                                        behavior='padding'>
                                    <FlatList 
                                        removeClippedSubviews={false}
                                        data={arrList}
                                        renderItem={({item,index}) => <TaskItem item={item} index={index} modifyComplete={modifyComplete} modifyNumeTask={modifyNumeTask} addNewTask={addNewTask}/>}
                                    />
                                    {/* <View style={{height:100,}}></View> */}
                                    
                                
                               
                                 </KeyboardAvoidingView>
                        </View>
                            <TouchableOpacity>
                                <View style={{marginBottom: 70,}}>
                                    <Text style={styles.text}>Switch to simple task</Text>
                                </View>
                            </TouchableOpacity>
                        
        
        </View>
        
        
        
    )
}
// Avem de facut urmatoarele
//  1. Adaugare task-uri
//     - input titlu task
//     - input pentru sub task object
export default AddTask
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a0a0a',
      //alignItems: 'flex-start',
      //justifyContent: 'flex-start',
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