import {Dimensions, Platform, ScrollView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export const ScrollWrapper = props => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.centeredView,
          {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
        ]}>
        {props.children}
      </KeyboardAwareScrollView>
    );
  } else {
    return <ScrollView>{props.children}</ScrollView>;
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height,
  },
});
