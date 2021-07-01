import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';

import LogIn from '../screens/LogIn'
import Account from '../screens/Account';

const Stack = createStackNavigator();


const logInStack = () => {

  // const user = React.useContext(UserContext);
  // console.log(user)
    return (
        <Stack.Navigator>
                <Stack.Screen name="LogIn" component={LogIn}
                options={ ({navigation,route}) =>{ return { 
                    title: '',
                    headerStyle: {
                      backgroundColor: '#0a0a0a',
                    },
                    }
                }
                   
                }
                />
                <Stack.Screen name="Account" component={Account}
                options={ ({navigation,route}) =>{ return { 
                    title: '',
                    headerStyle: {
                      backgroundColor: '#0a0a0a',
                    },
                    }
                }
                   
                }
                />
        </Stack.Navigator>
    )
}

export default logInStack

