import React, {Component} from 'react';
import {View, Text} from 'react-native';
import ArduinoScreen from '../screens/ArduinoScreen';
import ArduinoScreen2 from '../screens/ArduinoScreen2';
import renderer from 'react-test-renderer';

test('ArduinoScreen snapShot', () => {
  const snap = renderer.create(<ArduinoScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});

test('ArduinoScreen2 snapShot', () => {
  const snap = renderer.create(<ArduinoScreen2 />).toJSON();
  expect(snap).toMatchSnapshot();
});
