import React, { useState, useEffect } from 'react'
import { View, Text, FlatList} from 'react-native'
import { TextInput, Button, Card , Avatar,  Chip} from 'react-native-paper';

import firebase from 'firebase/compat/app';
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")
   

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }
  

    return (
        <View>
                 <View>
                            <TextInput style={{marginBottom:"4%"}}
                                label="Comments"
                                value={text}
                                onChangeText={(text) => setText(text)} />
                            <Button style={{marginBottom:"4%"}}
                                mode="contained"
                                buttonColor='#062471'
                                textColor='#FFFFFF'
                                multiiline='true'
                                onPress={() => onCommentSend()}
                            > Send </Button>
                </View>
           
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <Card style={{marginBottom:"4%"}}>
                        {item.user !== undefined ?
                            <Card.Title
                            mode="outlined"
                               title = {item.user.name}
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
                            //    right={() => (
              
                            //     <Chip icon='information'  onPress={() => console.log('Pressed')}style={{marginRight: 5, paddingRight: 8, paddingLeft: 8, marginTop: 20}}> 
                            //     Role: {user.role} 
                            //     </Chip>
                            //   )}
                               subtitle = {item.text}
                            />
                            : null}

                    </Card>
                )}
            />

    </View>
    )
}


const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);