import React ,{useEffect} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView } from 'react-native'

import Header from '../components/header'

import MasonryList from '@appandflow/masonry-list';


const obiecte =[
    {nume: 'Ada 1',text: 'dsadadsasdadadd',height:100,},
    {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 13',text: 'ieri am mers sa vad cum se mai simte coco',height:100},
    {nume: 'Ada 14',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 15',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 16',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 17',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 18',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 19',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 143',text: 'dsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 152',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 161',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 172',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 183',text: 'dsadadsasdad',height:100},
    {nume: 'Ada 193',text: 'dsadadsasdad',height:100},
    
]

// updating function


const Notes = ( {navigation, dateNote} ) => {
    //console.log(navigation)
    //console.log("routa:" , route)

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




    
    return (
        <View style={styles.container}>

            <StatusBar
                barStyle="light-content"
                backgroundColor="#1f1f1f"
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
        paddingTop:5,
        //flexWrap: 'wrap',
        backgroundColor: '#1f1f1f',
        //alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
      title:{
        color: '#ffff',
        fontSize: 18,
        marginBottom:3,
      },
      text: {
        color: '#f7f7f7',
        fontSize: 14,
    },
    noteStyle: {
        flex: 1,
        //flexDirection:'row',
        minWidth: 165,
        maxWidth: 185,
        minHeight: 110,
        maxHeight: 500,
        borderWidth: 1,
        borderColor:'#fff9',
        backgroundColor: 'transparent',
        margin:5,
        padding: 9,
        borderRadius: 5,
    }
  });