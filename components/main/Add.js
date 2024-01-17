import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [imagePickerPermission, setImagePickerPermission] = useState(null);
  const [isCameraReady, setCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setCameraPermission(cameraStatus === 'granted');

      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setImagePickerPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  const handleCameraReady = () => {
    setCameraReady(true);
  };

  const takePicture = async () => {
    if (camera && isCameraReady) {
      try {
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  if (cameraPermission === null || imagePickerPermission === null) {
    // Permissions are still loading
    return <View />;
  }

  if (!cameraPermission || !imagePickerPermission) {
    // Permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to access the camera and gallery</Text>
        <Button onPress={() => { setCameraPermission(true); setImagePickerPermission(true); }} title="Grant Permissions" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.cameracontainer}>
        <Camera ref={(ref) => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={'1:1'} onCameraReady={handleCameraReady} />
      </View>

      <Button
        style={{ flex: 0.1, alignSelf: 'flex-end', alignItems: 'center' }}
        title='Flip Image'
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title='Snap' onPress={takePicture} />
      <Button title='Pick Image' onPress={pickImage} />
      <Button title='Save' onPress={() => navigation.navigate('Save', { image })} />

      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  cameracontainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
