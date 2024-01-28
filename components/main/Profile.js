import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/compat/auth';
import { connect } from 'react-redux';
require('firebase/firestore')

function Profile(props) {
  const [userPosts, setUserPosts] = useState();
  const [user, setUser] = useState(null);

  //fetch user current 
  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts })

    if(props.route.params.uid === firebase.auth().currentUser.uid){
      setUser(currentUser)
      setUserPosts(posts)

    }
    else {
      firebase.firestore()
      .collection("users")
      .doc(props.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
          if(snapshot.exists){
            setUser(snapshot.data());
          }
          else{
              console.log('does not exist')
          }

      })
      firebase.firestore()
        .collection("posts")
        .doc(props.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc") 
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return{id, ...data}
            })
           setUserPosts(posts)

        })

    }
  }, [props.route.params.uid])
  
    if(user === null) {
      return <View/>
    }

  return (
    <View style={styles.container}>
      <View style={styles.containerinfo}>
        <Text> {user.name} </Text>
        <Text> {user.email} </Text>
      </View>
      <View style={styles.containergallery}>
        <FlatList
         key={posts.length}
          numColumns={4}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View  style={styles.containerimage} >
            <Image
              style={styles.image} 
              source={{ uri: item.downloadURL }}
            />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerinfo: {
    margin: 20,
  },
  containergallery: {
    flex: 1,
  },
  containerimage: {
    flex: 1/3 
  },
  image: {
    flex: 1,
    aspectRatio: 1/1,
  },
 
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);
