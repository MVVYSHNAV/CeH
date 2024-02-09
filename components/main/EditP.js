import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
require('firebase/firestore');

export default function EditProfile({ navigation, route }) {
  const [name, setName] = useState(route.params.user.name);
  const [email, setEmail] = useState(route.params.user.email);

  const onUpdateProfile = () => {
    firebase.firestore().collection('users').doc(route.params.user.uid).update({
      name,
      email
    })
    .then(() => {
      console.log('Profile updated successfully!');
      navigation.goBack();
    })
    .catch(error => {
      console.error('Error updating profile: ', error);
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Update Profile" onPress={onUpdateProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
