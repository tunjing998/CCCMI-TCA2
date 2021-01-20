import React, {Component} from 'react';
import {View, Text} from 'react-native';
import BookmarkScreen from '../screens/BookmarkScreen';
import renderer from 'react-test-renderer';

test('Splash screen snapShot', () => {
  const snap = renderer.create(<BookmarkScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
