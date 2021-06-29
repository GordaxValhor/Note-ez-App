import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'

import Header from '../components/header'

//importam ce trebe pentru expo sqlite hooks
import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';
import * as SQLite from 'expo-sqlite';

import NotesList from '../components/NotesList';

//ingoram log boxurile
LogBox.ignoreAllLogs();

// const obiecte =[
//     {nume: 'Ce facem maine',text: 'dsadadsasdadadddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100,},
//     {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsa',height:100},
//     {nume: 'Ada 13',text: 'ieri am mers sa vad cum se mai simte coco',height:100},
//     {nume: 'Ada 14',text: 'dsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 15',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 16',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 17',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 18',text: '',height:100},
//     {nume: 'Ada 19',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 143',text: 'dsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 152',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 161',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 172',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
//     {nume: 'Ada 183',text: 'dsadadsasdad',height:100},
//     {nume: 'Ada 193',text: 'dsadadsasdad',height:100},
    
// ]

// sql pt creare tabel
const tableNotes = `create table if not exists Notes(NoteId INTEGER PRIMARY KEY,Nume TEXT,TextContinut TEXT, Imagini TEXT, Fisiere TEXT, Etichete TEXT, Preferinte TEXT, DataCreare TEXT, UltimaEditare TEXT,Arhiva TEXT);`

const tableLabels = `create table if not exists Labels(LabelId INTEGER PRIMARY KEY, Nume TEXT);`

const tableLabelsForNotes = `create table if not exists LabelsForNotes(Id INTEGER PRIMARY KEY, IdLabel TEXT, IdNote TEXT,Nume Text);`

const tableTask = `create table if not exists Tasks(Id INTEGER PRIMARY KEY, Nume TEXT, SubTask TEXT);` //mai tre sa pun si partea date-istorice si temporala

//const drop =`DROP TABLE Labels;`
const Notes = ( {navigation,route} ) => {



    // pentru filtru page
    //const {LabelId} = route.params.item;
  const [routeLabelId,setRouteLabelId] = useState()
    



    useEffect(() => {
      //console.log('route params: ',route.params);
      //console.log('nav:' ,navigation)
      if(route.params != undefined)
        setRouteLabelId(route.params.LabelId)
      //console.log(routeLabelId)
    },[route,navigation])
    //----------------------------
    //use state si use effect pentru refresh
    

    //---------------------
    
    const [db, setDB] = useState(null);

    useEffect(() => {
      // Initialize the database
      const db = new Database("Note-ez-app-DB-try", "1.0");
      db.createTables([tableNotes,tableLabels,tableLabelsForNotes,tableTask])
      .then(response => {
        setDB(db);
      })
      .catch(err => {
        //Do something...
      })
      //console.log('connetiune la db din notes',db);
    }, [])

    

 


     //-----!!!-----------------------------------
     //facem un state pentru refresh pe care o sa il trimitem la notelist 
     //in note list facem un useeffect ca sa putem da refresh in functie de propul refresh primit din notes




     // functi pt debugging

     const eraseTable = () =>{
      let db = SQLite.openDatabase("Note-ez-app-DB-try1.0");
      //console.log(db)

      // ---------------------!!!!!!Aparent asa se face un sqlite trazaction !!!!-----------------------
      db.transaction(tx => {
        tx.executeSql(
          'DROP TABLE Tasks;',
          [],
          (tx, result) => {
            console.log(result)
          },
          (tx, error) => {
            console.log(error);
          }
        );
      });
     }



     // pentru filter

     const [filterSearch,setFilterSearch] = useState(null);


     const filterFct = (text) =>{
          setFilterSearch(text)
     }
    return (
        <View style={styles.container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor="#0a0a0a"
            />
            <View style={{justifyContent:'center',alignItems:'center',marginBottom:17}}>
                <Header  navigation={navigation} filterFct={filterFct} filter={filterSearch}/>
            </View>
            {
                db === null ? 
                <Text>Loading DB</Text>
              :
                <DBProvider db={db}>
                    <NotesList navigation={navigation} filterLabels={routeLabelId} route={route} filter={filterSearch}/>
                </DBProvider>
            }
            
            {/* <Button title="erase" onPress={()=>eraseTable()}/> */}
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