import React from 'react';
import {Text, Button} from 'react-native';
import {ScreenContainer} from '../styles/screenContainer';

export const Profile = ({navigation}) => {
  return (
    <ScreenContainer>
      <Text>Profile Screen</Text>
      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
    </ScreenContainer>
  );
};
