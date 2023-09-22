import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginScreen from '../screens/auth/LoginScreen'
import StackNavigator from './StackNavigator'
import { Platform } from 'react-native'
import FlashMessage from 'react-native-flash-message'

const RootNavigator = () => {
    return (
        <>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
            <FlashMessage
                position="top"
                style={
                    Platform.OS === 'ios'
                        ? {}
                        : { marginHorizontal: 10, marginTop: 20, borderRadius: 10 }
                }
            />
        </>
    )
}

export default RootNavigator