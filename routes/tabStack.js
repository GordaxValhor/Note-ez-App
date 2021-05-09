import React ,{useEffect,useState} from 'react'
import { Text, View,Dimensions, Image } from 'react-native';
import { NavigationContainer,useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Notes from '../screens/Notes';
import Tasks from '../screens/Tasks';
import Add from '../screens/Add';

const Tab = createBottomTabNavigator();
export const routeContex = React.createContext();


const tabStack = ({route}) =>{

    //facem un context hook ca sa putem trimite props de la route

    //console.log("route din tabstack",route);
    const [prevRoute,setPrevRoute] = useState();
    useEffect(() => {
        // if(route != undefined) {
        //     //console.log("useeffect route din tabstack:",route.params.nume)
        // console.log("useeffect routeFromNotePage din tabstack:",routeFromNotePage)
        // setrouteFromNotePage(route)
        // }
        // if(route!=undefined) {console.log('routa:',route.state.index);
        // setrouteFromNotePage(route.state.index)}
        //console.log('tabstack route:',route)
        if(route != undefined){
            setPrevRoute(route);
        }
      }, [route]);

    
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
                        backgroundColor: '#0a0a0a',
                        width: '63%',
                        left: (Dimensions.get('window').width / 2) - 129.55,
                    }
                }}
            >
                {/* <Tab.Screen name="Home" component={Home} /> */}
                {/*  defapt notes este home */}
                
                    <Tab.Screen name="Notes" component={Notes} options={{
                        tabBarIcon:({focused}) =>(
                            <View>
                                <Text style={{fontSize:16,color:focused ? 'gray': 'white'}}>Notes</Text>
                            </View>
                        )
                    }} 
                    
                    />
                <Tab.Screen name="Add"  options={{
                    tabBarIcon:({focused}) =>(
                        <View>
                            <Image 
                                style={{margin: 10,}}
                                source={require('../assets/drawable-mdpi/plus-sign.png')}
                            />
                        </View>
                    )
                }} 
                children={() => <Add  addWhat={prevRoute}/>}
                />
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
    