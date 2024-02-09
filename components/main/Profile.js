import React, { useState, useEffect } from 'react';
import { StyleSheet, View,  Image, FlatList } from 'react-native';
import { Button, Card, Avatar,Text, Badge, Chip } from 'react-native-paper';
import firebase from 'firebase/compat/app';
import { useNavigation } from '@react-navigation/native';

require('firebase/firestore');
import { connect } from 'react-redux';

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [imageUrl, setImageUrl] = useState(); // State to store image URL

  useEffect(() => {
    const { currentUser, posts } = props;

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
      setImageUrl(currentUser.image); // Set image URL from user data
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            const userData = snapshot.data();
            setUser(userData);
            setImageUrl(userData.image); // Set image URL from user data
          } else {
            console.log('User does not exist');
          }
        })
        .catch(error => {
          console.error('Error getting user data:', error);
        });

      firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then(snapshot => {
          let posts = snapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        })
        .catch(error => {
          console.error('Error getting user posts:', error);
        });
    }

    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .set({});
  };
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .delete();
  };

  const onLogout = () => {
    firebase.auth().signOut();
  };
  const onEditProfile = () => {
    navigation.navigate('Edit', { user }); 
  };

  if (user === null) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Card>
          <Card.Title
            title={user.name}
            subtitle={user.email}
            left={() => (
              <Avatar.Image
                size={50}
                source={
                    imageUrl
                      ? { uri: imageUrl }
                      : require('../../assets/splash.png') // Use default image if imageUrl is null
                  } 
              />
            )}
            right={() => (
              
              <Chip icon='information'  onPress={() => console.log('Pressed')}style={{marginRight: 5, paddingRight: 8, paddingLeft: 8, marginBottom: 10}}> 
              Role: {user.role} 
              </Chip>
            )}
          />
        </Card>

        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button mode="contained" onPress={onUnfollow}>
                Following
              </Button>
            ) : (
              <Button mode="contained-tonal" onPress={onFollow}>
                Follow
              </Button>
            )}
          </View>
        ) : 
        (
          <View>
          <Button mode="contained-tonal" onPress={onLogout}>
            Logout
          </Button>
          <Button mode="contained" onPress={onEditProfile}>
            Edit
          </Button>
        </View>
        )}
      </View>
     
      
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              { item?.downloadURL ?
                <Image style={styles.image} source={{ uri: item.downloadURL }} />
              :<View style={styles.textc}>
                <Text style={{color:"white"}}> {item.textcap}</Text>
              </View>}
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
  containerInfo: {
    margin: 10,
    marginBottom: '4%',
  },
  containerGallery: {
    flex: 1,
    marginLeft: '2%',
    marginRight: '2%',
  },
  textc: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center",
    // margin: 2,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal:"4%" // Align text to the center
  },
  containerImage: {
    flex: 1 / 1,
    margin: 2,
  },
   containerText: {
    flex: 1 / 1,
    margin: 2,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = store => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

export default connect(mapStateToProps, null)(Profile);
