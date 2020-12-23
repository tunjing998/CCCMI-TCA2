import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {List} from 'react-native-paper';

const InsectsData = require('./Insects.json');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nonFromatData: ['Horse', 'Cat', 'Dog', 'Mouse'],
      data: InsectsData,
      selectedInsects: [],
      images: {
        Caenis: require('../assets/insects/caenis.jpg'),
        Ecdyonurus: require('../assets/insects/ecdyonurus.jpg'),
        EphemeraDanica: require('../assets/insects/Ephemera_Danica.jpg'),
        Heptagenia: require('../assets/insects/Heptagenia.jpg'),
        Rhithrogena: require('../assets/insects/Rhithrogena.jpg'),
        SerratellaIgnita: require('../assets/insects/Serratella_Ignita.jpg'),
      },
    };
  }
  onchecked(id) {
    const data = this.state.data;
    const index = data.findIndex(x => x.id === id);
    data[index].checked = !data[index].checked;
    this.setState(data);
  }

  renderInsects() {
    return this.state.data.map((item, key) => {
      const {images} = this.state;
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          key={key}
          onPress={() => {
            this.onchecked(item.id);
          }}>
          <Image source={images[item.key]} style={{width: 70, height: 70}} />
          <Text style={{fontWeight: 'bold'}}>{item.key}</Text>
          {/* 普通的 checkbox */}
          <CheckBox
            value={item.checked}
            onValueChange={() => {
              this.onchecked(item.id);
              // if (item.checked) {
              //   console.log(item.key);
              // }
            }}
          />
        </TouchableOpacity>
      );
    });
  }

  getSelectedInsects() {
    var keys = this.state.data.map(t => t.key);
    var checks = this.state.data.map(t => t.checked);
    const {navigate} = this.props.navigation;
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i]);
        this.state.selectedInsects.push(keys[i]);
      }
    }
    alert(Selected);
    // navigate('test3', {
    //   list: this.state.selectedInsects,
    // });
    this.props.navigation.navigate('test3', {
      list: this.state.selectedInsects,
    });
  }

  render() {
    return (
      <View>
        {/* <Text>Group 1 - Mayflies</Text> */}
        {this.renderInsects()}
        <Button
          title="go"
          onPress={() => {
            this.getSelectedInsects();
          }}
        />
      </View>
    );
  }
}
