import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
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
      <View>
        <TextInput
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Button onPress={this.onSignUp} title='Login in' />
      </View>
    );
  }
}

export default Login;
