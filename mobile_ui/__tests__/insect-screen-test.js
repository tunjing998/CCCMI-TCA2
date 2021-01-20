import React from 'react';
import renderer from 'react-test-renderer';
import InsectScreen from '../screens/InsectScreen';

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

test('insect screen snapShot', () => {
  const snap = renderer.create(<InsectScreen />).toJSON();
  expect(snap).toMatchSnapshot();
});
