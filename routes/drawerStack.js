import React , {useState} from 'react'
import { View, Text,Button,TouchableOpacity,Image } from 'react-native'

import Home from '../screens/Home';
import Notes from '../screens/Notes';
import NotePage from '../screens/NotePage';

// petru navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import tabStack from './tabStack';
import homeStack from './homeStack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import DrawerMenu from '../components/DrawerMenu'

import { useNavigation } from '@react-navigation/native';

const drawerStack = () => {



    const Drawer = createDrawerNavigator();

    

    return (
        <NavigationContainer >
            <Drawer.Navigator initialRouteName="Home" drawerContent={({navigation}) =><DrawerMenu navigation={navigation}/>}>
                <Drawer.Screen name="Home" component={homeStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default drawerStack
