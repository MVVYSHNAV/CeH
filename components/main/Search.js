import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Card, Avatar } from 'react-native-paper';
import firebase from 'firebase/compat/app';


require('firebase/firestore');

export default function Search(props) {
  const [users, setUsers] = useState([]);

const fetchUsers = search => {
  const searchLower = search.toLowerCase(); // Convert search query to lowercase
  firebase
    .firestore()
    .collection('users')
    .get()
    .then(snapshot => {
      let users = snapshot.docs
        .map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        })
        .filter(user => user.name.toLowerCase().includes(searchLower)); // Filter users based on lowercase names
      setUsers(users);
    });
  }

  return (
    <View style={{ padding: '2%' }}>
      <TextInput
        label="Search"
        placeholder="Type Here..."
        onChangeText={search => fetchUsers(search)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile', { uid: item.id })}>
            <Card>
              <Card.Title
                style={{ marginBottom: '2%' }}
                title={item.name}
                left={() => (
                  <Avatar.Image
                    size={50}
                    source={
                        item.image
                          ? { uri: item.image }
                          : require('../../assets/splash.png') // Use default image if imageUrl is null
                      }
                  />
                )}
              />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
