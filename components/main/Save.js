import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from 'firebase/compat/app'; // Import only the 'app' module
import 'firebase/compat/firestore';
import 'firebase/compat/storage';// Import storage from compat version

export default function Save({ route, navigation }) {
  const [caption, setCaption] = useState('');

  const uploadImage = async () => {
    const uri = route.params.image;
    const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
    console.log(childPath);
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = snapshot => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then(downloadURL => {
        savePostData(downloadURL);
        console.log(downloadURL);
      });
    };

    const taskError = error => {
      console.error(error);
    };

    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    firebase.firestore().collection('posts')
      .doc(firebase.auth().currentUser.uid)
      .collection('userPosts')
      .add({
        downloadURL,
        caption,
        creation: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        navigation.popToTop();
      })
      .catch(error => {
        console.error('Error saving post data:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params.image }} style={styles.image} />
      <TextInput
      mode="outlined"
        label='Text'
        placeholder='Write a Caption...'
        style={{width:"100%", }}
        value={caption}
        onChangeText={caption => setCaption(caption)}
      />
      <Button 
      mode="elevated"
      buttonColor='#0A5D99'
      textColor='white'
      style={{width:"100%", marginTop: "4%", marginBottom: "4%"}}
      onPress={uploadImage}> Save </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: "2%"
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});