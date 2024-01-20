import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import { connect } from 'react-redux';

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });

  return (
    <View style={styles.container}>
      <View style={styles.containerinfo}>
        <Text> {currentUser.name} </Text>
        <Text> {currentUser.email} </Text>
      </View>
      <View style={styles.containergallery}>
        <FlatList
         key={posts.length}
          numColumns={4}
          horizontal={false}
          data={posts}
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
    marginTop: 40,
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
