
import React from 'react'
import OnboardScreen from './OnboardScreen';
import OnboardedScreen from './Onboard';
import { createStackNavigator } from '@react-navigation/stack';
const Stack=createStackNavigator();

const Onboardconn = ({completed}) => {
  return (
    <Stack.Navigator ScreenOptions={{ headerShown: false }}>
    <Stack.Screen name="CEH" component={OnboardScreen} initialParams={{completed}} />
    <Stack.Screen name="Onboard" component={OnboardedScreen} />
    </Stack.Navigator>
  )
}

export default Onboardconn;