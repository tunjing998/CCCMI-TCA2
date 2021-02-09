import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import testVariables from '../appium_automation_testing/test_variables';
import LinearGradient from 'react-native-linear-gradient';

import GetLocation from 'react-native-get-location';
import {FlatList} from 'react-native-gesture-handler';

const riverURL = 'http://cccmi-aquality.tk/aquality_server/rivers/';

const SearchRiverScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    !isEnabled && getOneTimeLocation();
    setIsEnabled(previousState => !previousState);
  };
  const [locationStatus, setLocationStatus] = useState(undefined);
  const [searchInput, setSearchInput] = useState(undefined);
  const [textInput, setTextInput] = useState('');
  const [location, setLocation] = useState({
    latitude: undefined,
    longitude: undefined,
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    //get Location Permission, get location and set location
    if (isEnabled && locationStatus === undefined) {
      requestLocationPermission();
      setSearchInput(searchInput);
    }
  });

  /**
   * @function requestLocationPermission
   * @description request location permission
   * (location should be on in android settings)
   */
  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      setSearchInput(searchInput);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
          getOneTimeLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn('Error: ' + err);
      }
    }
  };

  /**
   * @function getOneTimeLocation
   * @description get current location once
   *
   */
  const getOneTimeLocation = () => {
    setLocationStatus('locationStatus');

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(position => {
        setLocationStatus('position');
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.latitude);

        //Setting Longitude state
        setLocation({latitude: currentLatitude, longitude: currentLongitude});
        setSearchInput(currentLatitude + ',' + currentLongitude);
      })
      .catch(error => {
        setLocationStatus({locationStatus: error.message});
      });
  };

  const renderResults = () => {
    let type = [];

    if (data.length > 0) {
      type.push(
        <Text style={{fontSize: 20, color: colors.text}}>Results:</Text>,
      );
      data.forEach(el => {
        type.push(
          <Button
            accessibilityLabel={testVariables.flatlistItem}
            testID={testVariables.flatlistItem}
            key={el.river_id}
            title={el.river_name.toString()}
            onPress={() =>
              navigation.navigate('SearchRiverScreen2', {data: el})
            }
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['#4c4cff', '#6666ff'],
              start: {x: 0, y: 0},
              end: {x: 0, y: 1.5},
            }}
            buttonStyle={{
              margin: 5,
              padding: 20,
              borderRadius: 20,
              width: 300,
            }}
          />,
        );
      });
    }
    return type;
  };

  const searchRiver = () => {
    let body = '';
    if (isEnabled) {
      body =
        '?latitude=' + location.latitude + '&longitude=' + location.longitude;
    } else {
      body = '?location=' + textInput;
    }
    fetch(riverURL + body)
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => alert(error));
  };

  /**
   *Styles
   */
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchSection: {
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
      marginTop: 30,
      paddingBottom: 35,
      color: colors.text,
    },
  });

  return (
    <View
      style={styles.container}
      accessibilityLabel={testVariables.searchRiverScreenContainer}
      testID={testVariables.searchRiverScreenContainer}>
      {/* <Text>SearchRiver Screen</Text> */}
      <Text h3 h3Style={styles.title}>
        Search and choose the river.
      </Text>

      <View style={styles.searchSection}>
        <Icon.Button
          accessibilityLabel={testVariables.searchRiverLocateIcon}
          testID={testVariables.searchRiverLocateIcon}
          style={styles.searchIcon}
          name={isEnabled ? 'crosshairs-gps' : 'crosshairs'}
          size={20}
          color="#000"
          backgroundColor="transparent"
          onPress={() => {
            toggleSwitch();
          }}
        />

        <TextInput
          accessibilityLabel={testVariables.searchRiverLocateInput}
          testID={testVariables.searchRiverLocateInput}
          style={styles.input}
          placeholder="Location name or Coordinates"
          underlineColorAndroid="transparent"
          value={isEnabled ? searchInput : textInput}
          onChangeText={text => setTextInput(text)}
        />
        <Icon.Button
          accessibilityLabel={testVariables.searchRiverSearchIcon}
          testID={testVariables.searchRiverSearchIcon}
          style={styles.searchIcon}
          name="magnify"
          backgroundColor="transparent"
          size={20}
          color="#000"
          onPress={() => searchRiver()}
        />
      </View>
      <ScrollView>{renderResults()}</ScrollView>
    </View>
  );
};

export default SearchRiverScreen;
