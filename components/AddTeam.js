import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity,TextInput,FlatList } from 'react-native'




import UserContext from '../components/UserContext';

import { firebaseConfig } from '../firebase'

import * as firebase from 'firebase';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const AddTeam = () => {

    // sa punem in firebase new team

    // const db = firebase.firestore();
    // db.collection("users")
    //   .doc(currentUser.uid)
    //   .set({
    //     email: currentUser.email,
    //     firstName: firstName,
    //   });

    //   currentUser.updateProfile({
    //       displayName: firstName,
    //       photoURL: photoURL,
    //   }).then((result)=>{
    //       //console.log('nume user',result)
    //   })
    //   .catch((err)=>{
    //           alert("nu mere update profile!!!!", err.message);
    //           console.log('error mesege update profile',err);
    //       });

    const user = React.useContext(UserContext);


    const [teamName,setTeamName] = useState('');
    const [teamMembers,setTeamMembers] = useState([
        {
            nume: user.user.displayName,
            rol: 'creator',
            uid: user.user.uid,
        }
    ]);


    // adaugare echipa noua

    const addTeamToMembers = () =>{
        teamMembers.forEach(item =>{
            var echipeC = {
                nume: teamName,
                id: id_echipa
            }
            db.collection("users")
            .doc(item.uid).update({echipe: firebase.firestore.FieldValue.arrayUnion(echipeC)}).then(()=>{console.log('a  mers si aduagarea in user din membri')})
            .catch((err)=>(console.log(err)));
        })
    }

    const addTeam = async () =>{
        //- cream date echipa si apoi le punem in db

        // id_echipa = id_creator + nume echipa

        if(teamName != ''){
             //----------punere in db--------------

            const db = firebase.firestore();
            var random_nr_id = Math.floor(Math.random() * 500);
            var id_echipa = user.user.uid.toString() + ' - ' + teamName + ' - ' + random_nr_id.toString();
            //console.log('id_echipa', id_echipa)

            var newItem = {
                idEchipa: id_echipa,
                numeEchipa: teamName,
                membri: teamMembers,
                idCreator: user.user.uid.toString(),
                numeCreator: user.user.displayName,
                pictureEchipaUrl: '',
            }
            //console.log('date ce le pune', newItem)

            db.collection("echipe").doc(id_echipa).collection('date_echipa').doc('data').set(newItem)
            .then(()=>{console.log('a  mers')})
            .catch((err)=>(console.log(err)));


            // adaugam si la user
            var echipeC = {
                nume: teamName,
                id: id_echipa
            }

            db.collection("users")
            .doc(user.user.uid).update({echipe: firebase.firestore.FieldValue.arrayUnion(echipeC)}).then(()=>{console.log('a  mers si aduagarea in user')})
            .catch((err)=>(console.log(err)));

            // tre sa adaug echipa asta si la field team de la ceilalti members
            addTeamToMembers();
        }
    }


    //--- pentru adaugare membri noi


    const [searchedUsers,setSearchedUsers] = useState();

    const fetchUser = (search) =>{
        firebase.firestore().collection('users').where('firstName','>=',search)
        .get().then((snapshot)=>{
            let users = snapshot.docs.map(doc =>{
                const data = doc.data();
                const id = doc.id;
                return {id, ...data}
            });
            setSearchedUsers(users);
        })
        console.log('ce useri:',searchedUsers)
    }

    const addMember = (nume,id) =>{
        let newMem = {
            nume: nume,
            rol: 'membru',
            uid: id,

        }
        let aux = teamMembers;
        let newaux = [...aux , newMem];
        console.log('new team mem list: ', newaux)
        setTeamMembers(newaux);
    }
    const removeMember = (id) =>{
            let arrAux = [...teamMembers];
            console.log('id:',id)
            arrAux = arrAux.filter(item => item.uid != id)
            setTeamMembers(arrAux);
    }
    return (
        <View>
            <View>
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='Adauga nume echipa' onChangeText={(text)=>setTeamName(text)}/>
            </View>
            <View style={{marginTop:10,alignItems:'center'}}> 

                {/* <Text style={styles.text}>Adaugare membri echipa</Text> */}
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='Adauga nume user' onChangeText={(text)=>{fetchUser(text)}}/>
                <View style={{minHeight:50, height:'34%',marginTop: 10,backgroundColor:'#1a1a1a',width:'100%'}}>
                    {
                        searchedUsers?
                        <FlatList data={searchedUsers} renderItem={({item})=>(
                                                <TouchableOpacity onPress={() => {addMember(item.firstName,item.id)}}>
                                                    <Text style={styles.text}>{item.firstName}</Text>
                                                </TouchableOpacity>
                        )}/>:
                        null
                    }
                    
                </View>
                {/* <TouchableOpacity style={styles.Box}>
                    <Text style={[styles.text,{textAlign:'center'}]}>Add member</Text>
                </TouchableOpacity> */}
                <View style={{minHeight:50, height:'22%',marginTop: 10,width:'100%'}}>
                    <Text style={styles.text}>Membri echipa</Text>
                    <FlatList data={teamMembers} renderItem={({item})=>(
                                                <TouchableOpacity onPress={() => {removeMember(item.id)}}>
                                                    <Text style={styles.text}>{item.nume}</Text>
                                                </TouchableOpacity>
                        )}/>
                </View>
            </View>
            <View>
                <Text style={styles.text}>Add picture for team</Text>
            </View>
            <TouchableOpacity style={styles.Box} onPress={()=> addTeam()}>
                <Text style={styles.text}>Test</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddTeam
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
      },
      Input:{
        color:'white',
        borderColor:'#8C8C8C',
        borderBottomWidth:1,
        width:200,
        padding:5,
      },
      Box:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderColor: '#8C8C8C',
        borderWidth: 1,
        borderRadius: 25,
        margin:20,
        width: 120,
      },
    
})