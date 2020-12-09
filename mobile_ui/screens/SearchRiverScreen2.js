import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const SearchRiverScreen2 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>SearchRiverScreen2</Text>
      <Text>Display chosen river details here ( FROM API )</Text>
      <Button
        title="Choose this river"
        onPress={() => navigation.navigate('MainTabScreen')}
      />
    </View>
  );
};

export default SearchRiverScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
