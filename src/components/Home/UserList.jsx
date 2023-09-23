import React, {useContext} from 'react';
import SansText from '../Commons/SansText';
import {Fonts, colors} from '../../config';
import {AuthContext} from '../../service/AuthService';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {UpdateUsersAPI} from '../../apis/Users';
import {showMessage} from 'react-native-flash-message';

const UserList = () => {
  const {users, setUsers} = useContext(AuthContext);

  const updateUser = i => {
    let copyUsers = JSON.parse(JSON.stringify(users));
    copyUsers[i] = {
      ...copyUsers[i],
      role: copyUsers[i].role === 'SM' ? 'DM' : 'SM',
    };
    setUsers(copyUsers);

    UpdateUsersAPI(copyUsers)
      .then(res => {
        showMessage({
          message: res.message || 'Update Successful',
          description: res.description || 'All users updated successfully',
          type: 'success',
          animated: true,
          duration: 4000,
        });
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
      <SansText fontFamily={Fonts.Montserrat_medium} fontSize={18}>
        Users
      </SansText>
      <ScrollView
        contentContainerStyle={{
          marginTop: 20,
          rowGap: 15,
          paddingBottom: 20,
        }}>
        {users.length > 0 &&
          users.map((val, i) => {
            return (
              <TouchableOpacity
                style={styles.box}
                key={i}
                onPress={() => i !== 0 && updateUser(i)}>
                <View>
                  <Entypo name="user" size={50} color={colors.SECONDARY} />
                </View>
                <View style={{rowGap: 10}}>
                  <SansText
                    fontFamily={Fonts.Nunito_medium}
                    color={colors.PRIMARY}
                    fontSize={16}
                    textTransform={'capitalize'}>
                    {val.userName}
                  </SansText>
                  <SansText fontFamily={Fonts.Nunito_medium} fontSize={16}>
                    {val.email}
                  </SansText>
                  <View
                    style={[
                      styles.pill,
                      {
                        backgroundColor:
                          val.role === 'SM' ? colors.PRIMARY : colors.WHITE,
                        borderWidth: 1,
                        borderColor: colors.PRIMARY,
                      },
                    ]}>
                    <SansText
                      fontFamily={Fonts.Nunito_medium}
                      color={val.role === 'SM' ? colors.WHITE : colors.PRIMARY}
                      fontSize={12}>
                      {val.role === 'SM' ? 'Store Manager' : 'Product Manager'}
                    </SansText>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </>
  );
};

export default UserList;

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    padding: 15,
    borderRadius: 15,
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
  },
  pill: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});
