import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Save({ route }) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // You can adjust the resizeMode as needed
  },
});
