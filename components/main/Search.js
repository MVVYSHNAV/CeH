import React, { useState } from 'react'
import { View , Text, TextInput, FlatList} from 'react-native'
import firebase from 'firebase/compat/app';;
require('firebase/firestore')
export default function  Search() {
    const [users, setUsers] = useState([])

    const fetchUser = (Search) => {
        firebase.firestore()
        .collection('users')
        .where('name', '>=', Search)
        .get()
        .then((snapshot)  => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            });
            setUsers(users);

        })
    }
  return (
    <View>
        <TextInput onChange={(search) => fetchUser(search)}/>
    </View>
  )
}
