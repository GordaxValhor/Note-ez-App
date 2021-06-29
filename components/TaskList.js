import React ,{useEffect,useState} from 'react'
import { View, Text,StyleSheet,TouchableOpacity,FlatList,Button,StatusBar,ScrollView,LogBox } from 'react-native'
import { NavigationContainer,useRoute,useNavigation } from '@react-navigation/native';

import { useQuery, useInsert, useUpdate, useDelete } from 'expo-sqlite-hooks/hooks/database';



import { MaterialCommunityIcons } from '@expo/vector-icons';


const TaskList = ({navigation,route}) => {


    const {loading, error, data, refresh} = useQuery("select * from Tasks Order by Id desc", []);

    const [taskList,setTasksList] = useState([]);
    const [realTaskList,setRealTaskList] = useState([])

    const insertTask = useInsert("Tasks");

   

    useEffect(() => {
        if(data)
        {
            //console.log('rows? :',data.rows.length)
            const listAux = [];
            for(let i = 0; i < data.rows.length; i++)
            {
                listAux.push(data.rows.item(i));
            }
            setTasksList(listAux);
        }
        //refresh();
    }, [data]);

    useEffect(() => {
        refresh();
        if(taskList != undefined)
        {           
            fct();
        }
        
    }, [taskList]);

    // useEffect(() => {
    //     refresh();
    // }, [navigation,route]);


    const fct = () =>{
        let auxList = [];
        taskList.forEach(item => {
            let newItem = {
                Id: item.Id,
                Nume: item.Nume,
                SubTask: JSON.parse(item.SubTask),
            }
            auxList = [...auxList,newItem];
        })
        //setTasksList(auxList);
        setRealTaskList(auxList);
        //console.log(realTaskList);
    }

    return (
        <View style={styles.container}>
            {/* <Button title="unstring" onPress={() => {fct();refresh();}}/> */}
            <ScrollView >
                <View style={{height:50}}></View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <FlatList 
                        data={realTaskList.filter((_,i)=>i% 2 == 0)}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>{navigation.navigate('TaskPage',item)}}>
                                <View style={styles.taskStyle}>
                                    {
                                        item.Nume != ''?
                                        <Text style={styles.titlu}>{item.Nume}</Text>:
                                        null
                                    }
                                    
                                    {
                                        item.SubTask.map(obj => (
                                            <View style={{flexDirection:'row'}}>
                                                {

                                                obj.completat?
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="check-box-outline" size={19} color="#8C8C8C" />
                                                </TouchableOpacity>:
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={19} color="white" />
                                                </TouchableOpacity>

                                                }
                                                <Text style={[obj.completat? styles.checkedText : styles.underText,{marginLeft:5,width:'85%'}]}>{obj.nume}</Text>
                                                {/* <Text style={styles.underText}>{obj.completat}</Text> */}
                                            </View>
                                        ))
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                    <FlatList 
                        data={realTaskList.filter((_,i)=>i% 2 !== 0)}
                        renderItem={({item})=>(
                            <TouchableOpacity onPress={()=>{navigation.navigate('TaskPage',item)}}>
                                <View style={styles.taskStyle}>
                                    <Text style={styles.titlu}>{item.Nume}</Text>
                                    {/* <Text style={styles.text}>{item.SubTask}</Text> */}
                                    {
                                        item.SubTask.map(obj => (
                                            <View style={{flexDirection:'row'}}>
                                                {
                                                obj.completat?
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="check-box-outline" size={19} color="#8C8C8C" />
                                                </TouchableOpacity>:
                                                <TouchableOpacity>
                                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={19} color="white" />
                                                </TouchableOpacity>

                                                }
                                                <Text style={[{marginLeft:5,width:'85%'},obj.completat? styles.checkedText : styles.underText]}>{obj.nume}</Text>
                                                {/* <Text style={styles.underText}>{obj.completat}</Text> */}
                                            </View>
                                        ))
                                    }
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{height:100}}></View>
            </ScrollView>
        </View>
    )
}

export default TaskList
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop:7,
        //flexWrap: 'wrap',
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        //justifyContent: 'center',
        color: 'white',

        width:'100%',
        height:'100%',
        //paddingHorizontal: 10,
      },
    text: {
        color: 'white',
        fontSize: 16,
    },
    titlu:{
        color: 'white',
        fontSize: 20,
        marginBottom:10,
    },
    underText: {
        fontSize:14,
        color:'#BFBFBF',
    },
    checkedText: {
        color:'#8C8C8C',
        fontSize: 14,
        textDecorationLine: 'line-through',
    },
    taskStyle: {
        flex: 1,
        //flexDirection:'row',
        minWidth: 185,
        maxWidth: 185,
        minHeight: 80,
        maxHeight: 500,
        borderWidth: 1,
        borderColor:'#8C8C8C',
        backgroundColor: 'transparent',
        margin:5,
        padding: 12,
        borderRadius: 5,
    }
  });