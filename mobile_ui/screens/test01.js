import React, {Component, useState} from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';

class test01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'java',
    };
  }

  render() {
    return (
      <View>
        <Picker
          mode="dropdown"
          selectedValue={this.state.language}
          style={{height: 50, width: '100%'}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({language: itemValue})
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
      </View>
    );
  }
}

export default test01;
