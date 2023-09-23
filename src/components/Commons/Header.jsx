import React, {useContext} from 'react';
import {FocusAwareStatusBar} from './FocusedStatusBar';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts, colors} from '../../config';
import {AuthContext} from '../../service/AuthService';
import SansText from './SansText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HeaderView = () => {
  const {userData} = useContext(AuthContext);
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userData');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: NavigationNames.LoginScreen}],
      }),
    );
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <View style={styles.view}>
        <SansText
          fontFamily={Fonts.Montserrat_semibold}
          fontSize={18}
          textTransform={'capitalize'}
          color={colors.DARK}>
          Welcome {userData?.userName}
        </SansText>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <AntDesign name="poweroff" size={20} color={'red'} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 15,
    borderBottomColor: colors.PRIMARY_LIGHT,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height:
      (Platform.OS === 'ios' ? 0.13 : 0.06) * Dimensions.get('screen').height,
  },
  logoutButton: {
    marginLeft: 'auto',
  },
});
