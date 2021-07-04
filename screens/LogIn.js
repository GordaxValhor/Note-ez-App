import React , {useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,TouchableOpacity,TextInput } from 'react-native'

import { firebaseConfig } from '../firebase'

import * as firebase from 'firebase';

// import * as WebBrowser from 'expo-web-browser';
// import { ResponseType } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';

import * as Google from 'expo-google-app-auth';

import { AntDesign } from '@expo/vector-icons';

import UserContext from '../components/UserContext';
import { HeaderBackButton } from '@react-navigation/stack';




import 'firebase/firestore';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
// console.log('din log in firebase user:',firebase.auth().currentUser)
// console.log('google',Google)

// WebBrowser.maybeCompleteAuthSession();

const LogIn = ({navigation}) => {


    const user = React.useContext(UserContext);

    // const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    //     {
    //         expoClientId: '230123782086-970i6rp3ejh654mrkbedl3ndddtlmk4t.apps.googleusercontent.com',
    //         androidClientId: '230123782086-9tiantgn038hbdmanq8cogilvm4fo5rm.apps.googleusercontent.com'
    //       },
    //   );
    

    //   const [trigger,setTrigger] =useState(false)

    //     //redirection pentru cand deja avem user

    //     useEffect(()=>{
    //         // if(firebase.auth().currentUser){
    //         //     navigation.navigate('Account');
    //         // }
    //         if(user.user != undefined){
    //             navigation.navigate('Account');
    //         }
    //         console.log('log in user:',user);
    //         console.log('auth object',firebase.auth())
    //         if(firebase.auth()){
    //             user.setUser(firebase.auth().currentUser)
    //         }

    //     },[])


    //   useEffect(() => {
    //     if (response?.type === 'success') {
    //       const { id_token } = response.params;
          


    //         // partea asta e inca in lucru vedem ce mai resuim 7/1/2021

    //         // var provider = new firebase.auth.OAuthProvider('google.com');
    //         // provider.setCustomParameters({
    //         //     prompt: 'select_account'
    //         // });
    //         // var credential = provider.credential(id_token);
    //         // console.log('provider',provider)
    //         // console.log('credetial',credential)
    //         // firebase.auth().signInWithCredential(credential).then((result)=>{
    //         //             console.log(result)
    //         //       }).catch((error)=>{
    //         //           console.log(error)
    //         // });

    //         const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
    //       firebase.auth().signInWithCredential(credential).then((result) =>{
    //             console.log('user name si uid',firebase.auth().currentUser.displayName,firebase.auth().currentUser.uid);
    //             firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
    //                 user_name: firebase.auth().currentUser.displayName,
    //                 user_id: firebase.auth().currentUser.uid,
    //             })
    //             user.setUser(firebase.auth().currentUser)
    //       }).catch((error) => {
    //         console.log(error)
    //       });;
    //       //console.log(user)
    //       navigation.navigate('Account');
    //     }
        
    //   }, [response,trigger]);
    
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
    // const [userName,setUserName] = useState('')


    // ------------------------- new option 

    // signInWithGoogleAsync = async () => {
    //     try {
    //       const result = await Google.logInAsync({
    //         //behavior: 'web',
    //         //expoClientId: '230123782086-970i6rp3ejh654mrkbedl3ndddtlmk4t.apps.googleusercontent.com',
    //         //androidClientId: '230123782086-9tiantgn038hbdmanq8cogilvm4fo5rm.apps.googleusercontent.com', ala bun
    //         androidClientId: '230123782086-970i6rp3ejh654mrkbedl3ndddtlmk4t.apps.googleusercontent.com',
    //         //iosClientId: YOUR_CLIENT_ID_HERE,
    //         scopes: ['profile', 'email'],
    //       });
      
    //       if (result.type === 'success') {
    //         onSignIn(result)
    //         return result.accessToken;
    //       } else {
    //         return { cancelled: true };
    //       }
    //     } catch (e) {
    //       return { error: true };
    //     }
    //   }

    //   isUserEqual = (googleUser, firebaseUser) => {
    //     if (firebaseUser) {
    //       var providerData = firebaseUser.providerData;
    //       for (var i = 0; i < providerData.length; i++) {
    //         if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
    //             providerData[i].uid === googleUser.getBasicProfile().getId()) {
    //           // We don't need to reauth the Firebase connection.
    //           return true;
    //         }
    //       }
    //     }
    //     return false;
    //   }

    //    onSignIn = (googleUser) => {
    //     console.log('Google Auth Response', googleUser);
    //     // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    //     var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    //       unsubscribe();
    //       // Check if we are already signed-in Firebase with the correct user.
    //       if (!isUserEqual(googleUser, firebaseUser)) {
    //         // Build Firebase credential with the Google ID token.
    //         var credential = firebase.auth.GoogleAuthProvider.credential(
    //             googleUser.idToken,
    //             googleUser.accessToken,
                
    //             );
      
    //         // Sign in with credential from the Google user.
    //         firebase.auth().signInWithCredential(credential).then(()=>{console.log('user sign in succes')}).catch((error) => {
    //           // Handle Errors here.
    //           var errorCode = error.code;
    //           var errorMessage = error.message;
    //           // The email of the user's account used.
    //           var email = error.email;
    //           // The firebase.auth.AuthCredential type that was used.
    //           var credential = error.credential;
    //           // ...
    //         });
    //       } else {
    //         console.log('User already signed-in Firebase.');
    //       }
    //     });
    //   }

      //------------------------------------



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


      //------------------------ incercare cu email and password





      // const [userEmail,setUserEmail] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');

      const registration =  async (email, password, firstName) => {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
          const currentUser = firebase.auth().currentUser;
      
          const db = firebase.firestore();
          db.collection("users")
            .doc(currentUser.uid)
            .set({
              email: currentUser.email, 
              firstName: firstName,
            });
        } catch (err) {
          Alert.alert("There is something wrong!!!!", err.message);
        }
      }

      const signIn = async (email, password) =>{
        try {
         await firebase
            .auth()
            .signInWithEmailAndPassword(email, password).then((result)=>{
              console.log('rezultat sing in',result)
            });
        } catch (err) {
          alert("There is something wrong!", err.message);
          console.log(err);
        }

        //setam user-ul
        user.setUser(firebase.auth().currentUser);
        console.log('user din log in:',user);
        setEmail('');
        setPassword("");
        navigation.navigate('Account');
      }





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
            {/* <View style={{marginTop:'10%',width:'80%'}}>
                <Text style={styles.title}>You are not logged in/You dont have an account</Text>
            </View> */}
            <View style={{marginVertical:20,alignItems:'center'}}>
                <Text style={[styles.title,{marginBottom:50,fontSize:26,}]}>Log in</Text>
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='adauga email' onChangeText={(text)=>setEmail(text)}/>
                <TextInput  style={styles.Input} placeholderTextColor='gray' secureTextEntry={true} placeholder='adauga parola' onChangeText={(text)=>setPassword(text)}/>
            </View>
            {/* <View style={[styles.SignInBox,{marginTop:20,}]}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> {promptAsync();setTrigger(!trigger)}} disabled={!request}>
                    <Text>Sign in with Google</Text>
                    <AntDesign name="google" size={30} color="whites" />
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity style={[{alignItems:'center',},styles.Box]} onPress={()=> signIn(email,password)}>
                    <Text style={styles.title}>Log In</Text>
                    {/* <AntDesign name="google" size={30} color="whites" /> */}
                </TouchableOpacity>
            <Text style={[styles.text,{marginBottom:5,}]}>Don't have an account sign up</Text>
            <TouchableOpacity style={{alignItems:'center',}} onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.title}>Sign Up</Text>
                </TouchableOpacity>
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
        //justifyContent: 'center',
        color: 'white',
        width:'100%',
        height:'100%',
        paddingHorizontal: 10,
      },
      title:{
        color: '#F2F2F2',
        fontSize: 18,
        //marginBottom:10,
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
        fontSize: 16,
        fontWeight: '200',
    },
    SignInBox:{
        // height: 50,
        width: '80%',
        backgroundColor: '#4285F4',
        padding:10,
        borderRadius: 10,
        alignItems:'center',
    },
    Box:{
      paddingVertical:5,
      paddingHorizontal:19,
      borderColor: '#8C8C8C',
      borderWidth: 1,
      borderRadius: 25,
      margin:20,
    },
    Input:{
      color:'white',
      borderColor:'#8C8C8C',
      borderBottomWidth:1,
      width:200,
      padding:5,
    }

})

export default LogIn
