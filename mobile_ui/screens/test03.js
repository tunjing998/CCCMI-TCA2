import React from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const test03 = ({route}) => {
  const insects = route.params;

  const renderInsects = () => {
    return insects.map((insect, index) => {
      if (insect.amount != '0') {
        return (
          <View key={index} style={styles.container}>
            <Image source={insect.image} style={{width: 50, height: 50}} />
            <Text>{insect.name}</Text>
            <Text>{insect.amount}</Text>
          </View>
        );
      }
    });
  };

  // TEST ASYNC STORAGE
  const saveData = () => {
    let obj = [
      {
        name: 'John Doe',
        age: 5,
        city: 'Stockholm',
      },
      {
        name: 'Jane Doe',
        age: 10,
        city: 'Tokyo',
      },
    ];
    AsyncStorage.setItem('user', JSON.stringify(obj));
  };
  const displayData = async () => {
    try {
      let user = await AsyncStorage.getItem('user');
      let parse = JSON.parse(user);
      alert(parse[1].city);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ScrollView>
      {renderInsects()}
      <TouchableOpacity onPress={saveData()}>
        <Text>Click me to save </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => displayData()}>
        <Text>Click me to display </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default test03;
