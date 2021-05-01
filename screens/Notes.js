import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'

import Header from '../components/header'

import MasonryList from '@appandflow/masonry-list';


//importam ce trebe pentru expo sqlite hooks
import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';


//ingoram log boxurile
LogBox.ignoreAllLogs();

const obiecte =[
    {nume: 'Ce facem maine',text: 'dsadadsasdadadddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100,},
    {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100},
    {nume: 'Ada 13',text: 'ieri am mers sa vad cum se mai simte coco',height:100},
    {nume: 'Ada 14',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 15',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 16',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 17',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 18',text: '',height:100},
    {nume: 'Ada 19',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 143',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 152',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 161',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 172',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 183',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 193',text: 'dsadadsasdad',height:100},
    
]

// sql pt creare tabel
const tableN = `create table if not exists Notes(NoteId INTEGER PRIMARY KEY,Nume TEXT,TextContinut TEXT, Imagini TEXT, Fisiere TEXT, Etichete TEXT, Preferinte TEXT, DataCreare TEXT, UltimaEditare TEXT,Arhiva TEXT);`


const Notes = ( {navigation, dateNote} ) => {

    

    // ca sa modific in lista luam ce parametri din route si schimbam in array
    // aparent tre sa luam parametri cum am facut si dincolo
    //console.log(route.params);
    // const updateNotes = (obj) =>{
    //     //console.log('aha');
    //     if(obj.params != undefined) {
    //         console.log('obj din fuct update notes',obj.params.params.nume);
    //         console.log('obiecte:',obiecte[3][0].nume)
    //         for(let i=0;i<=obiecte.length;i++){
    //             // if(obiecte[i].nume == obj.params.params.nume){
    //             //     obiecte[i].nume = obj.params.params.params.post;
    //             // }
    //         }

    //     }
        
    // }

    // useEffect(() => {
    //     console.log("date din notes:",dateNote)
    //     if(dateNote != undefined)
    //     {updateNotes(dateNote);}
    //   }, [dateNote]);



    //conectare la db si creare db
    
    const [db, setDB] = useState(null);

    useEffect(() => {
      // Initialize the database
      const db = new Database("Note-ez-app-DB-try", "1.0");
      db.createTables([tableN])
      .then(response => {
        setDB(db);
      })
      .catch(err => {
        //Do something...
      })
      console.log(db);
    }, [])








    return (
        <View style={styles.container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor="#0a0a0a"
            />
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:17}}>
                <Header />
            </View>
            <ScrollView>
            <View style={{height:50}}></View>
                <MasonryList 
                    data={obiecte}
                    renderItem={( {item} ) =>(
                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                            <Text style={styles.title}>{item.nume}</Text>
                            <Text style={styles.text}>{item.text}</Text>
                        </TouchableOpacity>)}
                    getHeightForItem={({ item }) => item.height + 2}
                    numColumns={2}
                    keyExtractor={item => item.nume}
                />
                <View style={{height:100}}></View>
            </ScrollView>
            {/* <Button title="vezi 2" onPress={console.log("din notes",dateNote)}/> */}
        </View>
    )
    }
export default Notes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:7,
        backgroundColor: '#0a0a0a',
        //alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
      title:{
        color: '#F2F2F2',
        fontSize: 18,
        marginBottom:3,
        fontWeight: '900',
      },
      text: {
        color: '#f0f0f0',
        fontSize: 14,
        fontWeight: '200',
    },
    noteStyle: {
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