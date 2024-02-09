import React from 'react'
import { ImageBackground, View, StyleSheet} from 'react-native';
import  {Text,Button } from 'react-native-paper';
const image = {uri : "https://cdn.pixabay.com/photo/2017/04/20/13/58/library-2245807_1280.jpg"};

export default function Landing( {navigation } ) {
  
  return (

    
    <View style={styles.containerland1}>
      <ImageBackground source={image} style={{resizemode: "cover",flex: 1, justifyContent: 'center  '}}>
      <View style={styles.containerland2}>
                <Text style={{textAlign:"center"}} variant='displayLarge'> Ceh </Text>
                <Text style={{textAlign:"center", marginTop: 10}} variant='headlineMedium'>Collobrative XpertiseHub  </Text>  
                <Text style={{textAlign:"center"}} variant='labelMedium'>#join with amoung you mingle with others </Text>  
                      <View style={styles.btncontainer}>        
                          <Button style={styles.containerbtn} 
                          mode="contained"  
                          buttonColor='#C9FFD2'  
                          textColor='black'
                          onPress={() =>  navigation.navigate("Register")} > Register </Button>
                            <Button  style={styles.containerbtn2} mode='elevated'  icon="login"
                          onPress={() =>  navigation.navigate("Login")}>  Login </Button>
                        </View> 
                        </View>
                      </ImageBackground>
                 </View>
  )
}
const styles = StyleSheet.create({
  containerland1: {
    flex : 1, 
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  backgroundImage: {
    // width: undefined,
    // height: undefined,
    // flexDirection: 'column',
    // backgroundColor:'transparent',
     justifyContent: 'flex-start',


},
  containerland2: {
    height: '50%',
    width: '80%',
    marginLeft: '10%',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF3DA',
  
  },
  containerbtn: {
    width: '60%',
    alignContent: "center",
    justifyContent: "center",
    marginTop: '10%',
    marginLeft: '20%'
  },
  containerbtn2: {
    width: '60%',
    alignContent: "center",
    justifyContent: "center",
    marginLeft: '20%'
  },
  btncontainer:{
    gap:16
  }
})