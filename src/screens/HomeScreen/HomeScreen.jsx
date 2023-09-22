import React from 'react';
import {FocusAwareStatusBar} from '../../components/Commons';
import {colors} from '../../config';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {HeaderView} from '../../components/Commons/Header';

export const HomeScreen = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor={colors.WHITE}
      />
      <View style={styles.container}>
        <HeaderView />
        <Text>Welcome User</Text>
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
});
