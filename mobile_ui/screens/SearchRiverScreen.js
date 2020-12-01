import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const SearchRiverScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>LocateRiver Screen</Text>
      <Text>Locate and search river here.</Text>
      <Text>
        Textinput to insert coordinate/river name, then search through api, then
        pass full details to the next screen (ChooseRiver.js)
      </Text>
      <Button
        title="Stream Liffey"
        onPress={() => navigation.navigate('SearchRiverScreen2')}
      />
      <Button title="River Bryan" />
    </View>
  );
};

export default SearchRiverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
