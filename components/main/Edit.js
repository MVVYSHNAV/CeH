import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase/compat/app';
require('firebase/firestore');
import { connect } from 'react-redux';

function Edit(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Set initial values when the component mounts
    setName(props.currentUser.name);
    setEmail(props.currentUser.email);
  }, [props.currentUser]);

  const onSaveChanges = () => {
    const { currentUser } = props;
    // Update user data in the Firestore database
    firebase.firestore().collection('users').doc(currentUser.uid).update({
      name: name,
      email: email,
    })
    .then(() => {
      console.log('Profile updated successfully!');
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="Save Changes"
        onPress={() => onSaveChanges()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Edit);
