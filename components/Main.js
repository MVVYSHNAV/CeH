import React, { Component } from 'react'
import { View, Text } from 'react-native'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser , fetchUserPosts} from '../redux/actions/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FeedScreen from './main/Feed';

import ProfileScreen from './main/Profile';

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
           <Tab.Screen name="Profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({ color, size}) => (
                <MaterialCommunityicons name='account-circle' color={color} size={26}/>
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