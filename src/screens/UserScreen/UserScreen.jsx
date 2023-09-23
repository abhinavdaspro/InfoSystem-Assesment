import React from 'react';
import {FocusAwareStatusBar} from '../../components/Commons';
import {Dimensions, StyleSheet, View} from 'react-native';
import {HeaderView} from '../../components/Commons/Header';
import {colors} from '../../config';

export const UserScreen = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <View style={styles.container}>
        <HeaderView />
      </View>
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
});
