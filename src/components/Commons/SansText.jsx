import React from 'react';
import {Text} from 'react-native';
import {Fonts, colors} from '../../config';

const SansText = ({
  children,
  fontSize,
  fontFamily,
  color,
  textAlign,
  fontStyle,
  textTransform,
  style,
}) => {
  return (
    <Text
      style={{
        fontSize: fontSize || 14,
        fontFamily: fontFamily || Fonts.Nunito_extra_light,
        textAlign: textAlign || 'left',
        fontStyle: fontStyle || 'normal',
        color: color || colors.DARK,
        textTransform: textTransform || 'none',
        ...style,
      }}>
      {children}
    </Text>
  );
};

export default SansText;
