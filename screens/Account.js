import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity } from 'react-native'

import UserContext from '../components/UserContext';
import * as Google from 'expo-auth-session/providers/google';

import * as AuthSession from 'expo-auth-session';

import * as firebase from 'firebase';

import { HeaderBackButton } from '@react-navigation/stack';


import { Ionicons } from '@expo/vector-icons';






const Account = ({navigation}) => {


    const user = React.useContext(UserContext);
    //console.log(user)
    //console.log('din account',firebase.auth().currentUser);


    // useEffect(()=>{
    //     if(firebase.auth().currentUser){
    //         setUserState(firebase.auth().currentUser)
    //     }
    //     else {
    //         setUserState()
    //     }
    // },[userState,navigation])
    useEffect(()=>{
        if(user.user == undefined){
            navigation.navigate('LogIn')
        }
    },[user])

    //const [userState,setUserState] = useState()

    const logUserOut = () => {
        
        //AuthSession.revokeAsync();
        // AuthSession.refreshAsync(user.stsTokenManager.accessToken --- stsTokenManager);
        // Google.
        firebase.auth().signOut();
        user.setUser(undefined);
        navigation.navigate('Notes');
        // AuthSession.dismiss();
        //firebase.auth().unlink();
        //firebase.auth().revokeRefreshTokens();
        //Google.revocationEndpoint();
        //console.log('user dupa log out',firebase.auth().currentUser)
    }
    const showUserState = () =>{
        //console.log('user:',userState)
        console.log('user context', user)
    }
    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          //this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };

      React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <HeaderBackButton
                onPress={() => {
                   

                    navigation.navigate("Notes");
                }} tintColor={'#fff9'}
            />
            ),
        });
      }, []);
    
    return (
        <View style={styles.container}>
            <View style={{flex:1,flexDirection:'column',alignItems:'center',marginTop:'20%'}}>
                <Image style={{width:100,height:100,borderWidth:1,borderRadius:50,borderColor:'white',marginBottom:30,}} source={{uri:user.user.photoURL}}/>
                <Text style={styles.big_title}>{user.user.displayName}</Text>
                <View style={{marginTop:20,marginBottom:10,}}>
                    <Text style={styles.title}>E-mail: {user.user.email}</Text>
                </View>
                <View style={{borderWidth:1,borderRadius:50,borderColor:'gray',paddingHorizontal:10}}>
                    <TouchableOpacity onPress={() => {logUserOut();}}>
                        <Text style={styles.title}>Log out</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* <Button title='dute home' onPress={() => navigation.navigate('Notes')}/> */}
            {/* partea cu log out */}
            {/* <Button title='Log Out' onPress={() => {logUserOut(); }}/> */}
            {/* <Button title='Show user state' onPress={() => {showUserState()}}/> */}
            {/* <Text>Show user name {user != undefined ? user.user.displayName:null}</Text> */}
        </View>
    )
}

export default Account
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:7,
        backgroundColor: '#0a0a0a',
        //alignItems: 'center',
        justifyContent: 'center',
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
      title:{
        color: '#BFBFBF',
        fontSize: 18,
        marginBottom:3,
        fontWeight: '900',
      },
})