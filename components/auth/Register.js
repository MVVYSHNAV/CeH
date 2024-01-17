//Register.js
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
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
      <View>
            <TextInput
                placeholder='name'
                onChangeText={(name) => this.setState ( {  name } )}
            />
             <TextInput
                placeholder='email'
                onChangeText={(email) => this.setState ( {  email } )}
            />
             <TextInput
                placeholder='password'
                secureTextEntry={true}
                onChangeText={(password) => this.setState ( { password } )}
            />

            <Button 
                onPress={() => this.onSignUp()}
                title='Sign Up'
            />
      </View>
    )
  }
}

export default Register;