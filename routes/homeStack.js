import React from 'react'
import { View, Text } from 'react-native'

import Home from '../screens/Home';
import Notes from '../screens/Notes';
import NotePage from '../screens/NotePage';

// petru navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import tabStack from './tabStack';



const Stack = createStackNavigator();

const homeStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Notes" options={{header: () => {null}}} component={tabStack} />
                {/* <Stack.Screen name="" component={Notes}/> */}
                <Stack.Screen name="NotePage" component={NotePage}
                // options={ ({navigation,route}) =>{ return { headerLeft: () => (
                //     <HeaderBackButton
                //         onPress={() => {
                //             routeParamName = route.params.nume;
                //             console.log("route din homestack",route.params.nume);
                //             // navigation.navigate({name:"Home",params: {post:routeParamName,merge:true,}});
                //             navigation.navigate("Home",route);
                //         }}
                //     />
                //     ),}}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default homeStack
