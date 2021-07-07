import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList,TextInput } from 'react-native'


import * as firebase from 'firebase';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

import { HeaderBackButton } from '@react-navigation/stack';


import { Feather } from '@expo/vector-icons';


const TeamPage = ({navigation , route}) => {


    const teamId = route.params;
    console.log('route',route)
    console.log('team id din team page:',teamId);

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


      const [teamData,setTeamData] = useState();

      const getTeamData = () => {
        const db = firebase.firestore();
        //console.log('team id:',teamId);
        const ref = db.collection('echipe').doc(teamId).collection('date_echipa').doc('data');

        ref.onSnapshot((querySnapshot)=>{
            console.log('querry snapshot data:',querySnapshot.data())
            setTeamData(querySnapshot.data());

        });
        }

    useEffect(()=>{
            
          getTeamData();
            
        },[]);



    // editare membri

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
      const db = firebase.firestore();
      db.collection("echipe").doc(teamId).collection('date_echipa').doc('data')
      .update({membri : firebase.firestore.FieldValue.arrayUnion(newMem)}).then(()=>{console.log('a  mers si aduagarea de nou user')})
      .catch((err)=>(console.log(err)));

      // add echipa si in date membru
      var echipeC = {
        nume: teamData.numeEchipa,
        id: teamId,
      }
      db.collection("users")
      .doc(id).update({echipe: firebase.firestore.FieldValue.arrayUnion(echipeC)}).then(()=>{console.log('a  mers si aduagarea echia la user')})
      .catch((err)=>(console.log(err)));
  }
  const removeMember = (nume,id,rol) =>{
      let newMem = {
        nume: nume,
        rol: rol,
        uid: id,
      }
      const db = firebase.firestore();
      db.collection("echipe").doc(teamId).collection('date_echipa').doc('data')
      .update({membri: firebase.firestore.FieldValue.arrayRemove(newMem)}).then(()=>{console.log('a  mers si remove de user')})
      .catch((err)=>(console.log(err)));

      // remove echipa din date membru

      var echipeC = {
        nume: teamData.numeEchipa,
        id: teamId,
      }
      db.collection("users")
      .doc(id).update({echipe: firebase.firestore.FieldValue.arrayRemove(echipeC)}).then(()=>{console.log('a  mers si remove echipa la user')})
      .catch((err)=>(console.log(err)));
  }



  // db.collection("echipe").doc(teamId).collection('date_echipa').doc('data')
  // .update({membri : firebase.firestore.FieldValue.arrayUnion(newMem)}).then(()=>{console.log('a  mers si aduagarea de nou user')})
  // .catch((err)=>(console.log(err)));
    // db.collection("users")
    // .doc(user.user.uid).update({echipe: firebase.firestore.FieldValue.arrayUnion(echipeC)}).then(()=>{console.log('a  mers si aduagarea in user')})
    // .catch((err)=>(console.log(err)));

  //   docRef.update({
  //     array: FieldValue.arrayRemove('idToRemove');
  //  });
        //modificare si a membrilor
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Team page aici poti editat totul la echipa</Text>
            {
              teamData?
              <View style={[{flexDirection:'column'},{width:'90%'}]}>
                    <Text style={[styles.big_title,{marginBottom:5,textAlign:'center'}]}>{teamData.numeEchipa}</Text>
                    <Text style={[styles.text,{marginBottom:5}]}>Creator: {teamData.numeCreator}</Text>
                    <Text style={[styles.text,{marginBottom:5}]}>Add new members</Text>
                <TextInput style={styles.Input} placeholderTextColor='gray' placeholder='Adauga nume user' onChangeText={(text)=>{fetchUser(text)}}/>

                    <View style={{minHeight:50, height:'30%',marginTop: 10,backgroundColor:'#1a1a1a',width:'100%',marginBottom:15,}}>
                    {
                        searchedUsers?
                        <FlatList data={searchedUsers} renderItem={({item})=>(
                                                <TouchableOpacity onPress={() => {addMember(item.firstName,item.id)}}>
                                                    <Text style={[styles.text,{marginBottom:7,}]}>{item.firstName}</Text>
                                                </TouchableOpacity>
                        )}/>:
                        null
                    }
                    
                  </View>
                    <Text style={styles.text}>Membri</Text>
                    {
                        teamData.membri.map((obj , index) =>
                            (
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                              <Text style={[styles.text,{marginLeft:10,marginBottom:10,}]}>{index + 1 }. {obj.nume}</Text>
                              <TouchableOpacity onPress={()=>{removeMember(obj.nume,obj.uid,obj.rol)}}>
                                  <Feather name="x" size={20} color="gray" />
                              </TouchableOpacity>
                            </View>
                            )
                        )
                    }
            </View>:
            null
            }
            
        </View>
    )
}

export default TeamPage

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
      teamBox:{
        minHeight: 200,
        minHeight: 200,
        maxHeight: 600,
        minWidth: '70%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 7,

      },
      Input:{
        color:'white',
        borderColor:'#8C8C8C',
        borderBottomWidth:1,
        width:'99%',
        padding:5,
      },
})
