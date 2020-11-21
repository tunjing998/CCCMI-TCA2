import React from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../context';
import {ScreenContainer} from '../styles/screenContainer';

export const SignIn = ({navigation}) => {
  const {signIn} = React.useContext(AuthContext);

  return (
    <ScreenContainer>
      <Text>Sign In Screen</Text>
      <Button title="Sign In" onPress={() => signIn()} />
      <Button
        title="Create Account"
        onPress={() => navigation.push('CreateAccount')}
      />
    </ScreenContainer>
  );
};
