import React,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,Button,} from 'react-native'
import { NavigationContainer,useRoute,useNavigation } from '@react-navigation/native';


import AddNote from '../components/AddNote';
import AddTask from '../components/AddTask'


const Add = ({addWhat}) => {
    //console.log('route din add screen', addWhat)
    // // const route = useRoute();
    // //const prevScreen = route.state.index;
    // console.log('route din useNavigation',route )

    const [ceScreen,setCeScreen] = useState();

    useEffect(() => {
        //console.log('route din add screen', addWhat)
        if(addWhat.state){
            let prevScreenAux = addWhat.state.history[addWhat.state.history.length-2].key;
            if(prevScreenAux.includes('Notes')){
                setCeScreen('notes')
            }
            else if(prevScreenAux.includes('Task')){
                setCeScreen('task')
            }
        }
    }, [addWhat])
    // const CheckPrevScreen = () =>{
    //     let prevScreenAux = addWhat.state.history[addWhat.state.history.length-2].key;
    //     if(prevScreenAux.includes('Notes')){
    //         return (
    //             <Text>Add screen pentru Notes</Text>
    //         ) 
    //     }
    //     else if(prevScreenAux.includes('Task')){
    //         return (
    //             <Text>Add screen pentru Tasks</Text>
    //         )
    //     }
    //     else {
    //         return( <Text>Nimic</Text>)
    //     }
    //     }
    return (
        <View style={styles.container}>
            <View>
                {ceScreen == 'notes' ? <AddNote /> : <AddTask />}
            </View>
        </View>
    )
}

export default Add
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
      },
      text: {
        color: 'white',
        fontSize: 16,
    }
  });