import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Platform, Text} from 'react-native';
import {Fonts, colors} from '../config';
import NavigationNames from './NavigationNames';
import {HomeScreen} from '../screens/HomeScreen/HomeScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
  const androidTabStyle = {
    backgroundColor: colors.WHITE,
    height: 60,
    position: 'absolute',
    bottom: 20,
    paddingTop: 5,
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

  const HomeTabStack = () => {
    return (
      <Stack.Navigator initialRouteName={NavigationNames.HomeScreen}>
        <Stack.Screen
          component={HomeScreen}
          name={NavigationNames.HomeScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
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
      }}>
      <Tab.Screen
        name={NavigationNames.HomeScreen}
        component={HomeTabStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused, size}) => {
            return (
              <FontAwesome5
                name="home"
                color={focused ? colors.PRIMARY : colors.GRAY_LIGHT}
                size={20}
              />
            );
          },
          tabBarLabel: ({color, focused, size}) => {
            return (
              Platform.OS === 'ios' && (
                <Text
                  style={{
                    color: focused ? colors.PRIMARY : colors.GRAY_LIGHT,
                    fontSize: 14,
                    fontFamily: focused
                      ? Fonts.Montserrat_bold
                      : Fonts.Montserrat_light,
                  }}>
                  Home
                </Text>
              )
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabNavigator;
