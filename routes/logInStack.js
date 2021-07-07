import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';

import LogIn from '../screens/LogIn'
import Account from '../screens/Account';
import SignUp from '../screens/SignUp';
import tabStackTeams from './tabStackTeams';
import NotePageTeams from '../screens/Team Screens/NotePageTeams';


const Stack = createStackNavigator();


const logInStack = () => {

  // const user = React.useContext(UserContext);
  // console.log(user)
    return (
        <Stack.Navigator initialRouteName='LogIn'>

                {/* punem aici inca un tab stack care face exact ce face celalalt numa pt teams */}
                <Stack.Screen name="Teams" options={{header: () => {null}}} component={tabStackTeams} />
                <Stack.Screen name="NotePageTeams" component={NotePageTeams}
                options={ ({navigation,route}) =>{ return { 
                    title: '',
                    headerStyle: {
                      backgroundColor: '#0a0a0a',
                    },
                    }
                }}/>

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
                <Stack.Screen name="SignUp" component={SignUp}
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

