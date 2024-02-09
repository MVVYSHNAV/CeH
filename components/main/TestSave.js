import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from 'firebase/compat/app'; // Import only the 'app' module
import 'firebase/compat/firestore';

export default function TextSave({ route, navigation }) {
    const [textcap, setTextCap] = useState('');

    const saveTextData = async () => {
        try {
            await firebase.firestore().collection('posts')
                .doc(firebase.auth().currentUser.uid)
                .collection('userPosts')
                .add({
                    textcap,
                    creation: firebase.firestore.FieldValue.serverTimestamp()
                });
            navigation.popToTop();
        } catch (error) {
            console.error('Error saving post data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label='Text'
                placeholder='Write a Caption...'
                style={{ width: "100%" }}
                value={textcap}
                onChangeText={textcap => setTextCap(textcap)}
            />
            <Button
                mode="elevated"
                buttonColor='#0A5D99'
                textColor='white'
                style={{ width: "100%", marginTop: "4%", marginBottom: "4%" }}
                onPress={saveTextData}> Save </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: "2%"
    },
});
