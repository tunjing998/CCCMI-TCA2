import React, {useState} from 'react';
import {View, Picker, StyleSheet, Text} from 'react-native';

const test02 = () => {
  const [selectedValue, setSelectedValue] = useState('0');

  // const insects = [
  //   {name: 'caenis', amount: '0'},
  //   {name: 'endyco', amount: '0'},
  //   {name: 'cicak', amount: '0'},
  //   {name: 'bug', amount: '0'},
  // ];

  const [insects, setInsects] = useState([
    {id: 1, name: 'caenis', amount: '0'},
    {id: 2, name: 'endyco', amount: '0'},
    {id: 3, name: 'cicak', amount: '0'},
    {id: 4, name: 'bug', amount: '0'},
  ]);

  const updateInsect = (index, amount) => {
    const elementsIndex = insects.findIndex(element => element.id == index);
    let newArray = [...insects];
    newArray[elementsIndex] = {...newArray[elementsIndex], amount: amount};

    setInsects(newArray);
  };

  const renderInsects = () => {
    return insects.map((insect, index) => {
      return (
        <View key={index} style={styles.container}>
          <Text>{insect.name}</Text>
          <Picker
            mode="dropdown"
            selectedValue={insect.amount}
            style={{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              // setSelectedValue(itemValue)
              updateInsect(insect.id, itemValue)
            }>
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1-99" value="1-99" />
            <Picker.Item label="100-1000" value="100-1000" />
            <Picker.Item label=">1000" value=">1000" />
          </Picker>
        </View>
      );
    });
  };

  return <View style={styles.container}>{renderInsects()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

export default test02;
