import React from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../context';
import {globalStyles} from '../styles/global';

export const ScreenContainer = ({children}) => (
  <View style={globalStyles.container}>{children}</View>
);

export const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Home Screen</Text>
      <Button
        title="Take new sample"
        onPress={() =>
          // send name param, later grab using route
          navigation.push('Details', {name: 'Take new Sample screen '})
        }
      />
      <Button
        title="View Sample"
        onPress={() => navigation.push('Details', {name: 'View Sample Screen'})}
      />

      <Button title="Drawer" onPress={() => navigation.toggleDrawer()} />
      <Button title="Sign Out" onPress={() => signOut()} color="red" />
    </ScreenContainer>
  );
};
