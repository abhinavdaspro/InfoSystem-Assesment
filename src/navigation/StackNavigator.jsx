import React, {useCallback, useContext, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigationNames from './NavigationNames';
import LoginScreen from '../screens/auth/LoginScreen';
import {AuthContext} from '../service/AuthService';
import HomeLoaderScreen from '../screens/HomeScreen/HomeLoaderScreen';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import {Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import HomeTabNavigator from './HomeTabNavigator';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const contextData = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  //   console.log('loggedIn---', contextData.loggedInUser);

  useEffect(() => {
    contextData
      .getAuthState()
      .then(res => {
        console.log('user login---', contextData.loggedInUser);
        setLoading(false);
      })
      .catch(err => {
        console.error('fail---', contextData.loggedInUser);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View>
        <HomeLoaderScreen />
      </View>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName={
        contextData.loggedInUser
          ? NavigationNames.HomeTabScreen
          : NavigationNames.LoginScreen
      }>
      <Stack.Screen
        component={LoginScreen}
        name={NavigationNames.LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={HomeTabNavigator}
        name={NavigationNames.HomeTabScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
