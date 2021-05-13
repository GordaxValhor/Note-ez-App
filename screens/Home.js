import React,{useEffect,useContext} from 'react'
import { View, Text,StyleSheet,Button,StatusBar, } from 'react-native';

import Header from '../components/header.js';

import Notes from './Notes';
import {routeContex} from '../routes/tabStack';
const Home = ({navigation,route}) => {
    //aici o sa avem ca toate functionalitatile
    const test = useContext(routeContex);
    useEffect(() => {
        console.log("route din home:",test)
        // if (route.params?.post) {
        //   console.log(route.params?.post)
        // }
      }, [test]);
    return (
        
        <View style={styles.container}> 
            <StatusBar
                barStyle="light-content"
                backgroundColor="#1f1f1f"
            />
            
            <Header />
            
            <Notes navigation={navigation} dateNote={test}/>
            <Button title="vezi" onPress={()=>{console.log('ba',test);}}/>
        </View>
    )
}

export default Home
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#1f1f1f',
      alignItems: 'center',
      //justifyContent: 'space-around',
      color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 16,
    }
  });