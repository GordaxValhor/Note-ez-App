import React,{useState} from 'react'
import { View, Text, StyleSheet,Image,ScrollView,TouchableOpacity,Modal,TextInput } from 'react-native'

import {
    DrawerContentScrollView,
    DrawerItemList,
  } from '@react-navigation/drawer';

import {globalStyles} from '../assets/globalStyles/globalStyles'


const DrawerMenu = () => {




    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={[globalStyles.container,styles.container]}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={[styles.modalStyle,{top:'35%',left:'25%'}]}>
                        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                            <View style={{marginLeft:'90%'}}>
                            <Text style={[globalStyles.text]}>X</Text>
                            </View>
                        </TouchableOpacity>
                            <View style={{margin:15,padding:5,alignItems:'center'}}>
                                {/* <Text style={globalStyles.text}>Adauga un label nou</Text> */}
                                <TextInput placeholderTextColor="#fff4" style={globalStyles.text} placeholder='Adauga un label nou'></TextInput>
                            </View>
                        <TouchableOpacity>
                            <Text style={globalStyles.text}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <View style={{borderBottomWidth:1,borderColor:'white',width:'100%',padding:10}}>
                        <Image
                        style={{resizeMode:'contain',height:50,width:'100%'}}
                        source={require('../assets/drawable-xxhdpi/grp25.png')}
                        />
                </View>
                <View style={{marginTop:20, width:'100%',padding:10,}}>
                    <Text style={styles.titlu}>Account</Text>
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around',}}>
                        <Text style={globalStyles.text}>Nume cont</Text>
                        <View style={{width:50,height:50,borderWidth:1,borderRadius:50,borderColor:'gray'}}></View>
                    </View>
                </View>
                <ScrollView style={{marginTop:20,flex:1}}>
                    <View>
                        <View style={{marginLeft:9}}>
                            <Text style={styles.titlu}>Teams</Text>
                            <View style={{marginLeft:20,marginTop:5,}}>
                                <Text style={globalStyles.text}>Echipa 1</Text>
                                <Text style={globalStyles.text}>Echipa 2</Text>
                            </View>
                        </View>
                        <View style={{marginTop:20,marginLeft:9,width:250,}}>
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',}}>
                                <Text style={styles.titlu}>Labels</Text>
                                <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)}>
                                    <Text style={styles.titlu}>Add</Text>
                                </TouchableOpacity>
                            </View>
                                <View style={{marginLeft:20,marginTop:5,}}>
                                    <Text style={globalStyles.text}>Label 1</Text>
                                    <Text style={globalStyles.text}>Label 2</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{height:150,borderTopWidth: 1,borderColor:'white',width:'100%',padding:5}}>
                    <Text style={globalStyles.text}>sectiune setting</Text>
                </View>
        </View>
    )
}

export default DrawerMenu


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'flex-start',
        //justifyContent: 'flex-start',
        //alignItems:'flex-start',
        backgroundColor: '#0a0a0a',
        borderRightWidth: 1,
        borderColor: 'white',
        
    },
    titlu: {
        fontSize: 18,
        color: 'white',
    },
    modalStyle:{
        width:270,
        minHeight:120,
        borderWidth: 2,
        borderColor:'#8C8C8C',
        backgroundColor: '#0a0a0a',
        margin:5,
        padding: 12,
        borderRadius: 5,
    }
})