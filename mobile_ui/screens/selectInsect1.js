import React, {useEffect, useState, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-elements';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Input} from 'react-native-elements';
import axios from 'axios';

const selectInsect1 = ({navigation}) => {
  const [insectList, setInsectList] = useState([]);

  useEffect(() => {
    getInsect();
  });

  const getInsect = async () => {
    try {
      let response = await axios.get(
        'http://cccmi-aquality.tk/aquality_server/insect',
      );
      // console.log('response data:' + JSON.stringify(response.data));
      setInsectList(response.data);
      // console.log('insect list:' + insectList);
      // console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  // const renderInsect = () => {
  //   return (
  //     <FlatList
  //       data={insectList}
  //       renderItem={({insect}) => <Text>{insect.insect_name}</Text>}
  //     />
  //     // <Text>asd</Text>
  //   );
  // };

  // const render = () => {
  //   {
  //     console.log("hello"+insectList);
  //     insectList.map((insect,key) => {
  //       // return <Text>{insect.insect_name}</Text>;
  //       console.log("this is insect"+insect.insect_name);
  //     });
  //   }
  // };

  const [image, setImage] = useState('');

  return (
    <ScrollView>
      {insectList.map((item, key) => (
        <View key={key} style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
              // uri: item.insect_image_path
            }}
          />
          <Text style={{fontSize: 20, width: 150}}>{item.insect_name}</Text>

          
          <TextInput placeholder="amount" style={styles.input} />
        </View>
      ))}
      <FlatList
        data={insectList}
        renderItem={({insect}) => <Text>{insect}</Text>}
      />
    </ScrollView>
  );
};

export default selectInsect1;

const styles = StyleSheet.create({
  tinyLogo: {
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 100,
    // borderBottomWidth: 1,
  },
});
