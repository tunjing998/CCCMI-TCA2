import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useTheme} from '@react-navigation/native';
import {Text, View, Image, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';

const resultPage = ({navigation, route}) => {
  const {colors} = useTheme();
  const [river, setRiver] = useState()
  const [arduino, setArduino] = useState()
  const [selectedInsect, setSelectedInsect] = useState([])

  const handleFinish = () => {
    // clearData();
    navigation.navigate('Home')
  }

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('river');
      await AsyncStorage.removeItem('arduino');
      await AsyncStorage.removeItem('selected_insect');
      console.log('local storage data cleared')
    } catch (e) {
      console.error(e);
    }
  }

  const getRiverData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('river');
      return jsonValue != null ? setRiver(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getArduinoData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('arduino');
      return jsonValue != null ? setArduino(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const getSelectedInsectData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('selected_insect');
      return jsonValue != null ? setSelectedInsect(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  };

  const renderRiver = () => {
    return(
      <View>
        <Text>River</Text>
        <Text>{river.river_name}</Text>
        <Text>{river.latitude}</Text>
        <Text>{river.longitude}</Text>
        <Text>{river.river_catchments}</Text>
        <Text>{river.river_code}</Text>
        <Text>{river.local_authority}</Text>
        <Text>{river.transboundary}</Text>
      </View>
    )
  }

  const renderArduino = () => {
    return (
      <View>
        <Text>Arduino</Text>
        <Text>{arduino.arduino_id}</Text>
        <Text>{arduino.ph}</Text>
        <Text>{arduino.temp}</Text>
        <Text>{arduino.date_captured}</Text>
      </View>
    )
  }

  const renderSelectedInsect = () => {
    if (selectedInsect.length > 0) {
      console.log(selectedInsect);    //selected insect list
      let comp = [];
      comp.push(<Text style={{alignSelf: 'flex-start', fontSize: 20, fontWeight: 'bold'}}>Selected :</Text>)
      selectedInsect.map(item => {
        comp.push(
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.amount}
            </Text>
          </View>,
        );
      });

      return comp;
    }
  };

  useEffect(() => {
    getRiverData();
    getArduinoData();
    getSelectedInsectData();
  }, [])

  return (
  <View>
    <Text>Result Page</Text>
    {river && renderRiver()}
    {arduino && renderArduino()}
    {renderSelectedInsect()}

    <Button
        title="Finish"
        buttonStyle={{
          backgroundColor: 'lightgreen',
          marginTop: 30,
          borderRadius: 10,
          width: 100,
        }}
        titleStyle={{color: 'black'}}
        onPress={() => handleFinish()}
      />
  </View>
)};

export default resultPage;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
})