import * as React from 'react';
import { Text, View,Dimensions, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notes from '../screens/Notes';
import Tasks from '../screens/Tasks';
import Add from '../screens/Add';

const Tab = createBottomTabNavigator();
const tabStack = () =>{
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style:{
                    position:'absolute',
                    bottom: 25,
                    borderTopWidth:1,
                    borderWidth:1,
                    borderColor: 'white',
                    borderRadius: 10,
                    backgroundColor: '#1f1f1f',
                    width: '63%',
                    left: (Dimensions.get('window').width / 2) - 129.55,
                }
            }}
        >
            {/* <Tab.Screen name="Home" component={Home} /> */}
            {/*  defapt notes este home */}
            <Tab.Screen name="Notes" component={Home} options={{
                tabBarIcon:({focused}) =>(
                    <View>
                        <Text style={{fontSize:16,color:focused ? 'gray': 'white'}}>Notes</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Add" component={Add} options={{
                tabBarIcon:({focused}) =>(
                    <View>
                        <Image 
                            style={{height:40,width:40,margin: 10,}}
                            source={require('../assets/drawable-mdpi/plus-sign.png')}
                        />
                    </View>
                )
            }}/>
            <Tab.Screen name="Tasks" component={Tasks} options={{
                tabBarIcon:({focused}) =>(
                    <View>
                        <Text style={{fontSize:16,color:focused ? 'gray': 'white'}}>Tasks</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}
export default tabStack
    