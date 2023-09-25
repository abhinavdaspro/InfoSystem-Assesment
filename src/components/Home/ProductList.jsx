import React, {useContext, useEffect} from 'react';
import SansText from '../Commons/SansText';
import {AuthContext} from '../../service/AuthService';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Fonts, colors} from '../../config';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductList = ({storeAndShow}) => {
  const {products, setProducts, userData} = useContext(AuthContext);

  const renderItem = (val, i) => {
    return (
      <TouchableOpacity
        style={styles.box}
        key={i}
        onPress={() => storeAndShow(val, i)}>
        <View>
          <Entypo name="archive" size={50} color={colors.SECONDARY} />
        </View>
        <View style={{rowGap: 5}}>
          <View style={{flexDirection: 'row', columnGap: 15}}>
            <SansText
              fontFamily={Fonts.Nunito_medium}
              color={colors.PRIMARY}
              fontSize={16}
              textTransform={'capitalize'}>
              {val.name}
            </SansText>
            <View style={styles.pill}>
              <SansText
                fontFamily={Fonts.Nunito_medium}
                color={colors.WHITE}
                fontSize={12}>
                {val.quantity}
              </SansText>
            </View>
          </View>

          <SansText fontFamily={Fonts.Nunito_light}>
            MRP: <SansText fontFamily={Fonts.Nunito_medium}>{val.mrp}</SansText>
          </SansText>
          <SansText fontFamily={Fonts.Nunito_light}>
            Vendor:{' '}
            <SansText fontFamily={Fonts.Nunito_medium}>{val.vendor}</SansText>
          </SansText>
          <SansText fontFamily={Fonts.Nunito_light}>
            Batch:{' '}
            <SansText fontFamily={Fonts.Nunito_medium}>{val.batchNo}</SansText>
          </SansText>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 10,
              alignItems: 'center',
            }}>
            <SansText fontFamily={Fonts.Nunito_light}>Status:</SansText>
            <View
              style={[
                styles.pill,
                {
                  backgroundColor:
                    val.status === 'approved' ? colors.GREEN : colors.ORANGE,
                },
              ]}>
              <SansText
                fontFamily={Fonts.Nunito_medium}
                color={colors.WHITE}
                fontSize={12}
                textTransform={'capitalize'}>
                {val.status}
              </SansText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        marginTop: 10,
        rowGap: 15,
        paddingBottom:
          Platform.OS === 'ios' ? 120 : 0.2 * Dimensions.get('screen').height,
      }}>
      {products &&
        products.length > 0 &&
        products.map((val, i) => {
          return userData.role === 'SM'
            ? renderItem(val, i)
            : val.status === 'approved' && renderItem(val, i);
        })}

      {(!products || products.length === 0) && (
        <SansText
          fontFamily={Fonts.Nunito_regular}
          color={colors.GRAY}
          fontSize={16}>
          No Products Added
        </SansText>
      )}
    </ScrollView>
  );
};

export default ProductList;

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
    backgroundColor: colors.SECONDARY,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
});
