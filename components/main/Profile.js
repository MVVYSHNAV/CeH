import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList } from 'react-native'
import { Button, Card, Avatar} from 'react-native-paper';
import firebase from 'firebase/compat/app';

require('firebase/firestore')
import { connect } from 'react-redux'

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)

    useEffect(() => {
        const { currentUser, posts } = props;

        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
                })
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
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }

    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .set({})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <Card>
                <Card.Title
                title = {user.name}
                subtitle = {user.email}
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                />
                </Card>

                {props.route.params.uid !== firebase.auth().currentUser.uid ? (
                    <View>
                        {following ? (
                            <Button mode='contained'
                        
                                onPress={() => onUnfollow()}
                            > Following </Button>
                        ) :
                            (
                                <Button
                                    mode="contained-tonal"
                                    onPress={() => onFollow()}
                                > Follow </Button>
                            )}
                    </View>
                ) :
                    <Button
                        mode="contained-tonal"
                        onPress={() => onLogout()}
                    > Logout
                    </Button>}
            </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>

                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>

                    )}

                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInfo: {
        margin: 10,
        marginBottom: "4%"
    },
    containerGallery: {
        flex: 1,
        marginLeft: "2%",
        marginRight: "2%"
    },
    containerImage: {
        flex: 1 / 1,
        margin: 2
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);