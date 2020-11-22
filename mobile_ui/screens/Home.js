import React from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../context';
import {ScreenContainer} from '../styles/screenContainer';

export const Home = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <ScreenContainer>
      <Text>Home Screen</Text>

      {/* this should push to a new stack? */}
      <Button
        title="Take new sample"
        onPress={() =>
          // send name param, later grab using route cc
          navigation.push('LocateRiver')
        }
      />
      <Button
        title="View Sample"
        onPress={() =>
          navigation.push('ViewSample', {name: 'View Sample Screen'})
        }
      />

      {/* <Button title="Drawer" onPress={() => navigation.toggleDrawer()} /> */}
      <Button title="Sign Out" onPress={() => signOut()} color="red" />
    </ScreenContainer>
  );
};
