import React, {useState} from 'react';
import {View, Picker, StyleSheet, Text, Image, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';

const selectInsect1 = ({navigation}) => {
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

  // const update = (amount, index) => {
  //   let newInsects = [...insects];
  //   newInsects[index] = {...newInsects[index], amount: amount};
  //   setInsects({newInsects});
  // };

  const handleSubmit = () => {
    console.log(insects);
  };

  const renderInsects = () => {
    return insects.map((insect, index) => {
      return (
        <View key={index} style={styles.container}>
          <View style={styles.insectContainer}>
            <Image source={insect.image} style={styles.insectImage} />
            <Text style={styles.insectName}>{insect.name}</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              style={styles.amountInput}
              placeholder="amount"
              // onTextInput={amount => update(amount, index)}
              // keyboardType="numeric"
            />
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      {renderInsects()}
      <Button
        title="next"
        onPress={() => handleSubmit()}

        // onPress={() => navigation.navigate('selectInsect2', insects)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  insectImage: {
    height: 80,
    width: 80,
  },
  insectName: {
    alignSelf: 'center',
    paddingHorizontal: 40,
  },
  insectContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default selectInsect1;
