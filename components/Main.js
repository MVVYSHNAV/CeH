import React, { Component } from 'react'
import firebase from 'firebase/compat/app';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser , fetchUserPosts} from '../redux/actions/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './main/Feed';

import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';

import MaterialCommunityicons from 'react-native-vector-icons/MaterialCommunityIcons'


const EmptyScreen = () => {
    return(null)
}
const Tab = createMaterialBottomTabNavigator();

export class Main extends Component {
    componentDidMount(){

        this.props.fetchUser();
        this.props.fetchUserPosts();
    }
  render() {
    
    return (
        <Tab.Navigator initialRouteName='Feed' labeled={false}>
          <Tab.Screen name="Feed" component={FeedScreen} 
          options={{
            tabBarIcon: ({ color, size}) => (
                <MaterialCommunityicons name='home' color={color} size={26}/>
            ),
          }}
          />
           <Tab.Screen name="Search" component={SearchScreen}  navigation= {this.props.navigation}
          options={{
            tabBarIcon: ({ color, size}) => (
                <MaterialCommunityicons name='magnify' color={color} size={26}/>
            ),
          }}
          />
          
           <Tab.Screen name="Post" component={EmptyScreen}
           listeners={({ navigation }) => ({
            tabPress: event => {
                event.preventDefault()
                navigation.navigate("Add")
            }
           })} 
          options={{
            tabBarIcon: ({ color, size}) => (
                <MaterialCommunityicons name='plus-box' color={color} size={26}/>
            ),
          }}
          />
        
        <Tab.Screen
   name="Profile"
   component={ProfileScreen}
   listeners={({ navigation }) => ({
     tabPress: event => {
       event.preventDefault();
       navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
     },
   })}
   options={{
     tabBarIcon: ({ color, size }) => (
       <MaterialCommunityicons name="account-circle" color={color} size={26} />
     ),
   }}
 />
        </Tab.Navigator>
      );
  }
}
const mapStateToProps = (Store) => ({
    currentUser: Store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main);