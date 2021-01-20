import React, {Component} from 'react';
import {View, Text} from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import renderer from 'react-test-renderer';

test('Splash screen snapShot', () => {
  const snap = renderer.create(<SplashScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
