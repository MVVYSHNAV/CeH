import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import { Avatar, Card } from 'react-native-paper';
import { Button,  Text,IconButton} from 'react-native-paper';



import firebase from 'firebase/compat/app'
require('firebase/firestore')
import { connect } from 'react-redux'

function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
            props.feed.sort(function (x, y) {
                return x.creation - y.creation;
            })
            setPosts(props.feed.map((feed)=>({...feed,liked:false})));
        }
        console.log(posts)

    }, [props.usersFollowingLoaded, props.feed])

    const onLikePress = (userId, postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
        // const getPost=posts.filter((post)=>postId===post.id);
        // getPost.liked=true;
        setPosts((prev)=>{
            return prev.map(post=>{
                if(post.id===postId)
                 return {...post,liked:!post.liked
                }
                return post;
            });
        })
        
    }
    const onDislikePress = (userId, postId) => {
        firebase.firestore()
          .collection("posts")
          .doc(userId)
          .collection("userPosts")
          .doc(postId)
          .collection("likes")
          .doc(firebase.auth().currentUser.uid)
          .delete()
  }
    return (
        <View style={styles.container}>
            <View style={styles.containerGallery}>
                {posts && <FlatList
                    numColumns={1}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item,index }) => (
                        <Card key={index}>
                           
                        <View
                            style={styles.containerImage}>
                            <Card.Title 
                           title = {item.user.name}
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
                             />
                             <Text variant="titleMedium" style = {{ width:"80",height:"40",  marginLeft: 30 }}> {item.caption}</Text>
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            { item.currentUserLike ?
                                (
                                    <Button 
                                        style={{borderRadius:0}}                                       
                                        mode="contained-tonal"
                                        buttonColor="lightpurple"
                                        icon="dislike"
                                        onPress={() => onDislikePress(item.user.uid, item.id)}> Dislike  </Button>
                                )
                                :
                                (
                                    <IconButton style={{margin:"2%",borderRadius:0}}
                                    mode="elevated"
                                    buttonColor="#FFF3DA"
                                    iconColor={item.liked ?"red":"black"}
                                    icon={item.liked?"heart":"heart-outline"}
                                    
                                    
                                        onPress={() => onLikePress(item.user.uid, item.id)} /> 
                                )
                            }
                            <Text 
                                style={{textAlign:"center", marginBottom: "4%"}}
                                variant="titleMedium"
                                onPress={() => props.navigation.navigate('Comment', { postId: item.id, uid: item.user.uid })}>
                                View solutions..
                                </Text>
                        </View>
                        </Card>

                    )}

                />}
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "2%",
        

    },
    containerInfo: {
        margin: 20
    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 0.5,
        marginBottom: "5%"

    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1
    }
})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,


})
export default connect(mapStateToProps, null)(Feed);