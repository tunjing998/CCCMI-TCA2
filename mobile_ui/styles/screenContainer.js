import React from 'react';
import {View} from 'react-native';
import globalStyles from '../styles/global';

export const ScreenContainer = ({children}) => (
  <View style={globalStyles.container}>{children}</View>
);
