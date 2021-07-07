import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'

import Header from '../../components/header'

//importam ce trebe pentru expo sqlite hooks
import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';
import * as SQLite from 'expo-sqlite';

import NotesList from '../../components/NotesList';
const NotesTeams = ({navigation,route}) => {


    //pt label filter 

    const [routeLabelId,setRouteLabelId] = useState()
    const [routeTeamId,setRouteTeamId] = useState()

    
    useEffect(() => {
      console.log('route params: ',route.params);
      //console.log('nav:' ,navigation)
      if(route.params != undefined) {
        setRouteLabelId(route.params.LabelId)
        setRouteTeamId(route.params.teamId)
      }
        
      //console.log(routeLabelId)
    },[route,navigation])


    //pt filter
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
                <NotesList navigation={navigation} filterLabels={routeLabelId} route={route} filter={filterSearch} whatNotes='online' teamId={routeTeamId}/>

            {/* <Button title="erase" onPress={()=>eraseTable()}/> */}
        </View>
    )
}

export default NotesTeams
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
