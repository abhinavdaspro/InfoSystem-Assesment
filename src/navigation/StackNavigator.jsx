import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import NavigationNames from './NavigationNames';
import LoginScreen from '../screens/auth/LoginScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                component={LoginScreen}
                name={NavigationNames.LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator