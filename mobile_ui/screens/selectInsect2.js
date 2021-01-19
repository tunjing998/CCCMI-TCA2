import React from 'react';
import {Text, View, Button, StyleSheet, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const selectInsect2 = ({route}) => {
  const insects = route.params;

  const renderInsects = () => {
    return insects.map((insect, index) => {
      if (insect.amount != '0') {
        return (
          <View key={index} style={styles.container}>
            <Image source={insect.image} style={{width: 50, height: 50}} />
            <Text>{insect.name}</Text>
            <Text>{insect.amount}</Text>
          </View>
        );
      }
    });
  };

  return <ScrollView>{renderInsects()}</ScrollView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default selectInsect2;
