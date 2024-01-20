import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import firebase from 'firebase/compat/app';
require('firebase/firestore');

export default function Search() {
  const [users, setUsers] = useState([]);

  const fetchUser = (search) => {
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Type user.."
        onChangeText={(text) => fetchUser(text)}
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
