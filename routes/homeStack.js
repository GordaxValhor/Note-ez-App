import React from 'react'
import { View, Text } from 'react-native'

import Home from '../screens/Home';
import Notes from '../screens/Notes';

// petru navigation

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tabStack from './tabStack';



const Stack = createStackNavigator();

const homeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{header: () => {null}}} component={tabStack}/>
                <Stack.Screen name="Notes" component={Notes}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default homeStack
