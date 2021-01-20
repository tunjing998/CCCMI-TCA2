import React from 'react';
import renderer from 'react-test-renderer';
import SearchRiverScreen from '../screens/SearchRiverScreen';
import SearchRiverScreen2 from '../screens/SearchRiverScreen2';

import {NativeModules as RNNativeModules} from 'react-native';
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: {BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END'},
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};

test('SearchRiverScreen snapShot', () => {
  const snap = renderer.create(<SearchRiverScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});

test('SearchRiverScreen2 snapShot', () => {
  const snap = renderer.create(<SearchRiverScreen2 />).toJSON();
  expect(snap).toMatchSnapshot();
});
