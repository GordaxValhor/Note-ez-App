import React ,{ useState,useEffect } from 'react'
import { View, Text,StyleSheet,ScrollView,FlatList,Button } from 'react-native'


import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';


import Header from '../components/header.js';
import TaskList from '../components/TaskList.js';


// const obiecte =[
//     {nume: 'Ce facem maine',text: 'dsadadsasdadadddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100,},
//     {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100},
//     {nume: 'Ada 13',text: 'ieri am mers sa vad cum se mai simte coco',height:130},
//     {nume: 'Ada 14',text: 'dsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 15',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 16',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 17',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 18',text: '',height:150},
//     {nume: 'Ada 19',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 143',text: 'dsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 152',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 161',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 172',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 183',text: 'dsadadsasdad',height:190},
//     {nume: 'Ada 193',text: 'dsadadsasdad',height:100},
// ]



const Tasks = ({navigation,route}) => {



    // const obiectTest = {
    //     nume: 'test 1 task',
    //     completat: 'false'
    // }
    // const obiectTest2 = {
    //     nume: 'test 2 task',
    //     completat: 'true'
    // }
    // var arrTest = [obiectTest,obiectTest2]
    //testare salvare si load json

    const fct = () =>{
        //console.log('array de test cu Json:',arrTest)

        //______________
        //

        // aici avem exmplu cum trasformam obiectul din text in object si invers
        arrTest.forEach(item =>{
            console.log('obj:',item.nume)
        })
        let arrTestString = JSON.stringify(arrTest)
        console.log('string pt arr',arrTestString)

        
        // let arrTestj = JSON.parse(arrTestString)
        // console.log('json pt arr', arrTestj)

        // arrTestj.forEach(item =>{
        //     console.log('obj:',item.nume)
        // })

        //alert(typeof arrTestString)
        handleAddTask('test',arrTestString);
    }



    //db 


    // const {loading, error, data, refresh} = useQuery("select * from Tasks");

    // const [taskList,setTasksList] = useState();


    // const insertTask = useInsert("Tasks");



    // const handleAddTask= (nume,jsonObj) => {
    //     //console.log('nume:',jsonObj);
    //     insertTask(["Nume","SubTask"], [nume,jsonObj])
    //     .then(response => {
    //         alert("added");
    //         //refresh();
    //     })
    //     .catch(err => {
    //         alert("can't be added");
    //         console.error(err);
    //     })
    // } 

    return (
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:17}}>
                <Header  navigation={navigation}/>
            </View>
            {/* <Text style={[styles.text,{height: 50,marginTop:50,}]}>Todo/Tasks si toate cele</Text> */}
            {/* <Button title="test" onPress={() => {fct()}}/> */}
            <TaskList navigation={navigation} route={route}/>
        </View>
    )
}


// taskList.filter((_,i)=>i% 2 == 0)

export default Tasks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:7,
        //flexWrap: 'wrap',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        //justifyContent: 'center',
        color: 'white',

        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
    text: {
        color: 'white',
        fontSize: 16,
    },
    taskStyle: {
        flex: 1,
        //flexDirection:'row',
        minWidth: 165,
        maxWidth: 185,
        minHeight: 110,
        maxHeight: 500,
        borderWidth: 1,
        borderColor:'#8C8C8C',
        backgroundColor: 'transparent',
        margin:5,
        padding: 12,
        borderRadius: 5,
    }
  });