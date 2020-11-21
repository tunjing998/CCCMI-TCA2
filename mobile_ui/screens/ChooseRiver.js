import React from 'react';
import {Text, Button} from 'react-native';
import {ScreenContainer} from '../styles/screenContainer';

export const ChooseRiverScreen = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Choose River Screen</Text>
      <Button
        title="Choose"
        onPress={() =>
          // send name param, later grab using route cc
          navigation.navigate('BottomTabs', {
            screen: 'River Details',
          })
        }
      />
    </ScreenContainer>
  );
};
