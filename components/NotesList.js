import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'
import { NavigationContainer,useRoute,useNavigation } from '@react-navigation/native';
import MasonryList from '@appandflow/masonry-list';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';


import LabelListNote from './LabelListNote';



const NotesList = ({navigation,filterLabels,route,filter}) => {

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
        if(filterLabels != undefined){
            console.log('show filter',showFilteredList)
            filterNotesForCurrentLabel();
            setShowFilteredList(1);
        }
        else {
            setShowFilteredList(0);
        }
        

    },[filterLabels,navigation,route]);


    //functie creare array care contine doar id-urile notitelor care corespund cu id label pe care il avem ca filtre

    const filterNotesForCurrentLabel = () =>{

        let filteredNotesId = [];
        //console.log('labels id: ',allLabelsId)
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
        //console.log('list de id notes: ', filteredNotesId);
        //console.log('list de notes filtrate: ', newNotesAux);
        setShowFilteredList(1);
        setFilteredNotes(newNotesAux);
        //console.log('filtered notes:',filteredNotes);
    }

    const [filteredNotes,setFilteredNotes] = useState()
    const [showFilteredList,setShowFilteredList] = useState(0);


    //-------------------------------
    //pentru filtru din search

    useEffect(()=>{

        //console.log('filter din search',filter);
        if(showFilteredList != 1){
            searchFilterFunction(filter);
        }

        // searchFilterFunction(filter);
        //console.log(filteredData);

    },[filter,filteredData,data])

    const [filteredData,setFilteredData] = useState()
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
        
          let notesDataAux = Notes;
         
          
          const newData = notesDataAux.filter(
            function (item) {
              // Applying filter for the inserted text in search bar
              const itemData = item.Nume
                  ? item.Nume.toUpperCase()
                  : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;
            }
          );
          setFilteredData(newData);
          setShowFilteredList(2)
          //setNotes(newData);
          //setSearch(text);

        } else {
          // Inserted text is blank
          // Update FilteredDataSource with masterDataSource
        //   if(showFilteredList != 1){
        //     setFilteredData(Notes);
        //     setShowFilteredList(0);
        //   }

          setFilteredData(Notes);
          setShowFilteredList(0);

          //setSearch(text);
        }
      };



      // 1 cazul cu filtre labels
      // 0  normal
      // 2 filtru search
    if(showFilteredList == 1){
        return (
        <View style={styles.container}>
                <View style={{marginTop:50,marginLeft:10,marginBottom:10,}}>
                    <TouchableOpacity onPress={()=> {setShowFilteredList(0);}}>
                        <Text style={styles.underText}>{`<`} Go Back to NOTES</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={{height:10}}></View>
                    {/* <Button title='Back' onPress={()=> {setShowFilteredList(0);}}></Button> */}
                        <ScrollView >
                            <View style={{flex:1,flexDirection:'row',margin:0,}}>
                                <FlatList 
                                    data={filteredNotes.filter((_,i)=>i% 2 == 0)}
                                    renderItem={( {item} ) =>(
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>
                                        </TouchableOpacity>)}
                                />
                                <FlatList 
                                    data={filteredNotes.filter((_,i)=>i% 2 !== 0)}
                                    renderItem={( {item} ) =>(
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>
                                        </TouchableOpacity>)}
                                />
                            </View>
                            <View style={{height:100}}></View>
                        </ScrollView>
            </ScrollView>
        </View>

        )
    }
    else if(showFilteredList == 0) {
        return (
            <ScrollView>
                    <View style={{height:50}}></View>
                    {/* <Button title='Apasa' onPress={()=> filterNotesForCurrentLabel()}></Button> */}
                        <ScrollView >
                            <View style={{flex:1,flexDirection:'row',margin:0}}>
                                <FlatList 
                                    data={Notes.filter((_,i)=>i% 2 == 0)}
                                    renderItem={( {item} ) =>(
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>

                                        </TouchableOpacity>)}
                                />
                                <FlatList 
                                    data={Notes.filter((_,i)=>i% 2 !== 0)}
                                    renderItem={( {item} ) =>(
                                        <View>
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <View styles={{flexDirection:'row',flex:1,}}>
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>
                                            </View>
                                        </TouchableOpacity>
                                        
                                        
                                        </View>
                                        )
                                    }
                                />
                            </View>
                            <View style={{height:100}}></View>
                        </ScrollView>
            </ScrollView>
        )
    }
    else if(showFilteredList == 2) {
        return (
            <ScrollView>
                    <View style={{height:50}}></View>
                    {/* <Button title='Apasa' onPress={()=> filterNotesForCurrentLabel()}></Button> */}
                        <ScrollView >
                            <View style={{flex:1,flexDirection:'row',margin:0}}>
                                <FlatList 
                                    data={filteredData.filter((_,i)=>i% 2 == 0)}
                                    renderItem={( {item} ) =>(
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>

                                        </TouchableOpacity>)}
                                />
                                <FlatList 
                                    data={filteredData.filter((_,i)=>i% 2 !== 0)}
                                    renderItem={( {item} ) =>(
                                        <View>
                                        <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                                            <Text style={styles.title}>{item.Nume}</Text>
                                            <Text numberOfLines={20}style={styles.text}>{item.TextContinut} </Text>
                                            {/* <Text style={styles.text}>{item.NoteId} </Text> */}
                                            <View styles={{flexDirection:'row',flex:1,}}>
                                            <LabelListNote labelsList={allLabelsId} NoteId={item.NoteId}/>
                                            </View>
                                        </TouchableOpacity>
                                        
                                        
                                        </View>
                                        )
                                    }
                                />
                            </View>
                            <View style={{height:100}}></View>
                        </ScrollView>
            </ScrollView>
        )
    }
}

export default NotesList
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
        //marginRight:-55,
        // paddingHorizontal: 10,
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
    underText: {
        fontSize:16,
        color:'#BFBFBF',
    },
    noteStyle: {
        //flex: 1,
        flexDirection:'column',
        minWidth: 185,
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