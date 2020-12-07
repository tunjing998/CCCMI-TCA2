import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const InsectScreen = () => {
  const {colors} = useTheme();
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Insect Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default InsectScreen;
