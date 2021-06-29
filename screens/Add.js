import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,Button,} from 'react-native'
import { NavigationContainer,useRoute,useNavigation } from '@react-navigation/native';
import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';


import { DBProvider } from 'expo-sqlite-hooks/context/database';

import * as SQLite from 'expo-sqlite';

import AddNote from '../components/AddNote';
import AddTask from '../components/AddTask'

//let db = SQLite.openDatabase("Note-ez-app-DB-try", "1.0");

import Database from 'expo-sqlite-hooks/database';

const Add = ({addWhat}) => {
    //console.log('route din add screen', addWhat)
    // // const route = useRoute();
    // //const prevScreen = route.state.index;
    // console.log('route din useNavigation',route )
    const db = new Database("Note-ez-app-DB-try", "1.0");

    const navigation = useNavigation();
    //aste e pentru ce screen afisam task sau note
    const [ceScreen,setCeScreen] = useState();

    useEffect(() => {
        //console.log('route din add screen', addWhat)
        if(addWhat.state){
            let prevScreenAux = addWhat.state.history[addWhat.state.history.length-2].key;
            if(prevScreenAux.includes('Notes')){
                setCeScreen('notes')
            }
            else if(prevScreenAux.includes('Task')){
                setCeScreen('task')
            }
        }
        //console.log('conectiune la db din add',db)
        //console.log("obicetul navigation din add component:",navigation)
    }, [addWhat])

    // din cate imi dau seama aici in add o sa facem inserarea in tabel 
        // apelam functia de inserare din butonul de back cat si facem navigare spre Notes



    
    return (
        <View style={styles.container}>
                <View>
                        {ceScreen == 'notes' ? <DBProvider db={db}><AddNote navigation={navigation}/></DBProvider> : <AddTask navigation={navigation}/>}
                </View>
        </View>
    )
}

export default Add
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
      },
      text: {
        color: 'white',
        fontSize: 16,
    }
  });