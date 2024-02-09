import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, TextInput, Avatar } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import * as ImagePicker from 'expo-image-picker';


export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      name: '',
      role: '',
      image: null, // Added state for image URI
    };

    this.onSignUp = this.onSignUp.bind(this);
  }

  // Function to handle image selection
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  // Function to handle user sign up
// Function to handle user sign up
onSignUp() {
  const { email, password, name, role, image } = this.state;

  if (!image) return;
  // Step 1: Upload image to Firebase Storage
  const uploadImage = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const imageName = `${Date.now()}-${name}`;

      const ref = firebase.storage().ref().child(`profile_images/${imageName}`);
      await ref.put(blob);

      return ref.getDownloadURL();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };


  // Step 2: After image upload, save user data including image URL to Firestore
  uploadImage()
    .then(imageuri => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
          firebase.firestore().collection("users")
            .doc(result.user.uid)
            .set({
              name,
              email,
              role,
              image: imageuri // Save image URL to Firestore
            })
            .then(() => {
              console.log("User registered successfully!");
              // Show alert to confirm user registration
              Alert.alert('Success', 'User registered successfully!');
            })
            .catch(error => {
              console.error("Error saving user data:", error);
            });
        })
        .catch(error => {
          console.error("Error creating user:", error);
        });
    })
    .catch(error => {
      console.error('Error signing up:', error);
    });
}

  render() {
    const { image } = this.state;

    return (
      <View style={styles.containerland1}>
        <View style={styles.containerland2}>
          <View style={styles.containerland3}>
            <Text style={{ textAlign: "center" }}>Register</Text>
            <View style={styles.containerland4}>
              <TextInput
                label="Name"
                mode="outlined"
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
              />
              
              <TextInput
                label="Email"
                mode="outlined"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                label="Password"
                placeholder="password"
                mode="outlined"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              /> 
              <TextInput
              label="Role"
              mode="outlined"
              value={this.state.role}
              onChangeText={(role) => this.setState({ role })}
            />
            </View>
            <View style={styles.containerbtn}>
              <Button
                icon="folder-plus"
                onPress={this.pickImage}
              >
                Upload Photo
              </Button>
              {image && <Avatar.Image source={{ uri: image }} style={{ alignSelf: "center" }} />}
              <Button
                mode="contained"
                onPress={this.onSignUp}
                >
                Sign Up
              </Button>
              
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
    flex: 1,
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
});
