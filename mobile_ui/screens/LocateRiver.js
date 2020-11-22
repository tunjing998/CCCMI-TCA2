import React from 'react';
import {Text, Button} from 'react-native';
import {ScreenContainer} from '../styles/screenContainer';

export const LocateRiver = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Locate River Screen</Text>
      <Button
        title="select river"
        onPress={() => navigation.push('ChooseRiver')}
      />
    </ScreenContainer>
  );
};
