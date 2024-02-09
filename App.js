import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './redux/reducers';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentScreen from './components/main/Comment';
import Onboardconn from './components/Onboardconn';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';


const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "AIzaSyAX0_aOjZx16i5tLEJ49X7QNLUZkvK6nww",
  authDomain: "our-philosophy-359114.firebaseapp.com",
  projectId: "our-philosophy-359114",
  storageBucket: "our-philosophy-359114.appspot.com",
  messagingSenderId: "396038799354",
  appId: "1:396038799354:web:fed58696df1ad85ac4ee43",
  measurementId: "G-9F33C8PBGW"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [onboarded,setOnboarded] = useState(false)


  const loadOnboard=async ()=>{
    const storedOnboarded=await AsyncStorage.getItem("onboarded");
    if(storedOnboarded){
      setOnboarded(true);
    }else{
      setOnboarded(false);
      AsyncStorage.setItem("onboarded","true")
    }

  }

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoggedIn(!!user); 
      setLoaded(true);
    });

    loadOnboard();
    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
    
    
      <NavigationContainer>
        {onboarded?
        <Stack.Navigator initialRouteName={loggedIn ? 'Main' : 'Landing'}>
          {!loggedIn ? (
            <>
              
              <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              
            </>
          ) : (
            <>
              <Stack.Screen name="Ceh" component={MainScreen}  />
              <Stack.Screen name="Add" component={AddScreen}  />
              <Stack.Screen name="Save" component={SaveScreen} />
              <Stack.Screen name="Comment" component={CommentScreen} />
            </>
          )}
        </Stack.Navigator>
        :<Onboardconn completed={()=>setOnboarded(true)}/>}
      </NavigationContainer>
    </Provider>
  );
};

export default App;