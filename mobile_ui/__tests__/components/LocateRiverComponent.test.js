import 'react-native';
import React from 'react';
import LocateRiverComponent from '../../components/LocateRiverComponent';
import renderer from 'react-test-renderer';

let findElement = function (tree, element) {
  let result = undefined;
  for (node in tree.children) {
    if (tree.children[node].props.testId == element) {
      result = true;
    }
  }
  return result;
};
describe.only('Locate river component test', () => {
  test('should render locateRiverComponent', () => {
    const component = renderer.create(<LocateRiverComponent />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('should check default state test', () => {
    const component = renderer.create(<LocateRiverComponent />).getInstance();
    expect(component.state.error).toEqual(null);
    const location = {latitude: null, longitude: null};
    expect(component.state.location).toEqual(location);
    expect(component.state.searchInput).toEqual('');
    expect(component.state.locationStatus).toEqual('');
  });

  test('should get textInput input value', () => {
    const component = renderer.create(<LocateRiverComponent />).getInstance();
    component.getInput('this is a test text');
    expect(component.state.searchInput).toEqual('this is a test text');
  });

  test('should search input function', () => {
    const component = renderer.create(<LocateRiverComponent />).getInstance();
    component.searchInput = 'this is a test text';
  });

  test('should search input function', () => {
    const component = renderer.create(<LocateRiverComponent />).getInstance();
    component.searchInput = 'this is a test text';
  });

  test('should find user text input element', () => {
    const component = renderer.create(<LocateRiverComponent />).toJSON();
    expect(findElement(component, 'userTestInput')).toBeDefined;
  });
});
