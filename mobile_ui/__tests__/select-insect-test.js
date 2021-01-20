import React from 'react';
import renderer from 'react-test-renderer';

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

test('selectInsect1 snapShot', () => {
  const snap = renderer.create(<selectInsect1 />).toJSON();
  expect(snap).toMatchSnapshot();
});

test('selectInsect2 snapShot', () => {
  const snap = renderer.create(<selectInsect2 />).toJSON();
  expect(snap).toMatchSnapshot();
});
