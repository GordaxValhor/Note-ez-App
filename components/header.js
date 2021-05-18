import React from 'react'
import { View, Text ,TextInput,StyleSheet,Image,TouchableOpacity} from 'react-native'

const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image
                    style={{marginTop:0,resizeMode: "contain",height:21,}}
                    source={require('../assets/drawable-xhdpi/grp160.png')}
                />
            </TouchableOpacity>
            <Image
                style={{height:30,width:80,}}
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
      backgroundColor: '#0a0a0a',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: 'white',
      color:'white',
      paddingHorizontal: 20,
      paddingVertical:7,
      borderRadius: 7,
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
        marginRight:38,
    }
  });