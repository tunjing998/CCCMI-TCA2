import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '@react-navigation/native';
const SearchRiverScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [searchString, setSearchString] = useState(null);

  const handleSearch = () => {
    console.log('search button pressed');
  };

  const {colors} = useTheme();
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
      marginBottom: 30,
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
      borderBottomColor: colors.text,
      borderBottomWidth: 1,
    },
    buttonText: {
      fontSize: 20,
    },
    buttonContainer: {
      width: '80%',
      marginVertical: 10,
    },
    title: {
      paddingBottom: 70,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      {/* <Text>SearchRiver Screen</Text> */}
      <Text h3 h3Style={styles.title}>
        Search and choose the river.
      </Text>

      <View style={styles.searchSection}>
        <Icon.Button
          style={styles.searchIcon}
          name={isEnabled ? 'crosshairs' : 'crosshairs-gps'}
          size={20}
          color="#000"
          backgroundColor="transparent"
          onPress={() => {
            toggleSwitch();
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
          onPress={() => handleSearch()}
        />
      </View>

      <Text h4 h4Style={{color: colors.text}}>
        Results found:
      </Text>
      <Button
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#264653', '#2a9d8f'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        title="Stream Liffey"
        onPress={() => navigation.navigate('SearchRiverScreen2')}
        titleStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
      />
      <Button
        ViewComponent={LinearGradient} // Don't forget this!
        linearGradientProps={{
          colors: ['#264653', '#2a9d8f'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        title="River Bryan"
        titleStyle={styles.buttonText}
        containerStyle={styles.buttonContainer}
      />

      {/* <Button
        title="fetch rivers from api"
        onPress={() => navigation.navigate('fetchApi')}
      /> */}
    </View>
  );
};

export default SearchRiverScreen;
