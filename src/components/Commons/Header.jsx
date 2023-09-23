import React from 'react';
import {FocusAwareStatusBar} from './FocusedStatusBar';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors} from '../../config';

export const HeaderView = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      {/* <View style={styles.view}></View> */}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    height:
      (Platform.OS === 'ios' ? 0.15 : 0.08) * Dimensions.get('screen').height,
  },
});
