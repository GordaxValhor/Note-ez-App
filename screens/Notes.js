import React from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'

import MasonryList from '@appandflow/masonry-list';


const obiecte =[
    {nume: 'Ada 1',text: 'dsadadsasdadadd',height:100,},
    {nume: 'Ada 2',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
    {nume: 'Ada 13',text: 'dsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdaddsadadsasdad',height:100},
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


const Notes = ( {navigation} ) => {
    console.log(navigation)
    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage')}}>
                <Text style={styles.text}>Titlu notita</Text>
                <Text style={styles.text}>Continut notita Continut notita Continut notita Continut notita Continut notita Continut Continut notita Continut Continut notita Continut</Text>
            </TouchableOpacity> */}
            {/* <FlatList  
                data={obiecte}
                renderItem={( {item} ) =>(
                    <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage')}}>
                        <Text style={styles.text}>{item.nume}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item =>item.nume}
                numColumns={2}/> */}

            <MasonryList 
                data={obiecte}
                renderItem={( {item} ) =>(
                    <TouchableOpacity style={styles.noteStyle} onPress={()=>{navigation.navigate('NotePage',item)}}>
                        <Text style={styles.text}>{item.nume}</Text>
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>)}
                getHeightForItem={({ item }) => item.height + 2}
                numColumns={2}
                keyExtractor={item => item.nume}
            />
        </View>
    )
    }
export default Notes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //flexWrap: 'wrap',
        backgroundColor: '#1f1f1f',
        //alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        margin:  10,
        marginTop:80,
        //paddingBottom:80,
        width:'100%',
        paddingHorizontal: 10,
      },
      text: {
        color: 'white',
        fontSize: 16,
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