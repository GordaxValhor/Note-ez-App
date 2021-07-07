import React,{useState,useEffect} from 'react'
import { View, Text,Button,StyleSheet,Image,TouchableOpacity,ScrollView,FlatList } from 'react-native'

import * as firebase from 'firebase';
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

import UserContext from '../components/UserContext';

const TeamItem = ({teamId , navigation}) => {
    const user = React.useContext(UserContext);



    const [teamData,setTeamData] = useState();

    const getTeamData = () => {
        const db = firebase.firestore();
        console.log('team id:',teamId);
        const ref = db.collection('echipe').doc(teamId).collection('date_echipa').doc('data');

        ref.onSnapshot((querySnapshot)=>{
            console.log('querry snapshot data:',querySnapshot.data())
            setTeamData(querySnapshot.data());

        });
        }

    useEffect(()=>{
            if(user){
                getTeamData();
            }
        },[user]);


    //edit team.


    return (
        <View> 
            {
                teamData?
                
                <View style={[styles.teamBox,{flexDirection:'column'}]}>
                    <TouchableOpacity onPress={()=>{navigation.navigate('TeamPage',teamId)}}>
                        <Text style={[styles.big_title,{marginBottom:5,textAlign:'center'}]}>{teamData.numeEchipa}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text,{marginBottom:5}]}>Creator: {teamData.numeCreator}</Text>
                    <Text style={styles.text}>Membri</Text>
                    {
                        teamData.membri.map((obj , index) =>
                            (
                            <Text style={[styles.text,{marginLeft:10,}]}>{index + 1 }. {obj.nume}</Text>
                            )
                        )
                    }
                    
                    <View style={{flexDirection:'row',maxwidth:'80%',justifyContent:'space-around',marginVertical:15,}}>
                        <TouchableOpacity style={styles.smallBox} onPress={()=>{navigation.navigate('Teams', {screen: 'Notes',params: { teamId: teamId }})}}>
                            <Text style={styles.text}>Team Notes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.smallBox} onPress={()=>{navigation.navigate('Teams', {screen: 'Tasks',})}}>
                            <Text style={styles.text}>Team Tasks</Text>
                        </TouchableOpacity>
                    </View>

                </View>:
                null
            }
            
        </View>
    )
}

export default TeamItem
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
      smallBox:{
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
      }
})