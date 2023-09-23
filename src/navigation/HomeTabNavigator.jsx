import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, Text} from 'react-native';
import {Fonts, colors} from '../config';
import NavigationNames from './NavigationNames';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {UserScreen} from '../screens/UserScreen/UserScreen';
import {AuthContext} from '../service/AuthService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeScreen}
        name={NavigationNames.HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const UserTabStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserScreen}
        name={NavigationNames.UserScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeTabNavigator = () => {
  const {userData} = useContext(AuthContext);

  const androidTabStyle = {
    backgroundColor: colors.WHITE,
    height: 80,
    position: 'absolute',
    bottom: 20,
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 30,
    marginHorizontal: 15,
  };

  const IOSTabStyle = {
    backgroundColor: colors.WHITE,
    height: 80,
    bottom: 20,
    borderRadius: 40,
    borderTopWidth: 0,
    paddingBottom: 20,
    paddingTop: 10,
    marginHorizontal: 15,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
  };

  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 12,
        },
        tabBarStyle: Platform.OS === 'ios' ? IOSTabStyle : androidTabStyle,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: colors.GRAY,
        tabBarLabelPosition: 'below-icon',
      }}>
      <Tab.Screen
        name={NavigationNames.HomeTabScreen}
        component={HomeTabStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused, size}) => {
            return (
              <FontAwesome5
                name="home"
                color={focused ? colors.PRIMARY : colors.GRAY}
                size={20}
              />
            );
          },
          tabBarLabel: ({color, focused, size}) => {
            return (
              <Text
                style={{
                  color: focused ? colors.PRIMARY : colors.GRAY,
                  fontSize: 14,
                  fontFamily: focused
                    ? Fonts.Montserrat_bold
                    : Fonts.Montserrat_light,
                }}>
                Home
              </Text>
            );
          },
        }}
      />
      {userData.role === 'SM' && (
        <Tab.Screen
          name={NavigationNames.UserTabScreen}
          component={UserTabStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused, size}) => {
              return (
                <Entypo
                  name="user"
                  color={focused ? colors.PRIMARY : colors.GRAY}
                  size={20}
                />
              );
            },
            tabBarLabel: ({color, focused, size}) => {
              return (
                <Text
                  style={{
                    color: focused ? colors.PRIMARY : colors.GRAY,
                    fontSize: 14,
                    fontFamily: focused
                      ? Fonts.Montserrat_bold
                      : Fonts.Montserrat_light,
                  }}>
                  User
                </Text>
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
