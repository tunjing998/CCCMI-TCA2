import React from 'react';
import {Text, Button, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {ScreenContainer} from '../styles/screenContainer';
import RiverDetails from '../components/RiverDetails';

export const ChooseRiverScreen = ({navigation}) => {
  return (
    <ScreenContainer>
      <RiverDetails />
      <Text>Choose River Screen</Text>
      <Text>River ABC</Text>
      <Button
        title="Choose"
        onPress={() => navigation.push('RiverDetails', {name: 'River abc'})}
      />
    </ScreenContainer>
  );
};
