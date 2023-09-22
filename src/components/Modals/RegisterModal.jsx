import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Fonts, colors} from '../../config';
import {registerAPI} from '../../apis/Auth';
import {showMessage} from 'react-native-flash-message';
import SansText from '../Commons/SansText';

export const RegisterModal = ({modalVisible, setModalVisible}) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleRegister = () => {
    if (!formData.userName || !formData.email || !formData.password) {
      Alert.alert('Please fill all the fields.');
      return;
    }

    let exp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!exp.test(formData.email)) {
      Alert.alert('Please provide a valid email address.');
      return;
    }

    registerAPI(formData)
      .then(res => {
        /* HERE IS WHERE WE'RE GOING TO SHOW OUR FIRST MESSAGE */
        showMessage({
          message: res.message,
          description: res.description,
          type: 'success',
          animated: true,
          duration: 5000,
        });
        reset();
      })
      .catch(err => {
        reset();
        showMessage({
          message: err.message || 'Something went wrong',
          description: err.description || 'Please try again later',
          type: 'danger',
          animated: true,
          duration: 5000,
        });
      });
  };

  const reset = () => {
    setFormData({
      userName: '',
      email: '',
      password: '',
    });
    setModalVisible(false);
  };

  return (
    <Modal
      isVisible={modalVisible}
      swipeDirection={'down'}
      avoidKeyboard={true}
      animationInTiming={400}
      onSwipeComplete={reset}
      style={styles.modal}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.modalSwiper} />
          <SansText fontSize={16} fontFamily={Fonts.Nunito_regular}>
            Username
          </SansText>
          <TextInput
            style={styles.inputField}
            value={formData.userName}
            onChangeText={t =>
              setFormData(prev => ({
                ...prev,
                userName: t,
              }))
            }
            autoCapitalize="none"
            keyboardType="default"
          />
          <SansText fontSize={16} fontFamily={Fonts.Nunito_regular}>
            Email
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
          <TouchableOpacity style={styles.btn} onPress={handleRegister}>
            <SansText
              fontSize={18}
              color={colors.WHITE}
              textAlign={'center'}
              fontFamily={Fonts.Nunito_bold}>
              Sign Up
            </SansText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('screen').width,
    padding: 0,
    margin: 0,
  },
  container: {
    backgroundColor: colors.WHITE,
    height: 'auto',
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 0.05 * Dimensions.get('screen').height,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    rowGap: 10,
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
  modalSwiper: {
    backgroundColor: colors.GRAY,
    width: 45,
    height: 5,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
