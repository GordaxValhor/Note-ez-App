import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity } from 'react-native'

import UserContext from '../components/UserContext';


import { Feather } from '@expo/vector-icons';


import * as firebase from 'firebase';

import { HeaderBackButton } from '@react-navigation/stack';

import AddTeam from '../components/AddTeam';

const TeamsPage = ({navigation}) => {
    
    const user = React.useContext(UserContext);

 
    const [showAddTeamSec,setShowAddTeamSec] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <HeaderBackButton
                onPress={() => {
                   

                    // navigation.navigate("Notes");
                    navigation.goBack();
                }} tintColor={'#fff9'}
            />
            ),
        });
      }, []);

    useEffect(()=>{
        if(!user.user){
            navigation.navigate('LogIn')
        }
    },[])
    return (
        <View style={styles.container}>
            <Text style={[styles.big_title,{marginBottom:10,fontSize:26,}]}>Teams Page</Text>
            <TouchableOpacity style={{marginVertical:5,padding:5}}onPress={()=>setShowAddTeamSec(!showAddTeamSec)}>
                {
                    showAddTeamSec?
                    <Feather name="chevron-up" size={24} color="#BFBFBF" />
                    :
                    <Feather name="chevron-down" size={24} color="#BFBFBF" />
                }
            </TouchableOpacity>
            {
                showAddTeamSec?
                <AddTeam />:
                null
            }
            <Text style={styles.text}>-----------------------</Text>
            <Text style={styles.text}>Partea unde afisam echipele in care suntem deja cu flatlist</Text>
        </View>
    )
}

export default TeamsPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:7,
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        //justifyContent: 'center',
        color: 'white',
        width:'100%',
        height:'100%',
        //marginRight:-55,
        // paddingHorizontal: 10,
      },
      big_title:{
        color: '#F2F2F2',
        fontSize: 22,
      },
      text:{
          color:'#BFBFBF',
          fontSize:16,
      }
    
})
