import React , {useState,useEffect} from 'react'
import { View, Text,Button,TouchableOpacity,Image } from 'react-native'

import Home from '../screens/Home';
import Notes from '../screens/Notes';
import NotePage from '../screens/NotePage';

// petru navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import tabStack from './tabStack';
import homeStack from './homeStack';
import logInStack from './logInStack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import DrawerMenu from '../components/DrawerMenu'


import { useNavigation } from '@react-navigation/native';

import * as firebase from 'firebase';
import { firebaseConfig } from '../firebase'
import { set } from 'react-native-reanimated';


//pt context

import UserContext from '../components/UserContext';



if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

// const user = firebase.auth().currentUser;
// console.log('user din drawer stac: ',user);



const drawerStack = () => {

    //context pt user
    

    //const UserContext = React.createContext(null)

    const Drawer = createDrawerNavigator();

    const [user,setUser] = useState();

    const userC = {user:user,setUser}
    // useEffect(()=>{
    //     if(firebase.auth().currentUser){
    //         setUser(firebase.auth().currentUser)
    //         console.log('user din effect care merge la context:',user)
    //     }
    // },[firebase.auth().onAuthStateChanged,firebase.auth().currentUser])

    return (
        <UserContext.Provider value={userC}>
            <NavigationContainer >
                <Drawer.Navigator initialRouteName="Home" drawerContent={({navigation}) =><DrawerMenu navigation={navigation}/>}>
                        <Drawer.Screen name="Home" component={homeStack} />
                        <Drawer.Screen name="LogIn" component={logInStack} />
                </Drawer.Navigator>
            </NavigationContainer>
        </UserContext.Provider>
    )
}

export default drawerStack
