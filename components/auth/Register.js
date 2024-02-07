//Register.js
import React, { Component } from 'react';
import { View,  StyleSheet} from 'react-native';
import {Button, TextInput , Text} from 'react-native-paper';
import firebase from 'firebase/compat/app'; // for version 9 and above


export class Register extends Component {
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : '',
            name : ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((result) => { // Fix the typo here, change 'this' to 'then'
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
  render() {
    return (
        <View style={styles.containerland1}>
      <View style={styles.containerland2}>
      <View style={styles.containerland3}>
      <Text style={{textAlign:"center"}} variant='displayLarge'> Ceh </Text>
      <Text style={{textAlign:"center", color:"purple"}} variant='labelMedium'> Register </Text>
      <View style={StyleSheet.containerland4}>
            <TextInput
                label= "Name" mode ="outlined"
                onChangeText={(name) => this.setState ( {  name } )}
            />
             <TextInput
                label="Email" mode ="outlined"
                onChangeText={(email) => this.setState ( {  email } )}
            />
             <TextInput
             label="Password"
                placeholder='password'mode ="outlined"
                secureTextEntry={true}
                onChangeText={(password) => this.setState ( { password } )}
                
            />
            </View>
            <View  style={StyleSheet.containerbtn}>
            <Button 
            mode="contained" 
            icon="login" 
            buttonColor='#C9FFD2'
            textColor='black'
                onPress={() => this.onSignUp()}> Sign Up </Button>
                </View>
      </View>
      </View>
      </View>
    )
  }
}

export default Register;

const styles = StyleSheet.create({
    containerland1: {
        flex : 1, 
        backgroundColor: '#FFFFFF',
        justifyContent: 'center'
      },
      containerland2: {
        height: '85%',
        width: '80%',
        marginLeft: '10%',
        padding: '10%',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#FFF3DA',
        
      },
      containerland4: {
        gap: 15,
        padding: 10
      },
      containerbtn: {
        padding: 30,
      gap: 20
      }
      
})