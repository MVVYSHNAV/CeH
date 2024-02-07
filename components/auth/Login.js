import React, { Component } from 'react';
import { View , StyleSheet } from 'react-native';
import {Button, TextInput, Text} from 'react-native-paper';
import firebase from 'firebase/compat/app'; // for version 9 and above
import 'firebase/compat/auth'; // Importing auth module separately

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  onSignUp() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View  style={styles.containerland1}>
        <View style={styles.containerland2}>
      <View style={styles.containerland3}>
      <Text style={{textAlign:"center"}} variant='displayLarge'> Ceh </Text>
      <Text style={{textAlign:"center", color:"purple"}} variant='labelMedium'> Login </Text>


        <TextInput
          label="Eamil"
          placeholder='vyshnavdev@gmail.com'
          mode='outlined'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          label="Password"
          mode='outlined'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          
        />
       
       </View>
       <View style={styles.btncontainer}> 
        <Button 
        mode="contained"
        icon="login"  
        buttonColor='#C9FFD2'
        textColor='black'
        onPress={this.onSignUp}> Login </Button>
        </View>
        </View>
      </View>
    );
  }
}

export default Login;

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
    containerland3: {
      padding: 20
    },
    
    btncontainer: {
      padding: 20
    }
  })