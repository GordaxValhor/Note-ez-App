import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList } from 'react-native'

import UserContext from '../components/UserContext';


import { Feather } from '@expo/vector-icons';

import * as firebase from 'firebase';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

import { HeaderBackButton } from '@react-navigation/stack';

import AddTeam from '../components/AddTeam';
import TeamItem from '../components/TeamItem';

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

    const db = firebase.firestore();

    const ref = db.collection('users').doc(user.user.uid)
    const [teamsData,setTeamsData] = useState();
    useEffect(()=>{

        if(user.user){
            //const db = firebase.firestore();
            db.collection('users').doc(user.user.uid).get().then((snapshot)=>{
                console.log(snapshot.data().echipe);
                setTeamsData(snapshot.data().echipe);
            }).catch((err)=>console.log("err:  ",err));
        }
    },[user])

    const getTeamsData = () => {
        ref.onSnapshot((querySnapshot)=>{
            //console.log('querry snapshot data:',querySnapshot.data())
            setTeamsData(querySnapshot.data().echipe);

        });
    }
    useEffect(()=>{
        getTeamsData();
    },[]);
    return (
        <View style={styles.container}>
                
                <Text style={[styles.big_title,{marginBottom:10,fontSize:26,}]}>Teams Page</Text>
                <Text style={styles.text}>Create new team.</Text>
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
                {
                    teamsData?
                    <View>
                        <Text style={[styles.big_title,{marginBottom:15,textAlign:'center'}]}>Your teams</Text>
                        <FlatList 
                            data={teamsData}
                                renderItem={( {item} ) =>(
                                        <TeamItem teamId={item.id} navigation={navigation}/>
                                    )}
                        />
                    </View>:
                    <Text style={styles.text}>You don't have any team. Create one or ask to be added in one.</Text>
                }  
                
                
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
