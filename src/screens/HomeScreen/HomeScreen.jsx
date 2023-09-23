import React from 'react';
import {FocusAwareStatusBar} from '../../components/Commons';
import {colors} from '../../config';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderView} from '../../components/Commons/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';

export const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <View style={styles.container}>
        <HeaderView />
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.clear();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: NavigationNames.LoginScreen}],
              }),
            );
          }}>
          <Text style={{marginTop: 200}}>Welcome User</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.WHITE,
  },
});
