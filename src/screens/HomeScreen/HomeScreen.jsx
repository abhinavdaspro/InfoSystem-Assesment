import React, {useContext, useEffect, useState} from 'react';
import {FocusAwareStatusBar} from '../../components/Commons';
import {Fonts, colors} from '../../config';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {HeaderView} from '../../components/Commons/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import NavigationNames from '../../navigation/NavigationNames';
import Entypo from 'react-native-vector-icons/Entypo';
import SansText from '../../components/Commons/SansText';
import ProductList from '../../components/Home/ProductList';
import AddEditProducts from '../../components/Modals/AddEditProducts';
import {GetAllProduct} from '../../apis/Product';
import {AuthContext} from '../../service/AuthService';
export const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const {products, setProducts, setSingleProduct} = useContext(AuthContext);
  const [action, setAction] = useState('add');
  const [tempIndex, setTempIndex] = useState(0);

  const refetchProducts = () => {
    GetAllProduct()
      .then(res => {
        setProducts(res);
      })
      .catch(err => {
        console.error('fail fetch---');
        setProducts(err);
      });
  };

  const storeAndShow = (product, index) => {
    setAction('edit');
    setTempIndex(index);
    setSingleProduct(product);
    setModalVisible(true);
  };

  useEffect(() => {
    refetchProducts();
  }, []);
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <View style={styles.container}>
        <HeaderView />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}>
          <Entypo name="plus" size={25} color={colors.WHITE} />
        </TouchableOpacity>
        <View style={styles.content}>
          <SansText fontSize={18} fontFamily={Fonts.Montserrat_regular}>
            Products
          </SansText>
          <ProductList storeAndShow={storeAndShow} />
        </View>
      </View>
      <AddEditProducts
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={action}
        setAction={setAction}
        refetchProducts={refetchProducts}
        tempIndex={tempIndex}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.WHITE,
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flex: 1,
  },
  addBtn: {
    width: 60,
    height: 60,
    backgroundColor: colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 110 : 100,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 111,
  },
});
