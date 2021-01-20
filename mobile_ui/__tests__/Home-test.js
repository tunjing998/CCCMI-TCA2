import React, {Component} from 'react';
import {View, Text} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import renderer from 'react-test-renderer';

test('Home screen snapShot', () => {
  const snap = renderer.create(<HomeScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
