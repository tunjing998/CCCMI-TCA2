import 'react-native';
import React from 'react';
import RiverDetail from '../../components/RiverDetails';
import renderer from 'react-test-renderer';

describe.only('RiverDetail component test', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<RiverDetail />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
