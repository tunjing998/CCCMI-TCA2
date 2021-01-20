import React, {Component} from 'react';
import {View, Text} from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import renderer from 'react-test-renderer';

test('DetailsScreen snapShot', () => {
  const snap = renderer.create(<DetailsScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
