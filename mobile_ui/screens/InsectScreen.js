import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const InsectScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Insect Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default InsectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
