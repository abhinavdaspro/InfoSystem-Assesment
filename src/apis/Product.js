import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddProductAPI = data => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('products')
      .then(res => {
        if (!res) {
          AsyncStorage.setItem('products', JSON.stringify([data]));
          resolve({
            message:
              data.status === 'approved'
                ? 'Save Successful'
                : 'Sent for Approval',
            description: 'Product added successfully',
          });
        } else {
          AsyncStorage.setItem(
            'products',
            JSON.stringify([...JSON.parse(res), data]),
          );
          resolve({
            message:
              data.status === 'approved'
                ? 'Save Successful'
                : 'Sent for Approval',
            description: 'Product added successfully',
          });
        }
      })
      .catch(err => {
        reject({
          message: 'Something went wrong.',
          description: 'Please try again later.',
        });
      });
  });
};

export const GetAllProduct = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('products')
      .then(res => {
        if (res) {
          resolve(JSON.parse(res));
        } else {
          resolve([]);
        }
      })
      .catch(err => {
        // console.log('err in  products----');
        reject([]);
      });
  });
};

export const UpdateProductAPI = products => {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem('products', JSON.stringify(products))
      .then(res => {
        resolve({
          message: 'Update Successful',
          description: 'Product is updated with new info.',
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
