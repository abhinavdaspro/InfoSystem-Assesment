import React from 'react';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import {colors} from '../../config';

const HomeLoaderScreen = () => {
  return (
    <View
      style={{
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
      }}>
      <ActivityIndicator size={'large'} color={colors.PRIMARY} />
    </View>
  );
};

export default HomeLoaderScreen;
