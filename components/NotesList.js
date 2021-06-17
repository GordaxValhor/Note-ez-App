import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'
import { NavigationContainer,useRoute,useNavigation } from '@react-navigation/native';
import MasonryList from '@appandflow/masonry-list';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';

const NotesList = ({navigation,filterLabels}) => {

    //const navigation = useNavigation();

    const {loading, error, data, refresh} = useQuery("select * from Notes Order by NoteId desc", []);

    const [Notes, setNotes] = useState([])

    //---------------------


    const AllLabelsId = useQuery("select * from LabelsForNotes", []);
    const [allLabelsId,setAllLabelsId] =useState()
    useEffect(() => {
        if(data)
        {
            const NotesListAux = [];
            for(let i = 0; i < data.rows.length; i++)
            {
                NotesListAux.push(data.rows.item(i));
            }
            setNotes(NotesListAux);
        }
        if(AllLabelsId.data){
            const labelListAux = [];
            for(let i = 0; i < AllLabelsId.data.rows.length; i++)
            {
                labelListAux.push(AllLabelsId.data.rows.item(i));
            }
            setAllLabelsId(labelListAux);
        }
        refresh();
        AllLabelsId.refresh();
    }, [data,navigation,AllLabelsId.data]);

    //pentru filtru labels
    
    useEffect(()=>{
        
        console.log('filter label din note list: ',filterLabels);

    },[filterLabels]);


    //functie creare array care contine doar id-urile notitelor care corespund cu id label pe care il avem ca filtre

    const filterNotesForCurrentLabel = () =>{

        let filteredNotesId = [];
        //console.log(allLabelsId)
        if(allLabelsId != undefined){
            allLabelsId.forEach( item => {
                if(item.IdLabel == filterLabels){
                    filteredNotesId.push(parseInt(item.IdNote))
                }
            })
        }

        var notesAux = Notes;

        //notesAux.filter(item => filteredNotesId.includes(item.NoteID))

        var newNotesAux = [];
        notesAux.forEach(item => {
            //console.log('item id:',item.NoteId);
            if(filteredNotesId.includes(item.NoteId)){
                newNotesAux.push(item);
            }
        })
        console.log('list de id notes: ', filteredNotesId);
        console.log('list de notes filtrate: ', newNotesAux);
    }



    return (
        <ScrollView>
                <View style={{height:50}}></View>
                <Button title='Apasa' onPress={()=> filterNotesForCurrentLabel()}></Button>
                    <ScrollView >
                        <View style={{flex:1,flexDirection:'row'}}>
                            <FlatList 
                                data={Notes.filter((_,i)=>i% 2 == 0)}
                                renderItem={( {item} ) =>(
                                    <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                        <Text style={styles.title}>{item.Nume}</Text>
                                        <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                        {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                    </TouchableOpacity>)}
                            />
                            <FlatList 
                                data={Notes.filter((_,i)=>i% 2 !== 0)}
                                renderItem={( {item} ) =>(
                                    <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                        <Text style={styles.title}>{item.Nume}</Text>
                                        <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                        {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                    </TouchableOpacity>)}
                            />
                        </View>
                        <View style={{height:100}}></View>
                    </ScrollView>
        </ScrollView>
    )
}

export default NotesList
const styles = StyleSheet.create({
   
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
        minHeight: 70,
        maxHeight: 500,
        borderWidth: 1,
        borderColor:'#8C8C8C',
        backgroundColor: 'transparent',
        margin:5,
        padding: 12,
        borderRadius: 5,
    }
  });