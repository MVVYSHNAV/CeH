import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList , Button} from 'react-native';
import firebase from 'firebase/compat/app'
import { connect } from 'react-redux';
require('firebase/firestore')

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following , setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;
    //console.log({ currentUser, posts })

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else if (props.route.params) {
      firebase.firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log('User does not exist');
          }
        })
        .catch((error) => {
          console.error('Error fetching user details:', error);
        });

      firebase.firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc") 
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
          });
          setUserPosts(posts);
        })
        .catch((error) => {
          console.error('Error fetching user posts:', error);
        });
    }

    if(props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    }else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onfollow = () => {
    firebase.firestore().
    collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .set({})
  }

  const onUnfollow = () => {
    firebase.firestore().
    collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .doc(props.route.params.uid)
    .delete()
  }
  const onLogout = () => {
    firebase.auth().signOut();
  }

  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
        <View style={styles.containerinfo}>
    
          {props.route.params.uid !== firebase.auth().currentUser.uid ? (
            <View>
              {following ? (
                <Button title="Following" onPress={() => onUnfollow()} />
              ) : (
                <Button title="Follow" onPress={() => onfollow()} />
              )}
            </View>
          ) : (
            <Button title='Logout' onPress={() => onLogout()} />
          )}
        </View>
        {/* Rest of your component */}
        <View style={styles.containergallery}>
        <FlatList
          // Fix key to use userPosts.length
          numColumns={4}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerimage}>
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
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following || [] // Provide a default empty array
});

export default connect(mapStateToProps, null)(Profile);
