import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  return (
    <View style={styles.container}>
      <Text style={styles.title} >CollabrativeExpertiesHub !</Text>
      <StatusBar style="auto" />
      <View style={styles.form}>
        <Text style={styles.labels}>Username</Text>
        <TextInput style={styles.input} placeholder='enter your user name' value={username} onChangeText={setUsername}/>
        <Text style={styles.labels}>Password</Text>
        <TextInput style={styles.input} placeholder='enter your password' value={password} onChangeText={setPassword} secureTextEntry/>
        <Button color= "#C9FFD2"  title="Login" onPress={() => {}}/>
        <Text style={styles.reg}>New User Register!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  },
  form: {
    marginTop: 50,
    width: 350,
    height: 450,
   backgroundColor: "#FFF3DA",
   borderRadius: 10,
   padding: 20,
   shadowColor: "black",
   shadowOffset: {
    width: 0,
    height: 2
   },
   shadowOpacity: 0.25,
   shadowRadius: 4,
   elevation: 5
  },
  labels: {
    marginTop: 20,
    fontSize: 16,
    marginBottom: 15,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  }, 
  reg: {
    marginTop: 50,
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center'
  }
});
