import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const ArduinoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Arduino Screen</Text>
      <Button title="Click Here" onPress={() => alert('Button Clicked!')} />
    </View>
  );
};

export default ArduinoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
