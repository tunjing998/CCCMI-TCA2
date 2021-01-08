import React, {useState} from 'react';
import {View, Picker, StyleSheet, Text, Image, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const selectInsect1 = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('0');

  const [insects, setInsects] = useState([
    {
      id: 1,
      name: 'Caenis',
      amount: '0',
      image: require('../assets/insects/caenis.jpg'),
    },
    {
      id: 2,
      name: 'Ecdyonurus',
      amount: '0',
      image: require('../assets/insects/ecdyonurus.jpg'),
    },
    {
      id: 3,
      name: 'Ephemera Danica',
      amount: '0',
      image: require('../assets/insects/Ephemera_Danica.jpg'),
    },
    {
      id: 4,
      name: 'Heptagenia',
      amount: '0',
      image: require('../assets/insects/Heptagenia.jpg'),
    },
    {
      id: 5,
      name: 'Hydropsychidae',
      amount: '0',
      image: require('../assets/insects/Hydropsychidae.jpg'),
    },
    {
      id: 6,
      name: 'Leptoceridae',
      amount: '0',
      image: require('../assets/insects/Leptoceridae.jpg'),
    },
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
          <Image source={insect.image} style={{width: 50, height: 50}} />
          <Text>{insect.name}</Text>
          <Picker
            mode="dropdown"
            selectedValue={insect.amount}
            style={{height: 50, width: 150}}
            onValueChange={itemValue =>
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

  return (
    <ScrollView>
      {renderInsects()}
      <Button
        title="next"
        onPress={() => navigation.navigate('selectInsect2', insects)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default selectInsect1;
