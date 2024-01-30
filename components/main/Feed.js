import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList} from 'react-native';
import { connect } from 'react-redux';
require('firebase/firestore');

function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let posts = [];
    if (props.usersLoaded === props.following.length) {
      for (let i = 0; i < props.following.length; i++) {
        const user = props.users.find((el) => el.uid === props.following[i]);
        if (user !== undefined && user.posts !== undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(posts);
    }
  }, [props.usersLoaded, props.following, props.users]);

  return (
    <View style={styles.containergallery}>
      <FlatList
        key={posts.length} // Fix key to use posts.length
        numColumns={1}
        horizontal={false}
        data={posts}
        renderItem={({ item }) => (
          <View style={styles.containerimage}>
            <Text style={styles.container}> {item.user.name}</Text>
            <Image style={styles.image} source={{ uri: item.downloadURL }} />

            <Text
            onPress={() => props.navigation.navigate('Comment',
            { postId: item.id })
            }>
               View Comments
                </Text>
          </View>
        )}
      />
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
    flex: 1/ 0.5,
  },
  image: {
    flex: 1,
    aspectRatio: 1/1,
    margin: 5,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following || [],
  users: (store.usersState && store.usersState.users) || [],
  usersLoaded: (store.usersState && store.usersState.usersLoaded) || 0,
});


export default connect(mapStateToProps, null)(Feed);