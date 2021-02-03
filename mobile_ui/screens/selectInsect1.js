import React, {useEffect, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableHighlight,
  Modal,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import axios from 'axios';
import {useTheme} from '@react-navigation/native';

const selectInsect1 = ({navigation}) => {
  const [insectList, setInsectList] = useState([]);
  const {colors} = useTheme();
  const textInput = React.useRef();
  const [selectedInsectList, setSelectedInsectList] = useState([]);

  const handleUpdate = todo => {
    const newSelectedInsectList = [...selectedInsectList];
    newSelectedInsectList.push(todo);
    setSelectedInsectList(newSelectedInsectList);
    console.log('selected insect list: ' + selectedInsectList);
  };

  const [selectedInsect, setSelectedInsect] = useState({
    insect_name: '',
    amount: null,
  });

  const [selecTedAmount, setSelectedAmount] = useState('');

  const handleAdd = insectName => {
    if (!selecTedAmount.trim()) {
      alert('Please Enter amount');
      return;
    }
    const newSelectedInsect = Object.assign({}, selectedInsect);
    newSelectedInsect.insect_name = insectName;
    newSelectedInsect.amount = selecTedAmount;
    setSelectedInsect(newSelectedInsect);
    console.log(newSelectedInsect);
    handleUpdate(newSelectedInsect);
  };

  useEffect(() => {
    getInsect();
  }, []);

  const getInsect = async () => {
    try {
      let response = await axios.get(
        'http://cccmi-aquality.tk/aquality_server/insect',
      );
      setInsectList(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = () => {
    navigation.navigate('Insect');
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.viewContainer}>
      <ScrollView>
        {insectList.map((item, key) => (
          <View key={key} style={styles.container}>
            
            <Image
              style={styles.tinyLogo}
              source={{
                uri: item.insect_image_path,
              }}
            />
            <Text
              style={{
                fontSize: 15,
                width: 150,
                textAlign: 'center',
                color: colors.text,
              }}>
              {item.insect_name}
            </Text>
            <TextInput
              ref={textInput}
              placeholder="amount"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={val => {
                setSelectedAmount(val);
              }}
            />
            <Button
              onPress={() => {
                handleAdd(item.insect_name);
              }}
              title="add"
              buttonStyle={{
                width: 50,
                marginRight: 10,
                backgroundColor: '#33cccc',
              }}
            />
          </View>
        ))}
        {selectedInsectList.map((item, key) => (
          <View>
            <Text>
              {item.insect_name}
              {item.amount}
            </Text>
          </View>
        ))}
      </ScrollView>

      <Button
        title="Done"
        buttonStyle={styles.submitButton}
        onPress={() => handleSubmit()}
        type="outline"
      />
    </View>
  );
};

export default selectInsect1;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  container: {
    // width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 100,
  },
  submitButton: {
    // backgroundColor: '#009999',
    padding: 10,
    borderWidth: 3,
  },
});
