import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});
const AuthProvider = ({children}) => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [userData, setUserData] = useState({});

  const getAuthState = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem('token')
        .then(res => {
          if (res) {
            console.log('token---', res);
            setLoggedInUser(true);
            setUserData(JSON.parse(res));
            resolve(true);
          } else {
            setLoggedInUser(false);
            setUserData({});
            reject(true);
          }
        })
        .catch(err => {
          console.log('Auth catch block-----', err);
          setLoggedInUser(false);
          setUserData({});
          reject(true);
        });
    });
  };
  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        userData,
        setUserData,
        getAuthState,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
