import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {Button} from 'react-native-elements';
import testVariables from '../appium_automation_testing/test_variables';

const ArduinoScreen2 = () => {
  const {colors} = useTheme();
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.arduinoConnectScreenContainer}
      testID={testVariables.arduinoConnectScreenContainer}>
      <Text>asd</Text>
    </View>
  );
};

export default ArduinoScreen2;
