import React , {useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,TouchableOpacity,TextInput,LogBox,Image,ActivityIndicator } from 'react-native'

import { firebaseConfig } from '../firebase'

import * as firebase from 'firebase';

import 'firebase/firestore';
import 'firebase/storage';

import { HeaderBackButton } from '@react-navigation/stack';


if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}
LogBox.ignoreLogs([`Setting a timer for a long period`]);

import * as ImagePicker from 'expo-image-picker';

const SignUp = ({navigation}) => {

    // const user = React.useContext(UserContext);

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




//---------------------


    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signUpSucces,setSignUpSucces] = useState(false);

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

            currentUser.updateProfile({
                displayName: firstName,
                photoURL: photoURL,
            }).then((result)=>{
                //console.log('nume user',result)
            })
            .catch((err)=>{
                    alert("nu mere update profile!!!!", err.message);
                    console.log('error mesege update profile',err);
                });
          //navigation.navigate('Log in')  
          setSignUpSucces(true);
        } catch (err) {
          alert("There is something wrong!!!!", err.message);
          console.log('mesaj',err)
        }
      }

      const handleRegistration = () =>{
          if(photoURL != ''){
            if(firstName != '' && email != '' && password!='' && confirmPassword != ''){
                if(password === confirmPassword){
                    registration(email,password,firstName);
                }   
                else {
                    alert('passwords do not match');
                }
              }
              else {
                  alert('Complete all fields');
              }
          }
          else {
              alert('chose or upload a photo mate!')
          }
          
      }

      //----------------------------------
            // partea cu image picker




    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const [uploading,setUploading] = useState(false);

    const [photoURL,setPhotoUrl] = useState('')
    const uploadImage = async () =>{
        
        // new try

        // const response = await fetch(image);
        // const blob = response.blob();

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              // console.log(e);
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
          });
       
        const task = firebase.storage().ref('profilePictures/').child(new Date().toISOString()).put(blob);

        const taskProgress = snapshot =>{
            //setUploading(true)
            console.log('merge')
        }

        const taskComplete = () =>{
            //setUploading(false)
            task.snapshot.ref.getDownloadURL().then(snapshot =>{
                setPhotoUrl(`${snapshot}`);
                console.log(snapshot);
                console.log('url:',photoURL);
            })
            
        }
        const taskError = snapshot =>{
            console.log(snapshot)
            // setUploading(false)
        }
        task.on("state_changed",taskProgress,taskError,taskComplete);
    }  

    const handleImageChoose = () =>{
      pickImage().then(()=>{
        uploadImage();
      })
    }
    return (
        <View style={styles.container}>
            <View style={{marginVertical:10,alignItems:'center'}}>
                <Text style={[styles.title,{marginBottom:30,fontSize:26,}]}>Creaza cont</Text>
                {
                    signUpSucces?
                    <Text style={{color:'#13d40d',fontSize:16,}}>Cont creat cu succes</Text>:
                    null
                }
                {
                    image?
                    <View style={{flexDirection:'column',alignItems:'center',marginTop:'20%'}}>
                        <Image style={{width:100,height:100,borderWidth:1,borderRadius:50,borderColor:'white',marginBottom:30,}} source={{uri:image}}/>
                        {/* <Text style={{color:'white'}}>{image}</Text> */}
                    </View>:
                    null
                }
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='adauga nume' onChangeText={(text)=>setFirstName(text)}/>
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='adauga email' onChangeText={(text)=>setEmail(text)}/>
                <TextInput  style={styles.Input} placeholderTextColor='gray' secureTextEntry={true} placeholder='adauga parola' onChangeText={(text)=>setPassword(text)}/>
                <TextInput  style={styles.Input} placeholderTextColor='gray' secureTextEntry={true} placeholder='confirmare parola' onChangeText={(text)=>setConfirmPassword(text)}/>
            </View>
            <Text style={[styles.title,{marginVertical:10}]}>Upload a profile pic:</Text>
            {/* <TouchableOpacity style={[styles.smallBox]} onPress={()=> pickImage()}>
                    <Text style={styles.text}>Chose image</Text>
            </TouchableOpacity>
            {
                !uploading?
                <TouchableOpacity style={[styles.smallBox]} onPress={()=> uploadImage()}>
                    <Text style={styles.text}>Set this image</Text>
                </TouchableOpacity>:
                <ActivityIndicator size="medium" color="white" />
            } */}
            <TouchableOpacity style={[styles.smallBox]} onPress={()=> handleImageChoose()}>
                    <Text style={styles.text}>Choose an profile image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[{alignItems:'center',},styles.Box]} onPress={()=> handleRegistration()}>
                    <Text style={styles.title}>Sign Up</Text>
                    {/* <AntDesign name="google" size={30} color="whites" /> */}
                </TouchableOpacity>

        </View>
    )
}

export default SignUp
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
        color: '#F2F2F2',
        fontSize: 14,
        fontWeight: '200',
    },
    Box:{
        paddingVertical:5,
        paddingHorizontal:19,
        borderColor: '#8C8C8C',
        borderWidth: 1,
        borderRadius: 25,
        margin:20,
      },
      smallBox:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderColor: '#8C8C8C',
        borderWidth: 1,
        borderRadius: 25,
        marginBottom:10,
      },
      Input:{
        color:'white',
        borderColor:'#8C8C8C',
        borderBottomWidth:1,
        width:200,
        padding:5,
      }

})