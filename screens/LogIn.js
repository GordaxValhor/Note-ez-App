import React , {useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,TouchableOpacity } from 'react-native'

import { firebaseConfig } from '../firebase'

import * as firebase from 'firebase';

import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

import { AntDesign } from '@expo/vector-icons';

import UserContext from '../components/UserContext';



import 'firebase/firestore';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
console.log('din log in firebase user:',firebase.auth().currentUser)
console.log('google',Google)

WebBrowser.maybeCompleteAuthSession();

const LogIn = ({navigation}) => {


    const user = React.useContext(UserContext);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '531250915862-h0dh6264mgg5vu5jgut144d6f275km0f.apps.googleusercontent.com',
          },
      );
    

      const [trigger,setTrigger] =useState(false)

        //redirection pentru cand deja avem user

        useEffect(()=>{
            // if(firebase.auth().currentUser){
            //     navigation.navigate('Account');
            // }
            if(user.user != undefined){
                navigation.navigate('Account');
            }
            console.log('log in user:',user);
            console.log('auth object',firebase.auth())
            if(firebase.auth()){
                user.setUser(firebase.auth().currentUser)
            }

        },[user])


      useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          


            // partea asta e inca in lucru vedem ce mai resuim 7/1/2021

            // var provider = new firebase.auth.OAuthProvider('google.com');
            // provider.setCustomParameters({
            //     prompt: 'select_account'
            // });
            // var credential = provider.credential(id_token);
            // console.log('provider',provider)
            // console.log('credetial',credential)
            // firebase.auth().signInWithCredential(credential).then((result)=>{
            //             console.log(result)
            //       }).catch((error)=>{
            //           console.log(error)
            // });

            const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
          firebase.auth().signInWithCredential(credential).then((result) =>{
                console.log('user name si uid',firebase.auth().currentUser.displayName,firebase.auth().currentUser.uid)
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                    user_name: firebase.auth().currentUser.displayName,
                    user_id: firebase.auth().currentUser.uid,
                })
                user.setUser(firebase.auth().currentUser)
          }).catch((error) => {
            console.log(error)
          });;
          //console.log(user)
          navigation.navigate('Account');
        }
        
      }, [response,trigger]);
    
    const getUser = () =>{
        const user = firebase.auth().currentUser;
        console.log('user: ',user);
        console.log('user name: ',user.displayName);
        setUserName(user.displayName)
    }
    const logUserOut = () =>{
        firebase.auth().signOut();
        console.log('user dupa log out',firebase.auth().currentUser)
    }
    const [userName,setUserName] = useState('')


    return (
        <View style={styles.container}>
            {/* <Text>Log in screen</Text>
            <Button
                disabled={!request}
                title="Login"
                onPress={() => {
                    promptAsync();
                    }}
            />
            <Button
                title="Get user data"
                onPress={() => {getUser();}}
            />
            <Text>Nume user {userName}</Text> */}
            <Button
                title="go Gome"
                onPress={() => {navigation.navigate('Notes');}}
            />
            <View>
                <Text style={styles.title}>You are not logged in/You dont have an account</Text>
            </View>
            <View style={styles.SignInBox}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {promptAsync();setTrigger(!trigger)}} disabled={!request}>
                    <Text>Sign in with Google</Text>
                    {/* <AntDesign name="google" size={30} color="whites" /> */}
                </TouchableOpacity>
            </View>
        </View>
        
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //paddingTop:7,
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
      title:{
        color: '#F2F2F2',
        fontSize: 18,
        marginBottom:10,
        fontWeight: '900',
      },
      whiteTitle:{
        color: 'white',
        fontSize: 18,
        marginBottom:3,
        fontWeight: '900',
      },
      text: {
        color: 'gray',
        fontSize: 14,
        fontWeight: '200',
    },
    SignInBox:{
        // height: 50,
        width: '80%',
        backgroundColor: '#4285F4',
        padding:10,
        borderRadius: 10,
        alignItems:'center',
    }

})

export default LogIn
