import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginAPI = async data => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('users')
      .then(res => {
        let users = JSON.parse(res);
        if (!users) {
          console.error('get fail');
          reject({
            message: 'Please Register.',
            description: 'Please register first to use this app.',
          });
          return;
        }

        console.log('users---', users);

        let foundUser = users.find(val => val.email === data.email);
        if (!foundUser) {
          console.error('wrong credential');

          reject({
            message: 'Please Register.',
            description: 'Please register first to use this app.',
          });
        }

        if (foundUser.password === data.password) {
          AsyncStorage.setItem(
            'token',
            JSON.stringify(`${foundUser.email}-${new Date().getTime()}`),
          );
          resolve(foundUser);
        } else {
          reject({
            message: 'Wrong Credentials',
            description: 'Provided credentials are not matching to any user.',
          });
        }
      })
      .catch(err => {
        console.error('error from async storage----', err);
        reject({
          message: 'Something went wrong',
          description: 'Please try again later.',
        });
      });
  });
};

export const registerAPI = data => {
  return new Promise((resolve, reject) => {
    let userData = {
      ...data,
      role: ['SM'],
    };
    // role--- ['SM','DM']

    AsyncStorage.getItem('users')
      .then(res => {
        let users = JSON.parse(res);

        if (!users) {
          AsyncStorage.setItem('users', JSON.stringify([userData]));
          resolve({
            message: 'Registration Successful',
            description: 'A new user has been registered successfully.',
          });
        }

        console.log('users----', users);
        if (users) {
          if (users.find(val => val.email === userData.email)) {
            reject({
              message: 'Registration Failed',
              description: 'This Email has been registered already.',
            });
          }
          AsyncStorage.setItem('users', JSON.stringify([...users, userData]));
          resolve({
            message: 'Registration Successful',
            description: 'A new user has been registered successfully.',
          });
        } else {
          AsyncStorage.setItem('users', JSON.stringify([userData]));
          resolve({
            message: 'Registration Successful',
            description: 'A new user has been registered successfully.',
          });
        }
      })
      .catch(err => {
        console.error('error from async storage in register----', err);
        reject({
          message: 'Something went wrong',
          description: 'Please try again later.',
        });
      });
  });
};
