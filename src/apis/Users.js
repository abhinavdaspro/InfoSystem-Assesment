import AsyncStorage from '@react-native-async-storage/async-storage';

export const UpdateUsersAPI = users => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('users', JSON.stringify(users))
      .then(res => {
        resolve({
          message: 'Update Successful',
          description: 'Users are updated with new data.',
        });
      })
      .catch(err => {
        // console.error('update error---');
        reject({
          message: 'Something went wrong.',
          description: 'Please try again later.',
        });
      });
  });
};
