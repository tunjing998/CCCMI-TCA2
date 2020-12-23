import React, {Component} from 'react';
import {View, Text} from 'react-native';

class test3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderInsects() {
    return this.props.route.params.list.map((item, key) => {
      return (
        <View>
          <Text>{item}</Text>
        </View>
      );
    });
  }

  render() {
    return <View>{this.renderInsects()}</View>;
  }
}

export default test3;
