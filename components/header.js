import React from 'react'
import { View, Text ,TextInput,StyleSheet,Image} from 'react-native'

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={{color:'white'}}>Menu</Text>
            <Image
                style={{height:30,width:80,margin: 10,}}
                source={require('../assets/drawable-mdpi/grp25.png')}
            />
            <TextInput style={styles.input} placeholderTextColor="#5A5A5A" placeholder={'Search for notes'}/>
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    container: {
        //flex: 1,
        flexDirection:'row',
      backgroundColor: '#1f1f1f',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'white',
      color:'white',
      paddingHorizontal: 20,
      borderRadius: 10,
      width: '97.4%',
      position:'absolute',
        top: 0,
      zIndex: 99,
    },
    input:{
        color: 'white',
        borderLeftWidth: 1,
        borderColor: 'white',
        paddingVertical:0.5,
        paddingHorizontal: 4,
        fontSize:16,
    }
  });