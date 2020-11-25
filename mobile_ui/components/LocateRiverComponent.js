import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Button,
  Dimensions,
  TextInput,
} from 'react-native';

import GetLocation from 'react-native-get-location';
export default class LocateTest extends Component {
  constructor() {
    super();

    this.state = {
      location: {latitude: null, longitude: null},
      error: null,
      searchInput: '',
      openMap: false,
      region: '',
      locationStatus: '',
    };
    this.textInputContent = React.createRef();
  }

  /**
   *life cycle
   *
   * @memberof LocateTest
   */
  componentDidMount = async () => (
    () => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          this.getOneTimeLocation();
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
              this.getOneTimeLocation();
            } else {
              this.setState({locationStatus: 'Permission Denied'});
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
      return () => {
        Geolocation.clearWatch(watchID);
      };
    },
    []
  );

  /**
   *life cycle
   *
   * @memberof LocateTest
   */
  componentDidUpdate = async () => (
    () => {
      const requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
          this.getOneTimeLocation();
          this.subscribeLocationLocation();
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
              this.getOneTimeLocation();
              this.subscribeLocationLocation();
            } else {
              this.setState({locationStatus: 'Permission Denied'});
            }
          } catch (err) {
            console.warn(err);
          }
        }
      };
      requestLocationPermission();
      return () => {
        Geolocation.clearWatch(watchID);
      };
    },
    []
  );

  /**
   *get time location once
   *
   * @memberof LocateTest
   */
  getOneTimeLocation = () => {
    console.log('getOneTimeLocation called');
    this.setState({locationStatus: 'Getting Location ...'});
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((position) => {
        this.setState({locationStatus: 'You are Here'});

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.latitude);

        //Setting Longitude state
        this.setState({
          location: {latitude: currentLatitude, longitude: currentLongitude},
        });
      })
      .catch((error) => {
        this.setState({locationStatus: error.message});
      });
  };

  /**
   *
   * getInput from TextInput
   * @param {*} input text
   * @memberof LocateTest
   */
  getInput(text) {
    this.setState({...this.state, searchInput: text});
  }

  /**
   *Search River
   *
   * @memberof LocateTest
   */
  searchRiver() {
    alert(this.state.searchInput);
  }

  /**
   *render input value
   *
   * @return {*}
   * @memberof LocateTest
   */
  renderInput() {
    let width = Dimensions.get('window').width - 20;
    return (
      <>
        <TextInput
          placeholder="E.g.  Liffey or 74.168462, 45.9812645"
          placeholderTextColor="#FFFFFF"
          width={width}
          style={[styles.localInput]}
          onChangeText={(text) => this.getInput(text)}
          value={
            this.state.location.latitude &&
            this.state.location.longitude &&
            this.state.location.latitude + ',' + this.state.location.longitude
          }></TextInput>
      </>
    );
  }

  /**
   *render content
   *
   * @return {*}
   * @memberof LocateTest
   */
  render() {
    return (
      <>
        <SafeAreaView style={{flex: 1, backgroundColor: '#1B262C'}}>
          <View style={styles.container}>
            <Text style={[styles.fonts, styles.titleOne]}>First Step...</Text>
            <Text style={[styles.fonts, styles.titleTwo]}>
              Locate the river
            </Text>
          </View>

          <View style={{alignItems: 'center'}}>{this.renderInput()}</View>
          <Text style={styles.textRemind}>River name or Coordinates</Text>
          <View style={{marginTop: 50}}>
            <Button
              title="search"
              color="green"
              onPress={() => this.searchRiver()}></Button>
            <Button
              title="Locate"
              onPress={() => this.getOneTimeLocation()}></Button>
          </View>
          <View>
            <Text style={styles.fonts}>{this.state.locationStatus}</Text>
            <Text style={styles.fonts}>
              Longitude: {this.state.location.longitude}
            </Text>
            <Text style={styles.fonts}>
              Latitude: {this.state.location.latitude}
            </Text>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

/**
 * styles
 * @type {*}
 * */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 25,
    marginVertical: 16,
  },
  fonts: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  container: {
    marginTop: 100,
    paddingLeft: 50,
  },
  titleOne: {
    fontWeight: 'bold',
  },
  titleTwo: {
    paddingLeft: 50,
    marginTop: 50,
  },
  textRemind: {
    marginTop: 5,
    paddingLeft: 30,
    color: '#FFFFFF',
  },
  localInput: {
    marginTop: 50,
    borderWidth: 1,
    height: 40,
    borderColor: '#95989A',
    borderRadius: 5,
    fontSize: 15,
    color: '#FFFFFF',
    paddingLeft: 10,
  },
});
