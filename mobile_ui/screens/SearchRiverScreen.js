import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchRiverScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [searchString, setSearchString] = useState(null);

  const handleSearch = () => {
    //pass data to search from api
  };

  return (
    <View style={styles.container}>
      <Text>SearchRiver Screen</Text>
      <Text>Locate and search river here.</Text>

      <View style={styles.searchSection}>
        {/* <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        /> */}

        <Icon.Button
          style={styles.searchIcon}
          name={isEnabled ? 'crosshairs' : 'crosshairs-gps'}
          size={20}
          color="#000"
          backgroundColor="transparent"
          onPress={() => {
            toggleSwitch(), console.log(isEnabled);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="River name or Coordinates"
          underlineColorAndroid="transparent"
          value={isEnabled ? null : '53.3541159578443, -6.355573949174074'}
          onChangeText={text => setSearchString(text)}
        />
        <Icon.Button
          style={styles.searchIcon}
          name="magnify"
          backgroundColor="transparent"
          size={20}
          color="#000"
        />
      </View>

      <Text>
        {/* Textinput to insert coordinate/river name, then search through api, then
        pass full details to the next screen (ChooseRiver.js) */}
        Search: {searchString}
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
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
