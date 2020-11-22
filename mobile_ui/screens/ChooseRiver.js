import React from 'react';
import {Text, Button} from 'react-native';
import {ScreenContainer} from '../styles/screenContainer';

export const ChooseRiverScreen = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Choose River Screen</Text>
      <Text>River ABC</Text>
      <Button
        title="Choose"
        onPress={() => navigation.push('RiverDetails', {name: 'River abc'})}
      />
    </ScreenContainer>
  );
};
