import React from 'react'
import { View, Text,StyleSheet,ScrollView,FlatList } from 'react-native'

import Header from '../components/header.js';


const obiecte =[
    {nume: 'Ce facem maine',text: 'dsadadsasdadadddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100,},
    {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100},
    {nume: 'Ada 13',text: 'ieri am mers sa vad cum se mai simte coco',height:130},
    {nume: 'Ada 14',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 15',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 16',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 17',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 18',text: '',height:150},
    {nume: 'Ada 19',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 143',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 152',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 161',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 172',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 183',text: 'dsadadsasdad',height:190},
    {nume: 'Ada 193',text: 'dsadadsasdad',height:100},
]



const Tasks = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:17}}>
                <Header  navigation={navigation}/>
            </View>
            <Text style={[styles.text,{height: 50,marginTop:50,}]}>Todo/Tasks si toate cele</Text>
            <ScrollView >
                <View style={{flex:1,flexDirection:'row'}}>
                    <FlatList 
                        data={obiecte.filter((_,i)=>i% 2 == 0)}
                        renderItem={({item})=>(
                            <View style={styles.taskStyle}>
                                <Text style={styles.text}>{item.nume}</Text>
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        )}
                    />
                    <FlatList 
                        data={obiecte.filter((_,i)=>i% 2 !== 0)}
                        renderItem={({item})=>(
                            <View style={styles.taskStyle}>
                                <Text style={styles.text}>{item.nume}</Text>
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
                        )}
                    />
                </View>
                <View style={{height:100}}></View>
            </ScrollView>
        </View>
    )
}

export default Tasks
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:5,
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