import React , {useState} from 'react'
import { View, Text,Button,TouchableOpacity,Image } from 'react-native'

import Home from '../screens/Home';
import Notes from '../screens/Notes';
import NotePage from '../screens/NotePage';
import TaskPage from '../screens/TaskPage';
import FiltredNotes from '../screens/FiltredNotes';

// petru navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import tabStack from './tabStack';
import { createDrawerNavigator } from '@react-navigation/drawer';



import Database from 'expo-sqlite-hooks/database';
import { DBProvider } from 'expo-sqlite-hooks/context/database';
import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';


const Stack = createStackNavigator();

const homeStack = () => {


    // sa facem aici modificarea in db

    //------
    // update in baza de date
    
    // const updateNote = useUpdate("Notes");
    
    
    
    //pentru drawer navigation

    

    return (
        
            <Stack.Navigator>
                <Stack.Screen name="Notes" options={{header: () => {null}}} component={tabStack} />
                {/* <Stack.Screen name="" component={Notes}/> */}
                <Stack.Screen name="NotePage" component={NotePage}
                options={ ({navigation,route}) =>{ return { 
                    title: '',
                    headerStyle: {
                      backgroundColor: '#0a0a0a',
                    },
                    }
                }
                   
                }
                />
                {/* <Stack.Screen name="FiltredNotes" options={{header: () => {null}}} component={FiltredNotes} /> */}
                <Stack.Screen name="TaskPage" component={TaskPage}
                options={ ({navigation,route}) =>{ return { 
                    title: '',
                    headerStyle: {
                      backgroundColor: '#0a0a0a',
                    },
                    }
                }}/>
            </Stack.Navigator>
        
    )
}

export default homeStack
// headerRight: ({route}) => (
//     // <Button
//     //   onPress={() => alert('This is a button!')}
//     //   title="Info"
//     // />
//     <TouchableOpacity style={{marginRight:2,paddingHorizontal:20,paddingVertical:5,marginBottom:-8,}} onPress={() => alert(route)}>
//         <Image style={{resizeMode: "contain",height:18,}}
//         source={require('../assets/drawable-xxxhdpi/group88.png')}/>
//     </TouchableOpacity>


// handleDelete(route.params.newParams.idNote




///

{/* <View style={{position: 'absolute',top:35,right:20,borderWidth:1,borderColor:'white',padding:5,borderRadius: 5,backgroundColor:'#0a0a0a',zIndex:1}}>
                                    <TouchableOpacity onPress={() =>{console.log('da')}}>
                                        <Text style={{color:'white',paddingTop:8}}>Del</Text>
                                        
                                    </TouchableOpacity>
                                    <Text style={{color:'white',paddingTop:8}}>Share</Text>
                                    <Text style={{color:'white',paddingTop:8,paddingBottom:8}}>Copy</Text>
                                    <Button title='press'/>                         
                                </View>
                                ) */}