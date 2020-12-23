import React, {Component} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {List} from 'react-native-paper';
import {BaseRouter} from '@react-navigation/native';

const InsectsData = require('./Insects.json');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   nonFromatData: ['Horse', 'Cat', 'Dog', 'Mouse'],
      data: InsectsData,
      selectedFruits: [],
      images: {
        Caenis: require('../assets/insects/caenis.jpg'),
        Ecdyonurus: require('../assets/insects/ecdyonurus.jpg'),
        EphemeraDanica: require('../assets/insects/Ephemera_Danica.jpg'),
        Heptagenia: require('../assets/insects/Heptagenia.jpg'),
        Rhithrogena: require('../assets/insects/Rhithrogena.jpg'),
        SerratellaIgnita: require('../assets/insects/Serratella_Ignita.jpg'),
      },
      route: this.props.route,
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
    let Selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        Selected.push(keys[i]);
      }
    }
    alert(Selected);
  }

  render() {
    // return (
    //   <View>
    //     <List.Accordion title="Group 1 - Mayflies">
    //       {this.renderInsects()}
    //     </List.Accordion>
    //     <List.Accordion title="Group 2 - Mayflies">
    //       {this.renderInsects()}
    //     </List.Accordion>
    //     <Button
    //       title="go"
    //       onPress={() => {
    //         this.getSelectedInsects();
    //       }}
    //     />
    //   </View>
    // );
    return (
      <View>
        <Text>{route.params.paramKey}</Text>
      </View>
    );
  }
}
