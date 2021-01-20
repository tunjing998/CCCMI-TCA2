import React, {Component} from 'react';
import {View, Text} from 'react-native';
import fetchApi from '../screens/fetchApi';
import renderer from 'react-test-renderer';

test('fetchApi snapShot', () => {
  const snap = renderer.create(<fetchApi />).toJSON();
  expect(snap).toMatchSnapshot();
});
