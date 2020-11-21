import React from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../context';
import {ScreenContainer} from '../styles/screenContainer';

export const CreateAccount = () => {
  const {signUp} = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Create Account Screen</Text>
      <Button title="Sign Up" onPress={() => signUp()} />
    </ScreenContainer>
  );
};
