import React, {useContext, useEffect, useState} from 'react';
import SansText from '../Commons/SansText';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Fonts, colors} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../service/AuthService';
import {AddProductAPI, UpdateProductAPI} from '../../apis/Product';
import {showMessage} from 'react-native-flash-message';

const AddEditProducts = ({
  modalVisible,
  setModalVisible,
  action,
  setAction,
  refetchProducts,
  tempIndex,
}) => {
  const {userData, singleProduct, products} = useContext(AuthContext);
  const [product, setProduct] = useState({
    name: '',
    vendor: '',
    mrp: '',
    batchNo: '',
    batchDate: '',
    quantity: '',
  });

  useEffect(() => {
    if (action === 'edit') {
      setProduct({
        ...singleProduct,
      });
    }
  }, [action]);

  const reset = () => {
    setProduct({
      name: '',
      vendor: '',
      mrp: '',
      batchNo: '',
      batchDate: '',
      quantity: '',
    });
    setAction('add');
    setModalVisible(false);
  };

  const handleSave = () => {
    if (
      !product.name ||
      !product.vendor ||
      !product.mrp ||
      !product.batchNo ||
      !product.batchDate ||
      !product.quantity
    ) {
      Alert.alert('Please add all fields.');
      return;
    }

    let productData = {
      ...product,
      productId: (Math.floor(Math.random() * 900000) + 100000).toString(),
    };

    if (action === 'add') {
      productData.status = userData.role === 'SM' ? 'approved' : 'pending';
      AddProductAPI(productData)
        .then(res => {
          showMessage({
            message: res.message || 'Add Successful',
            description: res.description || 'Product added successfully',
            type: 'success',
            animated: true,
            duration: 4000,
          });
          refetchProducts();
          reset();
        })
        .catch(err => {
          showMessage({
            message: err.message || 'Something went wrong',
            description: err.description || 'Please try again later',
            type: 'danger',
            animated: true,
            duration: 5000,
          });
          reset();
        });
    }

    if (action === 'edit') {
      let newProducts = JSON.parse(JSON.stringify(products));
      newProducts[tempIndex] = {...product};

      UpdateProductAPI(newProducts)
        .then(res => {
          showMessage({
            message: res.message || 'Add Successful',
            description: res.description || 'Product added successfully',
            type: 'success',
            animated: true,
            duration: 4000,
          });
          refetchProducts();
          reset();
        })
        .catch(err => {
          showMessage({
            message: err.message || 'Something went wrong',
            description: err.description || 'Please try again later',
            type: 'danger',
            animated: true,
            duration: 5000,
          });
          reset();
        });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={reset}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.centeredView,
          {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
        ]}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.head}>
              <View>
                <SansText
                  fontFamily={Fonts.Montserrat_medium}
                  color={colors.PRIMARY}
                  fontSize={16}
                  textTransform={'capitalize'}>
                  {action} Product
                </SansText>
              </View>
              <View>
                <TouchableOpacity onPress={reset}>
                  <AntDesign
                    name="closecircle"
                    size={24}
                    color={colors.PRIMARY}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{rowGap: 10, marginVertical: 20}}>
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                Name
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.name}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    name: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="default"
              />
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                Vendor
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.vendor}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    vendor: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="default"
              />
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                MRP
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.mrp}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    mrp: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="number-pad"
              />
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                Branch Number
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.batchNo}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    batchNo: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="number-pad"
              />
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                Batch Date
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.batchDate}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    batchDate: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="default"
              />
              <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                Quantity
              </SansText>
              <TextInput
                style={styles.inputField}
                value={product.quantity}
                onChangeText={t =>
                  setProduct(prev => ({
                    ...prev,
                    quantity: t,
                  }))
                }
                autoCapitalize="none"
                keyboardType="number-pad"
              />
              {userData.role === 'SM' && action === 'edit' && (
                <>
                  <SansText fontSize={14} fontFamily={Fonts.Nunito_regular}>
                    Status
                  </SansText>
                  <TouchableOpacity
                    onPress={() => {
                      setProduct(prev => ({
                        ...prev,
                        status:
                          product.status === 'pending' ? 'approved' : 'pending',
                      }));
                    }}
                    style={[
                      styles.pill,
                      {
                        backgroundColor:
                          product.status === 'approved'
                            ? colors.GREEN
                            : colors.ORANGE,
                      },
                    ]}>
                    <SansText
                      fontFamily={Fonts.Nunito_medium}
                      color={colors.WHITE}
                      fontSize={12}
                      textTransform={'capitalize'}>
                      {product.status}
                    </SansText>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleSave}>
              <SansText
                fontSize={16}
                color={colors.WHITE}
                textAlign={'center'}
                fontFamily={Fonts.Montserrat_medium}>
                {action === 'add' ? 'Save' : 'Update'}
              </SansText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};

export default AddEditProducts;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
  },
  modalView: {
    width: 0.9 * Dimensions.get('screen').width,
    // margin: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.GRAY,
    fontFamily: Fonts.Nunito_regular,
    fontSize: 14,
    height: 45,
    width: '100%',
    paddingHorizontal: 15,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    // marginTop: 20,
    backgroundColor: colors.PRIMARY,
    width: '100%',
    height: 45,
    justifyContent: 'center',
    borderRadius: 10,
  },
  pill: {
    backgroundColor: colors.SECONDARY,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
