import React, {useContext, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaWrapper, FocusAwareStatusBar} from '../../components/Commons';
import {Fonts, colors} from '../../config';
import {RegisterModal} from '../../components/Modals/RegisterModal';
import {loginAPI} from '../../apis/Auth';
import {showMessage} from 'react-native-flash-message';
import SansText from '../../components/Commons/SansText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AuthContext} from '../../service/AuthService';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import IonIcon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const {setUserData, setUsers} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Please fill all the fields.');
      return;
    }
    let exp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!exp.test(formData.email)) {
      Alert.alert('Please provide a valid email address.');
      return;
    }

    loginAPI(formData)
      .then(res => {
        setUserData(res.user);
        setUsers(res.users);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Root'}],
          }),
        );
      })
      .catch(err => {
        showMessage({
          message: err.message || 'Something went wrong',
          description: err.description || 'Please try again later',
          type: 'danger',
          animated: true,
          duration: 5000,
        });
      });
  };

  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <KeyboardAwareScrollView
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
        }}
        extraHeight={120}
        enableOnAndroid>
        <View style={styles.container}>
          <SansText
            fontSize={26}
            fontFamily={Fonts.Montserrat_semibold}
            color={colors.PRIMARY}
            style={{
              marginBottom: 10,
            }}>
            Welcome Back
          </SansText>
          <SansText
            fontSize={18}
            fontFamily={Fonts.Montserrat_extra_light}
            style={{
              marginBottom: 35,
            }}>
            Please Login
          </SansText>
          <View style={{rowGap: 10}}>
            <SansText fontSize={16} fontFamily={Fonts.Nunito_regular}>
              Email Address
            </SansText>
            <TextInput
              style={styles.inputField}
              value={formData.email}
              onChangeText={t =>
                setFormData(prev => ({
                  ...prev,
                  email: t,
                }))
              }
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <SansText fontSize={16} fontFamily={Fonts.Nunito_regular}>
              Password
            </SansText>
            <TextInput
              style={styles.inputField}
              value={formData.password}
              onChangeText={t =>
                setFormData(prev => ({
                  ...prev,
                  password: t,
                }))
              }
              autoCapitalize="none"
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <SansText
              fontSize={18}
              color={colors.WHITE}
              textAlign={'center'}
              fontFamily={Fonts.Nunito_bold}>
              Login
            </SansText>
          </TouchableOpacity>

          <View style={styles.registerBtn}>
            <SansText
              fontSize={16}
              color={colors.DARK}
              textAlign={'center'}
              fontFamily={Fonts.Nunito_light}>
              New Here?
            </SansText>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <SansText
                fontSize={16}
                color={colors.DARK}
                textAlign={'center'}
                fontFamily={Fonts.Nunito_regular}>
                Sign Up
              </SansText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <RegisterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  registerBtn: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  headText: {
    fontSize: 28,
    fontFamily: Fonts.Montserrat_medium,
  },
  container: {
    backgroundColor: colors.WHITE,
    height: Dimensions.get('screen').height,
    padding: 20,
    justifyContent: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.GRAY,
    fontFamily: Fonts.Nunito_regular,
    fontSize: 16,
    height: 45,
    width: '100%',
    paddingHorizontal: 15,
  },
  btn: {
    marginTop: 20,
    backgroundColor: colors.PRIMARY,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    borderRadius: 10,
  },
});
